import { DiceConfig, RollConfig } from "../dice/types";

interface Tab{
  dice: DiceConfig
  total: number
  lastRoll: RollConfig
} 

export type { Tab }
