import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native"
import DataSelectionCard from "./cards/data-selection-card";
import HumidityDataCard from "./cards/humidity-data-card";
import CyclesDataCard from "./cards/cycles-data-card";
import DataChartCard from "./cards/data-chart-card";

const Statistics = () => {
    const [currentDryer, setCurrentDryer] = useState<string>("")
    const [currentTimeframe, setCurrentTimeFrame] = useState<string>("")

    function dryerChanged(dryer:string) {
        setCurrentDryer(dryer);
    }

    function timeFrameChanged(timeFrame:string) {
        setCurrentTimeFrame(timeFrame);
    }

    return (
        <ScrollView>
            <View style={styles.titleArea}>
                <Text style={styles.titleText}>Metrics</Text>
            </View>

            <DataSelectionCard 
                dryerChanged={(value: string) => dryerChanged(value)} 
                timeFrameChanged={(value:string) => timeFrameChanged(value)} 
            />

            <HumidityDataCard dryer={currentDryer} timeframe={currentTimeframe}/>
            <CyclesDataCard dryer={currentDryer} timeframe={currentTimeframe}/>
            <DataChartCard dryer={currentDryer} timeframe={currentTimeframe}/>
        </ScrollView>
    )
}

export default Statistics;

const styles = StyleSheet.create({
    titleArea: {
        marginTop: 40,
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },
    titleText: {
        fontSize: 24,
        fontWeight: "bold",
        alignSelf: "center"
    },
})