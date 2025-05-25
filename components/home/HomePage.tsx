import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import DryerCard from "./DryerCard";
import { router } from "expo-router";

const HomePage = () => {

    return(
        <View>
            <View style={styles.title}>
                <Text style={styles.titleText}>My Dryers</Text>
                <Pressable style={styles.addButton} onPress={() => router.push('/(protected)/(tabs)/AddDryerScreen')}>
                    <Text>+</Text>
                </Pressable>
            </View>

            <DryerCard name="Dryer 1" type="Solo" status="Drying" targetTemp={75} actualTemp={73} progress={75} timeRemaining="25min" ></DryerCard>
            <DryerCard name="Dryer 2" type="Duo" status="Offline"></DryerCard>
            <DryerCard name="Dryer 3" type="Duo" status="Idle" ></DryerCard>

        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50
    },

    titleText: {
        fontSize: 23,
        marginLeft: 10,
        marginBottom: 10
    },

    addButton: {
        backgroundColor: '#D9D9D9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
        width: 30,
        marginBottom: 5,
        marginRight: 10
    }
})

export default HomePage;