import RegisterInput from "../components/auth/RegisterInput";
import { StyleSheet, View } from "react-native";
import React from 'react';

export default function Register() {
    return (
        <View style={screenStyle.container}>
            <RegisterInput/>
        </View>
    )
}

const screenStyle = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        justifyContent: 'center',
    },
})