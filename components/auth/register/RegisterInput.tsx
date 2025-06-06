import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React from 'react';

const RegisterInput = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordRepeat, setPasswordRepeat] = useState<string>("");

    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [passwordRepeatError, setPasswordRepeatError] = useState<string>("");

    const passwordRegex:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;

async function CreateAccount() {
    if (!isPasswordStrong()) { // Kan uit de passwords rules van cognito worden gehaald.
        setPasswordError("Invalid Password, Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.");
        return;
    } else {
        setPasswordError("");
    }

    if (!isPasswordsTheSame()) {
        setPasswordRepeatError("The password is not the same.");
        return;
    } else {
        setPasswordRepeatError("");
    }
}

    function isPasswordStrong():boolean {
        return passwordRegex.test(password);
    }

    function isPasswordsTheSame(): boolean {
        return password === passwordRepeat;
    }

    function GoToVerifyScreen() {
        router.push({ pathname: "/VerifyScreen", params: { username: email } });
    }

    function GoToLoginScreen() {
        router.push("/LoginScreen")
    }

    return (
        <View>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={"gray"} 
                placeholder="Email" 
                style={style.textField}
                />
            {emailError.length > 0 && 
                <Text style={style.errorText}>{emailError}</Text>
            }

            <TextInput 
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholderTextColor={"gray"} 
                placeholder="Password" 
                style={style.textField}
                />
            {passwordError.length > 0 && 
                <Text style={style.errorText}>{passwordError}</Text>
            }

            <TextInput 
                value={passwordRepeat}
                onChangeText={setPasswordRepeat}
                secureTextEntry={true}
                placeholderTextColor={"gray"} 
                placeholder="Repeat password" 
                style={style.textField}
                />
            {passwordRepeatError.length > 0 && 
                <Text style={style.errorText}>{passwordRepeatError}</Text>
            }

            <Pressable onPress={CreateAccount} style={style.button}>
                <Text style={style.buttonText}>Create</Text>
            </Pressable>
            <Pressable onPress={GoToLoginScreen} style={style.button}>
                <Text style={style.buttonText}>Cancel</Text>
            </Pressable>
        </View>
    )
};

const style = StyleSheet.create({
    button: {
        backgroundColor: "gray",
        alignItems: "center",
        padding: 8,
        marginTop: 4,
        marginBottom: 4,
        borderWidth: 1,
        borderRadius: 6
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
        color: "red"
    },
})

export default RegisterInput;