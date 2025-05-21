import { getLoggedInState, setLoggedInState } from "@/nativeFeatures/AuthStorage";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import React from 'react';

type AuthState = {
    isLoggedIn: boolean;
    isReady: boolean;
    logIn: (email: string, password:string) => void;
    logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isReady: false,
    logIn: (email: string, password:string) => {},
    logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const router = useRouter();
    
    const logIn = (email: string, password:string) => {
        try {
            setLoggedInState("LoggedIn")
        } catch {
            console.error("Failed to set loggin state.")
        } finally {
            setIsLoggedIn(true);
            setIsReady(true);
            router.replace("/");
        }
    }

    const logOut = () => {
         try {
            setLoggedInState("LoggedOut")
        } catch {
            console.error("Failed to set loggin state.")
        } finally {
            setIsLoggedIn(false);
            setIsReady(false);
            router.replace("/LoginScreen")
        }
    }

    useEffect(() => {
        checkLogginState();
    })

    const checkLogginState = async () => {
        let hasLoggedIn:boolean = false;
        try {
            const logginState = await getLoggedInState();
            if(logginState !== null) {
                hasLoggedIn = logginState === "LoggedIn";
            }
        } catch (e) {
            console.error("Failed to get loggin state: " + e)
        } finally {
            setIsLoggedIn(hasLoggedIn);
            setIsReady(true);
        }
    }

    return (
        <AuthContext.Provider value={{ isReady, isLoggedIn, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}