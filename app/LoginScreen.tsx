import LoginInput from "../components/auth/login/LoginInput";
import { Image, StyleSheet, Text, View } from "react-native";
import React from 'react';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source = {require('../assets/images/Filametric_F_Logo.png')} />
            <Text style={styles.title}>Log in or sign up</Text>
            <LoginInput></LoginInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1
    },
    image: {
        width: "100%",
        height: 100,
        resizeMode: 'contain',
        marginTop: 75,
        marginBottom: 30
    },

    title: {
        fontFamily: 'Satoshi-Bold',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20
    }
})