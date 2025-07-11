import { clearRememberUser, getRememberUser, setLoggedInState, setRememberUser } from "@/nativeFeatures/AuthStorage";
import { Router, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import React from "react";
import { Auth, Hub } from "aws-amplify";

// Context type describing authentication state and actions
export type AuthState = {
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

// Auth context with initial dummy values
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

// AuthProvider wraps your app with authentication logic/state
export function AuthProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const router:Router = useRouter();

    /**
     * Send the login request to AWS cognito
     * @param username The users name
     * @param password The users password
     * @param rememberUser True if the user wants to be remembered
     */
    const logIn = async (username: string, password: string, rememberUser:boolean) => {
        try {
            await setRememberUser(rememberUser);
            const cognitoUser:any = await Auth.signIn(username, password);

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
        let authenticated:boolean = false;
        try {
            const rememberTheUser:boolean = await getRememberUser();
            if(rememberTheUser) {
                const cognitoUser:any = await Auth.currentAuthenticatedUser();
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

    /**
     * Get the users name
     * @returns The username of the logged in user
     */
    const getCurrentUsername = async (): Promise<string | null> => {
        try {
            if(username) {
                return username;
            }
            const userInfo:any = await Auth.currentUserInfo();
            setUsername(userInfo?.username)
            return userInfo?.username ?? null;
        } catch (error) {
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
            const userInfo:any = await Auth.currentUserInfo();
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
