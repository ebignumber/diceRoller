import { Preferences } from '@capacitor/preferences';
import type Settings from './types';
import defaultSettings from './defaultSettings';

const useSaveSettings = async (settings: Settings) => {
  await Preferences.set({
    key: "settings",
    value: JSON.stringify(settings)
  });
};

const isSettingsUpToDate = (settings: object) : boolean => {
  const settingsKeys = Object.keys(settings)
  const defaultKeys = Object.keys(defaultSettings)

  if (settingsKeys.length !== defaultKeys.length) {
    return false
  }

  return settingsKeys.every(key => defaultKeys.includes(key))
}

const resolveSettings = (settings: Partial<Settings>) : Settings => {
  const resolvedSettings = {...defaultSettings}
  const settingsKeys = Object.keys(settings) as Array<keyof Settings>

  for (const key of settingsKeys) {
    if (key in defaultSettings && settings[key] !== undefined) {
      Object.assign(resolvedSettings, { [key]: settings[key] })
    }
  }

  return resolvedSettings
}

const useGetSettings = async () : Promise<Settings> => {
  try{
    const { value } = await Preferences.get({ key: "settings" });
    let settingsToParse = value || JSON.stringify(defaultSettings)
    let parsedSettings = JSON.parse(settingsToParse)

    if(!isSettingsUpToDate(parsedSettings)){
      parsedSettings = resolveSettings(parsedSettings)
    }

    return parsedSettings
  }
  catch{
    console.error("An error occured while trying to get settings, switching to default.")
    return defaultSettings
  }
};

const useRemoveSetting = async (key: string) => {
  await Preferences.remove({ key: key });
};

export { useSaveSettings, useGetSettings, useRemoveSetting, resolveSettings }
