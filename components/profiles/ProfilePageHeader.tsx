import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const ProfilePageHeader = ({backArrow, title}: {backArrow: boolean, title: string}) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.topBar}>
                {!backArrow && <View style={styles.placeholder} />}
                {backArrow && <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={28}/></TouchableOpacity>}
                <Text style={styles.titleText}>{title}</Text>

                {!backArrow && 
                    <TouchableOpacity onPress={() => router.push('/(protected)/(profiles)/CreateProfileScreen')}>
                        <Ionicons name="add-circle" size={35} color={'#747474'} />
                    </TouchableOpacity>
                }
                {backArrow && <View style={styles.placeholder} />}
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 2
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

export default ProfilePageHeader;
