import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native"
import DataSelectionCard from "./cards/data-selection-card";
import HumidityDataCard from "./cards/humidity-data-card";
import CyclesDataCard from "./cards/cycles-data-card";
import DataChartCard from "./cards/data-chart-card";
import { StatsData } from "@/constants/Objects";
import StatsService from "@/services/statsService";

const Statistics = () => {
    const [isGettingStats, setIsGettingStats] = useState<boolean>(false)

    const [currentDryer, setCurrentDryer] = useState<string>("")
    const [currentTimeframe, setCurrentTimeFrame] = useState<number>(1)

    const [statistics, setStatistics] = useState<StatsData>(); // The statistic data given to the cards.


    // Reset the stats when the user want to see a different dryer or timeframe
    useEffect(() => {
        if (currentDryer && currentTimeframe) {
            setStats();
        }
    }, [currentDryer, currentTimeframe]);

    /**
     * Select a different dryer
     * @param dryer The dryer that is now selected
     */
    function dryerChanged(dryer: string) {
        setCurrentDryer(dryer);
    }

    /**
     * Select a different timeframe
     * @param timeFrame The timeframe that is now selected
     */
    function timeFrameChanged(timeFrame: number) {
        setCurrentTimeFrame(timeFrame);
    }

    /**
     * Retrieves a StatsData object from the StatsService. Then sets it as statistics.
     * Sets a empty object when there is an error.
     */
    async function setStats() {
        try {
            setIsGettingStats(true);
            if(currentDryer === 'All dryers') {
                const data:StatsData = await StatsService.getAllDeviceStats(currentTimeframe);
                setStatistics(data)
            } else {
                const data: StatsData = await StatsService.getStatsData(currentDryer, currentTimeframe);
                setStatistics(data)
            }
            
        } catch (error) {
            setStatistics({
                humidityReductionPercentage: 0,
                completedCycles: 0,
                wrtHumidity: 0,
                wrtCycles: 0,
                temperaturePeriodArray: {
                    timestamp: [],
                    value: []
                },
                humidityPeriodArray: {
                    timestamp: [],
                    value: []
                },
            })
        } finally {
            setIsGettingStats(false)
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.titleText}>Metrics</Text>
            </View>
            <View>
                <DataSelectionCard 
                    dryerChanged={(value: string) => dryerChanged(value)} 
                    timeFrameChanged={(value:number) => timeFrameChanged(value)} 
                />

                <HumidityDataCard 
                    currentPercentage={statistics?.humidityReductionPercentage}
                    wrtLast={statistics?.wrtHumidity}
                    timeframe={currentTimeframe}
                />

                <CyclesDataCard 
                    cyclesInTimeFrame={statistics?.completedCycles}
                    wrtLast={statistics?.wrtCycles}
                    timeframe={currentTimeframe}
                />

                <DataChartCard 
                    tempData={statistics?.temperaturePeriodArray}
                    humidityData={statistics?.humidityPeriodArray}
                />
            </View>
        </ScrollView>
    )
}

export default Statistics;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F9F9F9"
    },
    titleArea: {
        padding: 20,
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#FFFFFF",
    },
    titleText: {
        fontSize: 24,
        alignSelf: "center",
        fontFamily: "Satoshi",
        marginTop: 15
    },
});