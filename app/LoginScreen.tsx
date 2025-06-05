import LoginInput from "../components/auth/LoginInput";
import { Image, StyleSheet, Text, View } from "react-native";
import React from 'react';

export default function LoginScreen() {
    return (
        <View style={screenStyle.container}>
            <View style={screenStyle.header}>
                <Image style={screenStyle.image} source={require('../assets/images/Filametric_F_logo.png')} />
                <Text style={screenStyle.titleText}>Log in or sign up</Text>
            </View>
            <LoginInput />
        </View>
    )
}

const screenStyle = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        marginTop: 32
    },
    titleText: {
        fontFamily: "Satoshi",
        fontSize: 32,
        fontWeight: "700",
        marginTop: 24,
    },
    container: {
        margin: 20,
        flex: 1,
    },
    image: {
        width: 57,
        height: 54,
        resizeMode: 'contain',
    },
});