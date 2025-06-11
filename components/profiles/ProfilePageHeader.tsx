import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Auth } from 'aws-amplify';
import { router } from "expo-router";

const DryerAddHeader = () => {

    const handlePostRequest = async () => {
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();
        router.push('/(protected)/(profiles)/CreateProfileScreen');
        // try {
        //     console.log(token);
        //     const response = await fetch('https://hkp9clnxq6.execute-api.eu-north-1.amazonaws.com/dev/profiles', {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`,
        //       },
        //       body: JSON.stringify({
        //         "name": "PETG Quick Dry",
        //         "description": "Snel droogprofiel voor PETG filament",
        //         "target_temperature": 65.0,
        //         "duration": 7200,
        //         "drying_mode": "silent",
        //         "switch_to_storage": true,
        //         "storage_temperature": 30.0
        //       }),
        //     });
            
        //     console.log(response);
        //     const data = await response.json();
        //     console.log('Server response:', data);
        //   } catch (error) {
        //     console.error('Fout bij POST request:', error);
        //   }
    }

    return (
        <View style={styles.headerContainer}>
            <View style={styles.topBar}>
                <View style={styles.placeholder} />
                <Text style={styles.titleText}>Profiles</Text>
                <TouchableOpacity onPress={handlePostRequest}>
                    <Ionicons name="add-circle" size={35} color={'#747474'} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "#fff",
        paddingTop: 50,
        paddingBottom: 10,
        width: "100%",
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    placeholder: {
        width: 35, 
        height: 35,
    },
    titleText: {
        fontSize: 23,
        fontFamily: "Satoshi-Medium",
        color: "#000",
        textAlign: "center",
    },
});

export default DryerAddHeader;
