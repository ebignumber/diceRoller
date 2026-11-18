import type { Tab } from "./types";
import { emptyDice, emptyRoll } from "../dice/empty";

const emptyTab: Tab = {dice: emptyDice, total: 0, lastRoll: emptyRoll, rollLastPressed: false}

export default emptyTab
