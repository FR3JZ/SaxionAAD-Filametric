import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import DryerCard from "./DryerCard";
import { router } from "expo-router";

const HomePage = () => {
    return (
        <ScrollView>
            <View style={styles.title}>
                <Text style={styles.titleText}>Dryers</Text>
                <Pressable
                    style={styles.addButton}
                    onPress={() => router.push('/(protected)/(tabs)/AddDryerScreen')}
                >
                    <Text>+</Text>
                </Pressable>
            </View>

            <DryerCard name="Dryer 1" type="Solo" status="Completed" currentProfile="My Profile 1" targetTemp={75} actualTemp={73} progress={75} timeRemaining="25min" />
            <DryerCard name="Dryer 1" type="Solo" status="Running" currentProfile="My Profile 1" targetTemp={75} actualTemp={73} progress={75} timeRemaining="25min" />
            <DryerCard name="Dryer 1" type="Solo" status="Paused" currentProfile="My Profile 1" targetTemp={75} actualTemp={73} progress={75} timeRemaining="25min" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        marginTop: 10,
    },
    titleText: {
        fontSize: 23,
        marginLeft: 10,
        marginBottom: 10,
        fontFamily: 'Satoshi-Bold'
    },
    addButton: {
        backgroundColor: '#D9D9D9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
        width: 30,
        marginBottom: 5,
        marginRight: 10,
    },
});

export default HomePage;
