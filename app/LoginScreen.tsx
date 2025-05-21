import LoginInput from "@/components/auths/LoginInput";
import { Image, StyleSheet, View } from "react-native";
import React from 'react';

export default function LoginScreen() {
    return (
        <View style={screenStyle.container}>
            <Image style={screenStyle.image} source = {require('../assets/images/Filametric_Full_Logo_v3.png')} />
            <LoginInput></LoginInput>
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