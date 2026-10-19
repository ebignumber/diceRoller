import { useState, useEffect } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { useGetSettings } from '../settings/settingUtils';
import useReadImage from '../hooks/useReadImage';
import Counter from '../components/Counter';
import defaultSettings from '../settings/defaultSettings';

const settings = await useGetSettings()

interface DiceConfig {
  d4: number;
  d6: number;
  d8: number;
  d10: number;
  d12: number;
  d20: number;
}

interface RollConfig {
  d4: Array<number>;
  d6: Array<number>;
  d8: Array<number>;
  d10: Array<number>;
  d12: Array<number>;
  d20: Array<number>;
}


const Home: React.FC = () => {
  const [dice, setDice] = useState<DiceConfig>({
    d4: 0,
    d6: 0,
    d8: 0,
    d10: 0,
    d12: 0,
    d20: 0,
  });

  const [useCustomBackground, setUseCustomBackground] = useState(false);
  const [customBackgroundPath, setCustomBackgroundPath] = useState('');
  const [customBackgroundDataUrl, setCustomBackgroundDataUrl] = useState('');

  useEffect(() => {
    (async () => {
      const useCustom = settings['use-custom-background'];
      setUseCustomBackground(useCustom);
      const path = settings['custom-background-path'];
      if (path) {
        setCustomBackgroundPath(path);
        setCustomBackgroundDataUrl(await useReadImage(path));
      }
    })();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (useCustomBackground && customBackgroundDataUrl) {
      root.style.setProperty('--app-background-image', `url('${customBackgroundDataUrl}')`);
    } else {
      root.style.setProperty('--app-background-image', 'none');
    }
  }, [useCustomBackground, customBackgroundDataUrl]);

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


  const updateDice = (key: keyof DiceConfig, value: number) => {
    setDice(prev => ({ ...prev, [key]: Math.max(0, value) }));
    setRollLastPressed(false)
  };

  const rollDice = (diceConfig: DiceConfig) => {
    const result: Record<keyof DiceConfig, number[]> = {
      d4: [],
      d6: [],
      d8: [],
      d10: [],
      d12: [],
      d20: [],
    };

    if (diceConfig.d4 > 0) {
      result.d4 = Array.from({ length: diceConfig.d4 }, () => Math.floor(Math.random() * 4) + 1);
    }
    if (diceConfig.d6 > 0) {
      result.d6 = Array.from({ length: diceConfig.d6 }, () => Math.floor(Math.random() * 6) + 1);
    }
    if (diceConfig.d8 > 0) {
      result.d8 = Array.from({ length: diceConfig.d8 }, () => Math.floor(Math.random() * 8) + 1);
    }
    if (diceConfig.d10 > 0) {
      result.d10 = Array.from({ length: diceConfig.d10 }, () => Math.floor(Math.random() * 10) + 1);
    }
    if (diceConfig.d12 > 0) {
      result.d12 = Array.from({ length: diceConfig.d12 }, () => Math.floor(Math.random() * 12) + 1);
    }
    if (diceConfig.d20 > 0) {
      result.d20 = Array.from({ length: diceConfig.d20 }, () => Math.floor(Math.random() * 20) + 1);
    }

    return result;
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
        <IonButton onClick={clearDice}>Clear</IonButton>
      </IonPage>
    </>
  );
};

export default Home;
