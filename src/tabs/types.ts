import { DiceConfig, RollConfig } from "../dice/types";

interface Tab{
  dice: DiceConfig
  total: number
  lastRoll: RollConfig
  rollLastPressed: boolean
} 

export type { Tab }
