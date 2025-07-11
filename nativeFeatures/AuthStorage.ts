import * as SecureStorage from "expo-secure-store";
import { Platform } from "react-native";

const LOGIN_KEY:string = "Login-state-key";
const REMEMBER_KEY:string = "REMEMBER_USER";

/**
 * Used to store the state of the user login
 * @param state The state of the user login
 */
export async function setLoggedInState(state:string){
    await save(LOGIN_KEY, state);
}

/**
 * Used to retrive the state of the user login
 * @returns The state of the user login
 */
export async function getLoggedInState() : Promise<string> {
    return await getData(LOGIN_KEY);
}


/**
 * Store true when the user wants to be remembered
 * @param value True if the user wants to be remembered
 */
export async function setRememberUser(value: boolean) {
    await save(REMEMBER_KEY, String(value));
}

/**
 * Check if the user wants to be remembered
 * @returns True if the user wants to be remembered
 */
export async function getRememberUser(): Promise<boolean> {
    const value:string = await getData(REMEMBER_KEY);
    return value === "true";
}

/**
 * Put an empty string in the spot of remember user
 */
export async function clearRememberUser() {
    await save(REMEMBER_KEY, "");
}

/**
 * Stores the data on device
 * @param key The key is the name used to identify the data
 * @param data The data that needs to be stored
 */
async function save(key:string, data: string){
    if(Platform.OS === 'web'){
        // Cannot save in web version
    } else {
        await SecureStorage.setItemAsync(key, data);
    }
}

/**
 * Get the data out of storage
 * @param key The key is the name used to identify the data
 * @returns The stored data in string format
 */
async function getData(key:string) : Promise<string> {
    let data:any = null;

    if(Platform.OS === 'web'){
        return "" // Cannot retrieve because there is no save in web version
    } else {
        data = await SecureStorage.getItemAsync(key);
    }

    if(data){
        return data;
    } else {
        return ""
    }
}