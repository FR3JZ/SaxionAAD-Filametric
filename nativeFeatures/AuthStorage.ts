import * as SecureStorage from "expo-secure-store";
import { Platform } from "react-native";

const LoginStateKey:string = "Login-state-key";
const REMEMBER_KEY = "REMEMBER_USER";

export async function setLoggedInState(state:string){
    await save(LoginStateKey, state);
}

export async function getLoggedInState() : Promise<string> {
    return await getData(LoginStateKey);
}


export async function setRememberUser(value: boolean) {
    console.log("Set remember user to: " + value);
}

export async function getRememberUser(): Promise<boolean> {
    const value = await getData(REMEMBER_KEY);
    return value === "true";
}

export async function clearRememberUser() {
    await save(REMEMBER_KEY, "");
}


async function save(key:string, data: string){
    if(Platform.OS === 'web'){
        localStorage.setItem(key, data); // Note web verion is not secure.
    } else {
        await SecureStorage.setItemAsync(key, data);
    }
}

async function getData(key:string) : Promise<string> {
    let data = null;

    if(Platform.OS === 'web'){
        data = localStorage.getItem(key); // Note web verion is not secure.
    } else {
        data = await SecureStorage.getItemAsync(key);
    }

    if(data){
        return data;
    } else {
        return ""
    }
}