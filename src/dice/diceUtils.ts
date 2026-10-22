import { DiceConfig, RollConfig } from "./types";

const rollDice = (diceConfig: DiceConfig): RollConfig => {
  const result: Record<keyof DiceConfig, number[]> = {
    d4: [],
    d6: [],
    d8: [],
    d10: [],
    d12: [],
    d20: [],
  };

  let dieCatagories = Object.keys(diceConfig) as Array<keyof DiceConfig>
  for(let dieCatagory of dieCatagories){
    if(diceConfig[dieCatagory] > 0){
      let numberOfSides = Number(dieCatagory.replace("d", ""))
      result[dieCatagory] = Array.from({ length: diceConfig[dieCatagory] }, () => Math.floor(Math.random() * numberOfSides + 1))
    }
  }

  return result;
};

export default rollDice
