import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from 'react';
import { Auth } from 'aws-amplify';

const VerifyInput = () => {
    const params = useLocalSearchParams();
    const username = params.username as string;

    const [verification, setVerification] = useState<string>("");
    const [verificationError, setVerificationError] = useState<string>("");

    async function VerifyAccount() {
        try {
            await Auth.confirmSignUp(username, verification);
            router.push("/LoginScreen");
        } catch (error: any) {
            setVerificationError(error.message || "Er is iets misgegaan bij de verificatie.");
        }
    }

    return (
        <View style={style.container}>
            <TextInput
                value={verification}
                onChangeText={setVerification}
                placeholderTextColor="gray"
                placeholder="Email verification code"
                style={style.textField}
                keyboardType="number-pad"
                autoCapitalize="none"
            />
            {verificationError.length > 0 && (
                <Text style={style.errorText}>{verificationError}</Text>
            )}

            <Pressable onPress={VerifyAccount} style={style.button}>
                <Text style={style.buttonText}>Verify Account</Text>
            </Pressable>
        </View>
    );
};

export default VerifyInput;

const style = StyleSheet.create({
    container: {
        padding: 16,
    },
    textField: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        color: "black",
    },
    button: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        marginBottom: 8,
    },
});
