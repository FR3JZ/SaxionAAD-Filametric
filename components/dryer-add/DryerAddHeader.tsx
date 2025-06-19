import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const DryerAddHeader = ({ titleText }: { titleText: string }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.topBar}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>

                <Text style={styles.titleText}>{titleText}</Text>

                <View style={styles.backButton} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "#F9F9F9",
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
    backButton: {
        width: 28, 
        height: 28,
        justifyContent: "center",
        alignItems: "center",
    },
    titleText: {
        fontSize: 23,
        fontFamily: "Satoshi-Bold",
        color: "#000",
        textAlign: "center",
        flex: 1,
    },
});

export default DryerAddHeader;
