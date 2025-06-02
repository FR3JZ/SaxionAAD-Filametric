import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
const Header = () => {

    return (
        <View style={styles.headerWrapper}>
            <View style={styles.topBar}>
                <TouchableOpacity>
                    <Ionicons name="person" size={28} color="#444" />
                </TouchableOpacity>

                <Text style={styles.greeting}>Hi, Alexander</Text>

                <TouchableOpacity onPress={() => router.push("/(protected)/(dryer-add)/AddNewDryerInstructionScreen")}>
                    <Ionicons name="add-circle" size={28} color="#444" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: "#fff",
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    greeting: {
        fontSize: 20,
        color: "#333",
        textAlign: "center",
        flex: 1,
    },
});

export default Header;
