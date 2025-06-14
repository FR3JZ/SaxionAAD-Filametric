import * as SecureStore from 'expo-secure-store';

export const saveProfile = async (dryer_id: string, profile: any) => {
  try {
    console.log(dryer_id);
    await SecureStore.setItemAsync(formatId(dryer_id), JSON.stringify(profile));
  } catch (e) {
    console.error("Failed to save profile", e);
  }
};

export const getSavedProfile = async (dryer_id: string): Promise<any | null> => {
  try {
    const data = await SecureStore.getItemAsync(formatId(dryer_id));
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

export const clearSavedProfile = async (dryer_id: string) => {
  try {
    await SecureStore.deleteItemAsync(formatId(dryer_id));
  } catch (e) {
    console.error("Failed to clear saved profile", e);
  }
};

const formatId = (dryer_id: string) => {
    return dryer_id.replaceAll(" ", "-");
}