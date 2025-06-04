import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const DryerAddHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.topBar}>
                <Text style={styles.titleText}>Profiles</Text>
                <Ionicons name="add-circle" size={35} color={'#747474'}/>
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
