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

export type { DiceConfig, RollConfig }
