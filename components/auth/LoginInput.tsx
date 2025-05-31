import { AuthContext } from "@/context/authContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Auth } from "aws-amplify";

const LoginInput = () => {
    const { setUser } = useContext(AuthContext);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [loginError, setLoginError] = useState<string>("");

    async function Login() {
        if (!isEmailFilled()) {
            setLoginError("Please enter an email.");
            return;
        }

        if (!isPasswordFilled()) {
            setLoginError("Please enter a password.");
            return;
        }

        try {
            const user = await Auth.signIn(email, password);
            console.log("Signed in user:", user);

            setUser(user);
            router.replace("/");
        } catch (error) {
            console.error("Login error:", error);
            if (error instanceof Error) {
                setLoginError(error.message);
            } else {
                setLoginError("Something went wrong while signing in.");
            }
        }
    }

    function isEmailFilled(): boolean {
        return email.length > 0;
    }

    function isPasswordFilled(): boolean {
        return password.length > 0;
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
                placeholder="Password"
                style={style.textField}
            />
            {loginError.length > 0 && (
                <Text style={style.errorText}>{loginError}</Text>
            )}

            <Pressable onPress={Login} style={style.button}>
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
