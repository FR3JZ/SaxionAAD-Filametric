// context/authContext.tsx
import { clearRememberUser, getRememberUser, setLoggedInState, setRememberUser } from "@/nativeFeatures/AuthStorage";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import React from "react";
import { Auth, Hub } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";

type AuthState = {
    isLoggedIn: boolean;
    isReady: boolean;
    user: any;
    setUser: (user: any) => void;
    logIn: (username: string, password: string, rememberUser:boolean) => Promise<void>;
    logOut: () => Promise<void>;
    getCurrentUsername: () => Promise<string | null>;
    deleteUserAccount: () => Promise<void>;
    getCurrentEmail: () => Promise<string | null>;
};

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isReady: false,
    user: null,
    setUser: () => {},
    logIn: async () => {},
    logOut: async () => {},
    getCurrentUsername: async () => null,
    deleteUserAccount: async () => {},
    getCurrentEmail: async () => null,
});

export function AuthProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const router = useRouter();

    /**
     * Send the login request to AWS cognito
     * @param username The users name
     * @param password The users password
     * @param rememberUser True if the user wants to be remembered
     */
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

    /**
     * Signs out the user.
     * Stops remembering the user.
     */
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

    /**
     * Check to see if the user is loged in or not.
     */
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

    /**
     * Get the users name
     * @returns The username of the logged in user
     */
    const getCurrentUsername = async (): Promise<string | null> => {
        try {
            if(username) {
                return username;
            }
            const userInfo = await Auth.currentUserInfo();
            setUsername(userInfo?.username)
            return userInfo?.username ?? null;
        } catch (error) {
            console.warn("getCurrentUsername: No authenticated user", error);
            return null;
        }
    };

    /**
     * Get the email of the user
     * @returns The email of the logged in user
     */
    const getCurrentEmail = async (): Promise<string | null> => {
        try {
            if(email) {
                return email;
            }
            const userInfo = await Auth.currentUserInfo();
            setEmail(userInfo?.email)
            return userInfo?.attributes.email ?? null;
        } catch (error) {
            console.warn("getCurrentUsername: No authenticated user", error);
            return null;
        }
    };

    /**
     * Tell AWS cognito to delete the user, then log the user out.
     */
    const deleteUserAccount = async () => {
        try {
            await Auth.deleteUser();
            await logOut();
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AuthContext.Provider value={{ 
                isReady, isLoggedIn, user, 
                setUser, logIn, logOut, getCurrentUsername, 
                deleteUserAccount, getCurrentEmail
            }}>
            {children}
        </AuthContext.Provider>
    );
}