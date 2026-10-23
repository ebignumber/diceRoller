import { useState, useEffect } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar, IonAlert } from '@ionic/react';
import { useGetSettings } from '../settings/settingUtils';
import useReadImage from '../hooks/useReadImage';
import Counter from '../components/Counter';
import PresetModal from '../components/PresetModal';
import { RollConfig, DiceConfig } from '../dice/types';
import rollDice from '../dice/diceUtils';
import { useGetPresets, useSavePreset } from '../presets/presetUtils';

const settings = await useGetSettings()
const presets = await useGetPresets()

const CURRENT_VERSION = "0.3.0_alpha"
let latestVersion = ""

const Home: React.FC = () => {
  const [dice, setDice] = useState<DiceConfig>({
    d4: 0,
    d6: 0,
    d8: 0,
    d10: 0,
    d12: 0,
    d20: 0,
  });

  useEffect(() => {
    (async () => {
      const root = document.documentElement;
      const useCustom = settings['use-custom-background'];
      const path = settings['custom-background-path'];
      if (path && useCustom) {
        const backgroundDataUrl = await useReadImage(path);
        root.style.setProperty('--app-background-image', `url('${backgroundDataUrl}')`);
      }
      else {
        root.style.setProperty('--app-background-image', 'none');
      }

      if(settings["notify-for-updates"]){
        try{
          const response = await fetch("https://raw.githubusercontent.com/ebignumber/diceRoller/refs/heads/main/package.json")
          const data = await response.json()
          latestVersion = data.version
          console.log(latestVersion)
          if(latestVersion !== CURRENT_VERSION){
            setIsUpdateAlertOpen(true)
          }
        }
        catch{
          console.error("Unable to get latest version")
        }
      }
    })();
  }, []);

  const [roll, setRoll] = useState<RollConfig>({
    d4: [],
    d6: [],
    d8: [],
    d10: [],
    d12: [],
    d20: [],
  });

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const allNumbers = [
      ...roll.d4,
      ...roll.d6,
      ...roll.d8,
      ...roll.d10,
      ...roll.d12,
      ...roll.d20,
    ];
    const sum = allNumbers.reduce((acc, num) => acc + num, 0);
    setTotal(sum);
  }, [roll]);

  const [showRoll, setShowRoll] = useState(false)

  const [rollLastPressed, setRollLastPressed] = useState(false)

  const [isUpdateAlertOpen, setIsUpdateAlertOpen] = useState(false)

  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false)

  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false)

  const updateDice = (key: keyof DiceConfig, value: number) => {
    setDice(prev => ({ ...prev, [key]: Math.max(0, value) }));
    setRollLastPressed(false)
  };

  
  const handleDiceRoll = () => {
    if(!showRoll){
      setShowRoll(true)
    }
    setRoll(rollDice(dice))
    setRollLastPressed(true)
  }

  const updateSquares = (key: keyof RollConfig) => {
    if(rollLastPressed){
      if(key === 'd10' && settings['ten-to-zero']){
        return roll[key].map((num) => num == 10 ? 0 : num)
      }
      return roll[key]
    }
    else{
      return Array.from({ length: dice[key] }, () => "?");
    }
  }

  const clearDice = () => {
    setDice({
      d4: 0,
      d6: 0,
      d8: 0,
      d10: 0,
      d12: 0,
      d20: 0,
    })
    setRollLastPressed(false)
  }

  const handleClearClick = () => {
    if(settings["confirm-before-clear"]){
      setIsClearConfirmOpen(true)
    }
    else{
      clearDice()
    }
  }

  const handleLoadPreset = (diceConfig: DiceConfig) => {
    setDice(diceConfig);
    setRollLastPressed(false);
  }

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}> 
              </IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonAlert
          isOpen={isUpdateAlertOpen}
          header="An update is available!"
          subHeader={CURRENT_VERSION + " ==> " + latestVersion}
          onDidDismiss={() => {setIsUpdateAlertOpen(false)}}
          buttons={[
            {
              text: "Cancel",
              role: "cancel"
            },
            {
              text: "Get Update", 
              handler: () => {
                window.location.href = "https://github.com/ebignumber/diceRoller/releases"
              }
            }
          ]}
        ></IonAlert>
        <IonAlert
          isOpen={isClearConfirmOpen}
          subHeader="Are you sure you want to clear your dice?"
          onDidDismiss={() => {setIsClearConfirmOpen(false)}}
          buttons={[
            {
              text: "Cancel",
              role: "cancel"
            },
            {
              text: "Confirm", 
              handler: () => {
                clearDice()
              }
            }
          ]}
        ></IonAlert>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
            </IonToolbar>
          </IonHeader>
          <h3>Total: {total}</h3>
          <Counter label='d4' value={dice.d4} onChange={(v) => updateDice('d4', v)} squares={updateSquares('d4')}/> 
          <Counter label='d6' value={dice.d6} onChange={(v) => updateDice('d6', v)} squares={updateSquares('d6')}/>
          <Counter label='d8' value={dice.d8} onChange={(v) => updateDice('d8', v)} squares={updateSquares('d8')}/>
          <Counter label='d10' value={dice.d10} onChange={(v) => updateDice('d10', v)} squares={updateSquares('d10')}/>
          <Counter label='d12' value={dice.d12} onChange={(v) => updateDice('d12', v)} squares={updateSquares('d12')}/>
          <Counter label='d20' value={dice.d20} onChange={(v) => updateDice('d20', v)} squares={updateSquares('d20')}/>
        </IonContent>
        <IonButton onClick={() => handleDiceRoll()}>Roll</IonButton>
        <IonButton size='small' onClick={() => setIsPresetModalOpen(true)}>Presets</IonButton>
        <IonButton size='small' onClick={handleClearClick}>Clear</IonButton>
        
        <PresetModal
          isOpen={isPresetModalOpen}
          onDidDismiss={() => setIsPresetModalOpen(false)}
          currentDice={dice}
          onLoadPreset={handleLoadPreset}
        />
      </IonPage>
    </>
  );
};

export default Home;
