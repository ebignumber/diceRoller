import {DiceConfig} from "../dice/types";
import DicePreset from "./types";
import { Preferences } from "@capacitor/preferences";

const useSavePreset = async (dice: DiceConfig, name: string) => {
  let presets = await useGetPresets() as unknown as Array<DicePreset>
  let newPreset = {name: name, dice: dice} as DicePreset
  presets.push(newPreset)
  await Preferences.set({
    key: "presets",
    value: JSON.stringify(presets)
  });
};

const useGetPresets = async () : Promise<DicePreset[]> => {
  try{
    const { value } = await Preferences.get({ key: "presets" });
    let presetsToParse = value || JSON.stringify([])
    let parsedPresets = JSON.parse(presetsToParse)
    return parsedPresets
  }
  catch{
    console.error("An error occured while trying to get settings, switching to default.")
    return []
  }
};

export { useSavePreset, useGetPresets }
