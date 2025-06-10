// context/authContext.tsx
import { getLoggedInState, setLoggedInState } from "@/nativeFeatures/AuthStorage";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import React from "react";
import { Auth, Hub } from "aws-amplify"; // Importeer Hub

type AuthState = {
    isLoggedIn: boolean;
    isReady: boolean; // Geeft aan dat de initiële authenticatiecheck is voltooid
    user: any; // Kun je specifieker maken met CognitoUser type indien gewenst
    setUser: (user: any) => void;
    logIn: (email: string, password: string) => Promise<void>; // Maak dit een Promise
    logOut: () => Promise<void>; // Maak dit een Promise
};

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isReady: false,
    user: null,
    setUser: () => {},
    logIn: async () => {}, // Voeg async toe voor Promise
    logOut: async () => {}, // Voeg async toe voor Promise
});

export function AuthProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    const logIn = async (email: string, password: string) => {
        try {
            const cognitoUser = await Auth.signIn(email, password);
            console.log("Signed in user:", cognitoUser);

            // De Hub listener zal de state hieronder correct bijwerken.
            // Je kunt hier eventueel een navigatie doen, maar het is beter om de lay-out te laten reageren.
            // Voor directere navigatie na een login via een formulier:
            router.replace("/(protected)/(tabs)"); 
        } catch (error: any) { // Specificeer het type error als 'any' of een specifieker type
            console.error("Login failed:", error);
            // Gooi de fout opnieuw zodat de component die logIn aanroept deze kan afhandelen
            throw error;
        }
        // finally blok is hier niet nodig, Hub listener en initiële check handelen isReady af
    };

    const logOut = async () => {
        try {
            await Auth.signOut();
            // De Hub listener zal de state hieronder correct bijwerken.
        } catch (e) {
            console.error("Failed to log out:", e);
            throw e; // Hergooi de fout
        }
        // finally blok is hier niet nodig, Hub listener handelen isReady, isLoggedIn, user af
    };

    // Functie om de initiële authenticatiestatus te controleren
    const checkAuthenticationStatus = async () => {
        let authenticated = false;
        try {
            // Controleer of er een geldige sessie is
            const cognitoUser = await Auth.currentAuthenticatedUser();
            setUser(cognitoUser);
            authenticated = true;
            console.log('checkAuthenticationStatus: Gebruiker is al ingelogd:', cognitoUser.username);
            await setLoggedInState("LoggedIn"); // Update je lokale opslag
        } catch (e) {
            setUser(null);
            authenticated = false;
            console.log('checkAuthenticationStatus: Geen actieve sessie of sessie verlopen.');
            await setLoggedInState("LoggedOut"); // Zorg ervoor dat je lokale opslag consistent is
        } finally {
            setIsLoggedIn(authenticated);
            setIsReady(true); // Belangrijk: De initiële check is voltooid
        }
    };

    // Effect voor het luisteren naar Amplify Auth gebeurtenissen en de initiële check
    useEffect(() => {
        // Initieel de authenticatiestatus controleren
        checkAuthenticationStatus();

        // Listener voor Amplify Auth gebeurtenissen
        const listener = (data: any) => {
            console.log('Auth Hub event:', data.payload.event);
            switch (data.payload.event) {
                case 'signIn':
                    setUser(data.payload.data);
                    setIsLoggedIn(true);
                    setLoggedInState("LoggedIn");
                    console.log('Auth Hub: Gebruiker succesvol ingelogd:', data.payload.data.username);
                    // Optioneel: Navigeer hier als je zeker wilt zijn van de redirect
                    // router.replace("/(protected)");
                    break;
                case 'signOut':
                    setUser(null);
                    setIsLoggedIn(false);
                    setLoggedInState("LoggedOut");
                    console.log('Auth Hub: Gebruiker uitgelogd');
                    router.replace("/LoginScreen"); // Navigeer naar login na uitloggen
                    break;
                case 'signIn_failure':
                    console.error('Auth Hub: Login mislukt:', data.payload.data);
                    setUser(null);
                    setIsLoggedIn(false);
                    setLoggedInState("LoggedOut");
                    // Geen directe navigatie hier, de LoginScreen behandelt fouten.
                    break;
                case 'autoSignIn': // Als auto-login plaatsvindt (bijv. met een ververst token)
                case 'autoSignIn_failure':
                    // checkAuthenticationStatus() zal deze gevallen afvangen
                    checkAuthenticationStatus();
                    break;
                // Voeg andere relevante events toe indien nodig
            }
        };

        Hub.listen('auth', listener); // Luister naar 'auth' categorie events

        // Cleanup functie: Verwijder de listener wanneer de component unmount
        return () => Hub.remove('auth', listener);
    }, []); // Lege dependency array zorgt ervoor dat dit effect slechts één keer runt (bij mount)

    return (
        <AuthContext.Provider value={{ isReady, isLoggedIn, user, setUser, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}