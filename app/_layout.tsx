import { AuthProvider } from "@/context/authContext";
import { Stack } from "expo-router";
import React from "react";


import { Amplify } from 'aws-amplify';
import awsconfig from '@/src/aws-exports'
Amplify.configure(awsconfig);

export default function RootLayout() {
    return (
        <AuthProvider>
            <React.Fragment>
                <Stack>
                    <Stack.Screen name="(protected)" options={{
                        headerShown: false
                    }}/>
                    <Stack.Screen name="LoginScreen" options={{
                        headerShown: false
                    }}/>
                    <Stack.Screen name="RegisterScreen" options={{
                        headerShown: false
                    }}/>
                </Stack>
            </React.Fragment>
        </AuthProvider>
    )
}