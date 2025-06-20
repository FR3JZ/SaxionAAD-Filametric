import { clearRememberUser, getRememberUser, setLoggedInState, setRememberUser } from "@/nativeFeatures/AuthStorage";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import React from "react";
import { Auth, Hub } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";

// Context type describing authentication state and actions
type AuthState = {
    isLoggedIn: boolean;
    isReady: boolean;
    user: any;
    setUser: (user: any) => void;
    logIn: (username: string, password: string, rememberUser:boolean) => Promise<void>;
    logOut: () => Promise<void>;
    getCurrentUsername: () => Promise<string | null>;
};

// Auth context with initial dummy values
export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isReady: false,
    user: null,
    setUser: () => {},
    logIn: async () => {},
    logOut: async () => {},
    getCurrentUsername: async () => null,
});

// AuthProvider wraps your app with authentication logic/state
export function AuthProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [username, setUsername] = useState<string>("");
    const router = useRouter();

    // Logs the user in and optionally remembers them
    const logIn = async (username: string, password: string, rememberUser:boolean) => {
        try {
            await setRememberUser(rememberUser);
            const cognitoUser = await Auth.signIn(username, password);

            setUser(cognitoUser);
            setIsLoggedIn(true);
            setUsername(username)
            router.replace("/(protected)/(tabs)");
        } catch (error: any) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    // Logs the user out and clears remember-me flag
    const logOut = async () => {
        try {
            await clearRememberUser();
            await Auth.signOut();
            setUser(null);
        } catch (e) {
            console.error("Failed to log out:", e);
            throw e;
        }
    };

    // Checks on startup if there's a logged-in (and remembered) user
    const checkAuthenticationStatus = async () => {
        let authenticated = false;
        try {
            const rememberTheUser:boolean = await getRememberUser();
            if(rememberTheUser) {
                const cognitoUser = await Auth.currentAuthenticatedUser();
                setUser(cognitoUser);
                authenticated = true;
            }
        } catch (e) {
            setUser(null);
            authenticated = false;
            await setLoggedInState("LoggedOut");
        } finally {
            setIsLoggedIn(authenticated);
            setIsReady(true);
        }
    };

    // Listen for authentication events (signIn, signOut, etc.) and react accordingly
    useEffect(() => {
        checkAuthenticationStatus();

        const listener = (data: any) => {
            switch (data.payload.event) {
                case 'signIn':
                    setUser(data.payload.data);
                    setIsLoggedIn(true);
                    setLoggedInState("LoggedIn");
                    break;
                case 'signOut':
                    setUser(null);
                    setIsLoggedIn(false);
                    setLoggedInState("LoggedOut");
                    router.replace("/LoginScreen");
                    break;
                case 'signIn_failure':
                    setUser(null);
                    setIsLoggedIn(false);
                    setLoggedInState("LoggedOut");
                    break;
                case 'autoSignIn':
                case 'autoSignIn_failure':
                    checkAuthenticationStatus();
                    break;
            }
        };

        Hub.listen('auth', listener);
        return () => Hub.remove('auth', listener);
    }, []);

    // Returns current username if available, else fetches from Cognito
    const getCurrentUsername = async (): Promise<string | null> => {
        try {
            if(username) return username;
            const user = await Auth.currentAuthenticatedUser();
            return user?.username ?? null;
        } catch (error) {
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{ isReady, isLoggedIn, user, setUser, logIn, logOut, getCurrentUsername }}>
            {children}
        </AuthContext.Provider>
    );
}
