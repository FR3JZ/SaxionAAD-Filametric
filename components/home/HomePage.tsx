import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DryerCard from "./DryerCard";

const HomePage = () => {

    return(
        <View>
            <Text style={styles.titleText}>My Dryers</Text>

            <DryerCard name="Solo" status="Drying" targetTemp={75} actualTemp={73} progress={75} timeRemaining="25min" ></DryerCard>
            <DryerCard name="Duo" status="Offline" targetTemp={75} actualTemp={73} progress={40} timeRemaining="25min" ></DryerCard>
            <DryerCard name="Duo" status="Idle" targetTemp={75} actualTemp={73} progress={40} timeRemaining="25min" ></DryerCard>

        </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 23,
        marginLeft: 10,
        marginBottom: 10
    }
})

export default HomePage;