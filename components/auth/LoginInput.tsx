import { AuthContext } from "@/context/authContext"; // Zorg dat dit pad correct is
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, Alert } from "react-native"; // Importeer Alert voor foutmeldingen
import React from "react";
// De Auth import is hier niet meer nodig, want we gebruiken de AuthContext's logIn functie
// import { Auth } from "aws-amplify"; // Deze lijn kan verwijderd worden

const LoginInput = () => {
    // Haal de 'logIn' functie op uit de AuthContext
    // 'setUser' is hier niet meer nodig, omdat logIn dit intern afhandelt
    const { logIn } = useContext(AuthContext);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [loginError, setLoginError] = useState<string>("");

    async function handleLogin() { // Naam gewijzigd naar handleLogin voor duidelijkheid
        setLoginError(""); // Reset foutmelding bij elke poging

        if (!email) { // Kortere controle
            setLoginError("Vul alsjeblieft een e-mailadres in.");
            return;
        }

        if (!password) { // Kortere controle
            setLoginError("Vul alsjeblieft een wachtwoord in.");
            return;
        }

        try {
            // Roep de logIn functie van de AuthContext aan
            await logIn(email, password);
            console.log("LoginInput: Inloggen succesvol via AuthContext.");
            // Navigatie wordt al afgehandeld in AuthContext (router.replace("/(protected)");)
            // Dus hier hoef je geen aparte router.replace() te doen, tenzij je een specifieke afwijking wilt.
            // Als je wilt dat deze component expliciet navigeert, zorg dan dat de AuthContext géén navigatie doet.
            // Voor nu houden we de navigatie centraal in AuthContext, dus deze regel is hier niet nodig.
            // router.replace("/(protected)");
        } catch (error: any) {
            console.error("LoginInput: Fout bij inloggen:", error);
            // Gebruik de ErrorSnackbarProvider of een Alert om de fout te tonen
            if (error instanceof Error) {
                setLoginError(error.message); // Toon de specifieke fout van Cognito/Amplify
                Alert.alert("Inlogfout", error.message); // Optioneel: toon een Alert
            } else {
                setLoginError("Er is iets misgegaan tijdens het inloggen.");
                Alert.alert("Inlogfout", "Er is iets misgegaan tijdens het inloggen.");
            }
        }
    }

    function GoToRegisterScreen() {
        router.push("/RegisterScreen");
    }

    return (
        <View>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="gray"
                placeholder="Email"
                style={style.textField}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholderTextColor="gray"
                placeholder="Wachtwoord"
                style={style.textField}
            />
            {loginError.length > 0 && (
                <Text style={style.errorText}>{loginError}</Text>
            )}

            <Pressable onPress={handleLogin} style={style.button}> {/* Gebruik handleLogin */}
                <Text style={style.buttonText}>Login</Text>
            </Pressable>
            <Pressable onPress={GoToRegisterScreen} style={style.button}>
                <Text style={style.buttonText}>Register</Text>
            </Pressable>
        </View>
    );
};

const style = StyleSheet.create({
    button: {
        backgroundColor: "gray",
        alignItems: "center",
        padding: 8,
        marginTop: 4,
        marginBottom: 4,
        borderWidth: 1,
        borderRadius: 6,
    },
    buttonText: {
        color: "white",
    },
    textField: {
        marginTop: 4,
        marginBottom: 4,
        padding: 8,
        borderWidth: 1,
        borderRadius: 6,
    },
    errorText: {
        color: "red",
    },
});

export default LoginInput;