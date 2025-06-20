import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { AuthContext } from "@/context/authContext";
const Header = () => {
    const auth = useContext(AuthContext)
    const [username, setUsername] = useState<string>("");
    const [isGettingUsername, setIsGettingUsername] = useState<boolean>(false);

    useEffect(() => {
        setTheUsername();
    }, [])

    async function setTheUsername() {
        try {
            setIsGettingUsername(true);
            const name = await auth.getCurrentUsername();
            if(name !== null) {
                setUsername(name);
            }
        } finally {
            setIsGettingUsername(false);
        }
    }


    return (
        <View style={styles.headerWrapper}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.push("/(protected)/(user)/UserProfileScreen")}>
                    <Ionicons name="person" size={28} color="#444" />
                </TouchableOpacity>

                {!isGettingUsername ? 
                    <Text style={styles.greeting}>Hi, {username}</Text> 
                : 
                    <ActivityIndicator style={{alignSelf:'center'}} color="#FFFFFF" size={32}/>
                }
                

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
