import * as SecureStore from 'expo-secure-store';

export const saveMode = async (dryerId: string, profileId: any, mode: string) => {
  try {
    await SecureStore.setItemAsync(`${formatId(dryerId)}-${profileId}`, mode);
  } catch (e) {
    console.error("Failed to save profile", e);
  }
};

export const getSavedMode = async (dryerId: string, profileId: any): Promise<string | null> => {
  try {
    const data = await SecureStore.getItemAsync(`${formatId(dryerId)}-${profileId}`);
    return data;
  } catch (e) {
    return null;
  }
};

export const clearSavedMode = async (dryerId: string, profileId: any) => {
  try {
    await SecureStore.deleteItemAsync(`${formatId(dryerId)}-${profileId}`);
  } catch (e) {
    console.error("Failed to clear saved profile", e);
  }
};

const formatId = (dryerId: string) => {
    return dryerId.replaceAll(" ", "-");
}