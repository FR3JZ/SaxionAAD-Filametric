import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from "react-native"
import Chart from '../chart/chart';

interface Props {
    dryer: string;
    timeframe: string;
}

const DataChartCard:  React.FC<Props> = ({dryer, timeframe}) => {
    const [dataSubject, setDataSubject] = useState<string>("Temprature");
    const dataSubjects:string[] = ["Temprature", "Humidity", "Energy", "Materials"];

    function changeDataSubject(newSubject:string) {
        setDataSubject(newSubject);
    }

    return (
        <View style={styles.card}>
            <View style={styles.buttonRow}>
                {dataSubjects.map((subject) => (
                <Pressable
                    key={subject}
                    onPress={() => changeDataSubject(subject)}
                    style={[ styles.button, dataSubject === subject && styles.selectedButton ]}>
                    <Text>{subject}</Text>
                </Pressable>
                ))}
            </View>

            <Text style={styles.titleText}>{dataSubject} curve</Text>
            {Platform.OS === 'web' ? (
                <View>
                    <Text style={{padding: 12}}>Chart is not available on web</Text>
                </View>
            ) : (
                <Chart dryer={dryer} timeframe={timeframe} subject={dataSubject}/>
            )}
        </View>
    )
}

export default DataChartCard;

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 14,
        marginVertical: 6,
        padding: 4
    },
    titleText: {
        fontSize: 24,
        marginLeft: 12,
    },
    buttonRow: {
        backgroundColor: "#F6F6F6",
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        marginHorizontal: 6,
    },
    button: {
        marginHorizontal: 2,
        padding: 4,
    },
    selectedButton: {
        backgroundColor: "#FFFFFF"
    }
})