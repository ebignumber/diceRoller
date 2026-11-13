import { DiceConfig, RollConfig } from "./types";

const emptyDice = <DiceConfig>({
    d4: 0,
    d6: 0,
    d8: 0,
    d10: 0,
    d12: 0,
    d20: 0,
})

const emptyRoll = <RollConfig>({
    d4: [],
    d6: [],
    d8: [],
    d10: [],
    d12: [],
    d20: [],
})

export { emptyDice, emptyRoll }
