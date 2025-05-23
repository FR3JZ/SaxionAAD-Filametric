import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import DryerCard from "./DryerCard";

const HomePage = () => {

    return(
        <View>
            <View style={styles.title}>
                <Text style={styles.titleText}>My Dryers</Text>
                <Pressable style={styles.addButton}>
                    <Text>+</Text>
                </Pressable>
            </View>

            <DryerCard name="Solo" status="Drying" targetTemp={75} actualTemp={73} progress={75} timeRemaining="25min" ></DryerCard>
            <DryerCard name="Duo" status="Offline" targetTemp={75} actualTemp={73} progress={40} timeRemaining="25min" ></DryerCard>
            <DryerCard name="Duo" status="Idle" targetTemp={75} actualTemp={73} progress={40} timeRemaining="25min" ></DryerCard>

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