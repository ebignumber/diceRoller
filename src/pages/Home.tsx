import { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Counter from '../components/Counter';
import './Home.css';

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

  const [roll, setRoll] = useState<RollConfig>({
    d4: [],
    d6: [],
    d8: [],
    d10: [],
    d12: [],
    d20: [],
  });

  const [showRoll, setShowRoll] = useState(false)



  const updateDice = (key: keyof DiceConfig, value: number) => {
    setDice(prev => ({ ...prev, [key]: Math.max(0, value) }));
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
      result.d10 = Array.from({ length: diceConfig.d10 }, () => Math.floor(Math.random() * 10));
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
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
          </IonToolbar>
        </IonHeader>
          <Counter label='d4' value={dice.d4} onChange={(v) => updateDice('d4', v)} />
          <Counter label='d6' value={dice.d6} onChange={(v) => updateDice('d6', v)} />
          <Counter label='d8' value={dice.d8} onChange={(v) => updateDice('d8', v)} />
          <Counter label='d10' value={dice.d10} onChange={(v) => updateDice('d10', v)} />
          <Counter label='d12' value={dice.d12} onChange={(v) => updateDice('d12', v)} />
          <Counter label='d20' value={dice.d20} onChange={(v) => updateDice('d20', v)} />
      </IonContent>
      <IonButton onClick={() => handleDiceRoll()}>Roll</IonButton>
    </IonPage>
  );
};

export default Home;
