import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const UserProfileHeader = () => {
    return (
        <View style={styles.container}>
            <View style={styles.titleRow}>
                <View style={styles.side}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons size={30} name="arrow-back" />
                    </TouchableOpacity>
                </View>
                <View style={styles.center}>
                    <Text style={styles.title}>Profile</Text>
                </View>
                <View style={styles.side} />
            </View>
        </View>
    );
};

export default UserProfileHeader;

const styles = StyleSheet.create({
    container: {
        height: 112,
        backgroundColor: "#FFFFFF",
        justifyContent: 'flex-end',
        paddingBottom: 16,

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,

        // Android Shadow
        elevation: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    side: {
        width: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: "500",
        fontFamily: "Satoshi",
    },
});