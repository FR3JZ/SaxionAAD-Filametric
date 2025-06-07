import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import React from "react";
import { Auth } from "aws-amplify";
import { deleteSecureValue, getSecureValue, storeSecureValue } from "@/Storage/storage";

type AuthState = {
    isLoggedIn: boolean;
    isReady: boolean;
    user: any;
    setUser: (user: any) => void;
    logIn: (signedInUser:any, rememberUser:boolean) => void;
    logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isReady: false,
    user: null,
    setUser: () => {},
    logIn: () => {},
    logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    const logIn = async (signedInUser:any, rememberUser:boolean) => {
        try {
            setIsLoggedIn(true);
            setUser(signedInUser);
            router.replace("/");
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsReady(true);
        }

        if(rememberUser){
            const session = await Auth.currentSession();
            const idToken = session.getIdToken().getJwtToken();
            await storeSecureValue('cognito-id-token', idToken);
        }
    };

    const logOut = async () => {
        try {
            await Auth.signOut();

            setIsLoggedIn(false);
            setUser(null);
            setIsReady(false);

            await deleteSecureValue('cognito-id-token');

            router.replace("/LoginScreen");
        } catch (e) {
            console.error("Failed to log out:", e);
        }
    };

    useEffect(() => {
        checkLogginState();
    }, []);

    const checkLogginState = async () => {
        let hasLoggedIn = false;

        try {
            const token = await getSecureValue('cognito-id-token');

            if (token && isTokenValid(token)) {
                try {
                    const currentUser = await Auth.currentAuthenticatedUser();
                    setUser(currentUser);
                    hasLoggedIn = true;
                    console.log("User restored from token.");
                } catch (err) {
                    console.warn("Stored token invalid or expired:", err);
                    await deleteSecureValue('cognito-id-token');
                    setUser(null);
                }
            }
        } catch (e) {
            console.error("Failed to check login state:", e);
        } finally {
            setIsLoggedIn(hasLoggedIn);
            setIsReady(true);
        }
    };

    const isTokenValid = (token: string): boolean => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp > currentTime;
        } catch {
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ isReady, isLoggedIn, user, setUser, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}
