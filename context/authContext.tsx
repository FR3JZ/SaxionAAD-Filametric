import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import React from "react";
import { Auth } from "aws-amplify";

type AuthState = {
    isLoggedIn: boolean;
    isReady: boolean;
    user: any;
    setUser: (user: any) => void;
    logIn: (username: string, password: string) => void;
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

    const logIn = async (username: string, password: string) => {
        try {
            const user = await Auth.signIn(username, password);
            setIsLoggedIn(true);
            setUser(user);
            router.replace("/");
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsReady(true);
        }
    };

    const logOut = async () => {
        try {
            await Auth.signOut();
            setIsLoggedIn(false);
            setUser(null);
            setIsReady(false);
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
            const logginState = true;

            if (hasLoggedIn) {
                try {
                    const currentUser = await Auth.currentAuthenticatedUser();
                    setUser(currentUser);
                } catch {
                    setUser(null);
                    hasLoggedIn = false;
                }
            }
        } catch (e) {
            console.error("Failed to get loggin state:", e);
        } finally {
            setIsLoggedIn(hasLoggedIn);
            setIsReady(true);
        }
    };

    return (
        <AuthContext.Provider value={{ isReady, isLoggedIn, user, setUser, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}
