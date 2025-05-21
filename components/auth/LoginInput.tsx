import { AuthContext } from "@/context/authContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React from 'react';

const LoginInput = () => {
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [loginError, setLoginError] = useState<string>("");

    function Login() {
        if(!isEmailFilled()) {
            setLoginError("Please enter a email.")
            return;
        } else {
            setLoginError("");
        }

        if(!isPasswordFilled()) {
            setLoginError("Please enter a password.")
            return;
        } else {
            setLoginError("");
        }
        authContext.logIn(email, password);
    }

    function isEmailFilled(): boolean {
        return email.length > 0;
    }

    function isPasswordFilled(): boolean {
        return password.length > 0;
    }

    function GoToRegisterScreen() {
        router.push("/RegisterScreen")
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
            <TextInput 
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholderTextColor={"gray"} 
                placeholder="Password" 
                style={style.textField}
                />
            {loginError.length > 0 && 
                <Text style={style.errorText}>{loginError}</Text>
            }

            <Pressable onPress={Login} style={style.button}>
                <Text style={style.buttonText}>Login</Text>
            </Pressable>
            <Pressable onPress={GoToRegisterScreen} style={style.button}>
                <Text style={style.buttonText}>Register</Text>
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

export default LoginInput;