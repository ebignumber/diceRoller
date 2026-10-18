import { Preferences } from '@capacitor/preferences';

const useSetSetting = async (key: string, value: string) => {
  await Preferences.set({
    key: key,
    value: value,
  });
};

const useGetSetting = async (key: string) => {
  try{
    const { value } = await Preferences.get({ key: key });
    return value
  }
  catch{
    console.error("An error occured while trying to get setting")
    return ""
  }
};

const useRemoveSetting = async (key: string) => {
  await Preferences.remove({ key: key });
};

export { useSetSetting, useGetSetting, useRemoveSetting }
