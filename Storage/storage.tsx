// utils/SecureStorage.ts
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const storeSecureValue = async (key: string, value: string) => {
  if (isWeb) {
    try {
      localStorage.setItem(key, value);
      console.log(`Stored [web]: ${key} = ${value}`);
    } catch (err) {
      console.warn('localStorage error:', err);
    }
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

export const getSecureValue = async (key: string): Promise<string | null> => {
  if (isWeb) {
    try {
      const value = localStorage.getItem(key);
      console.log(`Retrieved [web]: ${key} = ${value}`);
      return value;
    } catch (err) {
      console.warn('localStorage error:', err);
      return null;
    }
  } else {
    return await SecureStore.getItemAsync(key);
  }
};

export const deleteSecureValue = async (key: string) => {
  if (isWeb) {
    try {
      localStorage.removeItem(key);
      console.log(`Deleted [web]: ${key}`);
    } catch (err) {
      console.warn('localStorage error:', err);
    }
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};