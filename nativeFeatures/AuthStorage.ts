import * as SecureStorage from "expo-secure-store";
import { Platform } from "react-native";

const LoginStateKey:string = "Login-state-key";

export async function setLoggedInState(state:string){
    await save(LoginStateKey, state);
}

export async function getLoggedInState() : Promise<string> {
    await SecureStorage.deleteItemAsync(LoginStateKey);
    return await getData(LoginStateKey);
}

async function save(key:string, data: string){
    if(Platform.OS === 'web'){
        // Expo store cannot save on web.
    } else {
        await SecureStorage.setItemAsync(key, data);
    }
}

async function getData(key:string) : Promise<string> {
    let data = null;

    if(Platform.OS === 'web'){
        data = "LoggedIn" // web cannot find data so it returns nothing
    } else {
        data = await SecureStorage.getItemAsync(key);
    }

    if(data){
        return data;
    } else {
        return ""
    }
}
