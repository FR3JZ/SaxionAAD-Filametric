import PasswordResetInput from '@/components/auth/login/ResetPasswordInput';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function() {
    return (
        <View style={style.container}>
            <PasswordResetInput/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
    },
})
