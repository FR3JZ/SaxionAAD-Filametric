import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Chart from '../chart/chart';

interface Props {
    dryer: string;
    timeframe: string;
}

const DataChartCard: React.FC<Props> = ({ dryer, timeframe }) => {
    // State to track which data subject is selected
    const [dataSubject, setDataSubject] = useState<string>("Temprature");

    // Display title based on subject and type of chart
    const [dataTitle, setDataTitle] = useState<string>("Temprature");

    const dataSubjects: string[] = ["Temprature", "Humidity", "Energy", "Materials"];

    function changeDataSubject(newSubject: string) {
        if (newSubject === "Materials") {
            setDataTitle(newSubject + " Pie");
        } else {
            setDataTitle(newSubject + " Curve");
        }
        setDataSubject(newSubject);
    }

    return (
        <View style={styles.card}>
            {/* Buttons to switch between data subjects */}
            <View style={styles.buttonRow}>
                {dataSubjects.map((subject) => (
                    <Pressable
                        key={subject}
                        onPress={() => changeDataSubject(subject)}
                        style={[styles.button, dataSubject === subject && styles.selectedButton]}
                    >
                        <Text>{subject}</Text>
                    </Pressable>
                ))}
            </View>

            {/* Chart title */}
            <Text style={styles.titleText}>{dataTitle}</Text>

            {/* Platform-specific handling for chart rendering */}
            {Platform.OS === 'web' ? (
                <Text style={{ padding: 12 }}>Chart is not available on web</Text>
            ) : (
                <Chart dryer={dryer} timeframe={timeframe} subject={dataSubject} />
            )}
        </View>
    );
};

export default DataChartCard;

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 14,
        marginVertical: 6,
        padding: 4,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    titleText: {
        fontSize: 24,
        marginLeft: 12,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        marginHorizontal: 6,
        marginTop: 4,
    },
    button: {
        marginHorizontal: 2,
        padding: 4,
    },
    selectedButton: {
        backgroundColor: "#F6F6F6",
    }
});
