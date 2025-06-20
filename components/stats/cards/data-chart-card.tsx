import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from "react-native"
import Chart from '../chart/chart';
import { GraphData } from '@/constants/Objects';

interface Props {
    tempData?:GraphData;
    humidityData?:GraphData;
}

const DataChartCard:  React.FC<Props> = ({tempData, humidityData}) => {
    const [dataSubject, setDataSubject] = useState<string>("Temprature");
    const [dataTitle, setDataTitle] = useState<string>("Temprature");
    const dataSubjects:string[] = ["Temprature", "Humidity", "Energy", "Materials"];

    function changeDataSubject(newSubject:string) {
        if(newSubject === "Materials") {
            setDataTitle(newSubject +  " Pie");
        } else {
            setDataTitle(newSubject +  " Curve");
        }
        setDataSubject(newSubject);
    }

    function getSubjectData() : GraphData{
        if(dataSubject === "Temprature" && tempData && tempData.value.length >= 1) {
            return tempData;
        }
        if(dataSubject === "Humidity" && humidityData && humidityData.value.length >= 1) {
            return humidityData;
        }
        return {
            timestamp: [" "],
            value: [0],
        };
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

            <Text style={styles.titleText}>{dataTitle}</Text>
            {Platform.OS === 'web' ? (
                <Text style={{padding: 12}}>Chart is not available on web</Text>
            ) : (
                <Chart data={getSubjectData()} subject={dataSubject}/>
            )}
        </View>
    )
}

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
        backgroundColor: "#F6F6F6"
    }
});