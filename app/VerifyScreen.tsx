import VerifyInput from "../components/auth/VerifyInput";
import { StyleSheet, View } from "react-native";
import React, { useState } from 'react';
import Snackbar from "@/components/error-handling/snackbar";


export default function Verify() {
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    return (
        <View style={screenStyle.container}>
            <VerifyInput/>
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
})