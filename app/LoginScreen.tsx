import LoginInput from "../components/auth/LoginInput";
import { Image, StyleSheet, View } from "react-native";
import React, { useState } from 'react';
import Snackbar from "@/components/error-handling/snackbar";

export default function LoginScreen() {
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    return (
        <View style={screenStyle.container}>
            <Image style={screenStyle.image} source = {require('../assets/images/Filametric_Full_Logo_v3.png')} />
            <LoginInput></LoginInput>
            <Snackbar duration={3000} visible={snackbarVisible} message='error' onDismiss={() => setSnackbarVisible(false)}/>
        </View>
    )
}

const screenStyle = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width: "100%",
        height: 100,
        resizeMode: 'contain',
    },
})