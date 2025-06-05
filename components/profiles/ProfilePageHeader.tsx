import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DryerAddHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.topBar}>
                <View style={styles.placeholder} />
                <Text style={styles.titleText}>Profiles</Text>
                <TouchableOpacity>
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
