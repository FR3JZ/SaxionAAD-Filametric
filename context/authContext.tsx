// context/authContext.tsx
import { clearRememberUser, getRememberUser, setLoggedInState, setRememberUser } from "@/nativeFeatures/AuthStorage";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import React from "react";
import { Auth, Hub } from "aws-amplify";

type AuthState = {
    isLoggedIn: boolean;
    isReady: boolean;
    user: any;
    setUser: (user: any) => void;
    logIn: (email: string, password: string, rememberUser:boolean) => Promise<void>;
    logOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isReady: false,
    user: null,
    setUser: () => {},
    logIn: async () => {},
    logOut: async () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    const logIn = async (email: string, password: string, rememberUser:boolean) => {
        try {
            await setRememberUser(rememberUser);
            const cognitoUser = await Auth.signIn(email, password);

            console.log("Signed in user:", cognitoUser);

            setUser(cognitoUser);
            setIsLoggedIn(true);

            router.replace("/(protected)/(tabs)");
        } catch (error: any) {
            console.error("Login failed:", error);
            throw error;
        }
    };

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

    const checkAuthenticationStatus = async () => {
        let authenticated = false;
        try {
            const rememberTheUser:boolean = await getRememberUser();
            if(rememberTheUser) {
                console.log("Check state");
                const cognitoUser = await Auth.currentAuthenticatedUser();
                setUser(cognitoUser);
                authenticated = true;
            }
        } catch (e) {
            setUser(null);
            authenticated = false;
            console.log('checkAuthenticationStatus: No active session.');
            await setLoggedInState("LoggedOut");
        } finally {
            setIsLoggedIn(authenticated);
            setIsReady(true);
        }
    };

    useEffect(() => {
        checkAuthenticationStatus();

        const listener = (data: any) => {
            console.log('Auth Hub event:', data.payload.event);
            switch (data.payload.event) {
                case 'signIn':
                    setUser(data.payload.data);
                    setIsLoggedIn(true);
                    setLoggedInState("LoggedIn");
                    console.log('Auth Hub: Gebruiker succesvol ingelogd:', data.payload.data.username);
                    break;
                case 'signOut':
                    setUser(null);
                    setIsLoggedIn(false);
                    setLoggedInState("LoggedOut");
                    console.log('Auth Hub: Gebruiker uitgelogd');
                    router.replace("/LoginScreen");
                    break;
                case 'signIn_failure':
                    console.error('Auth Hub: Login mislukt:', data.payload.data);
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

    return (
        <AuthContext.Provider value={{ isReady, isLoggedIn, user, setUser, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}