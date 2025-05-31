import VerifyInput from "../components/auth/VerifyInput";
import { StyleSheet, View } from "react-native";
import React from 'react';


export default function Verify() {
    return (
        <View style={screenStyle.container}>
            <VerifyInput/>
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