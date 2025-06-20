import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from "react-native"

interface Props {
    currentPercentage?: number;
    wrtLast?: number;
    timeframe: number;
}

const HumidityDataCard: React.FC<Props> = ({currentPercentage, wrtLast, timeframe}) => {

    function getTimeframeText(): string{
        if(wrtLast === undefined) return "";
        if(timeframe === 1) {
            return wrtLast >= 0 ? "+ " + String(wrtLast) + " w.r.t last day" : String(wrtLast) + " w.r.t last day"
        }
        if(timeframe === 7) {
            return wrtLast >= 0 ? "+ " + String(wrtLast) + " w.r.t last week" : String(wrtLast) + " w.r.t last week"
        }
        return ""
    }
    
    return (
        <View style={styles.card}>
            <View style={styles.titleContainer}>
                <Ionicons name='water' size={32} style={styles.icon}></Ionicons>
                <Text style={styles.titleText}>Humidity reduction</Text>
            </View>
            <Text style={styles.statText}>{currentPercentage}%</Text>
            <Text style={styles.changeText}>{getTimeframeText()}</Text>
        </View>
    )
}

export default HumidityDataCard;

const styles = StyleSheet.create({
    icon: {
        color: "#0086D4",
    },
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
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    titleContainer: {
        marginVertical: 16,
        flexDirection: 'row',
        flex: 1,
    },
    titleText: {
        fontSize: 24,
        fontWeight: "500",
        fontFamily: 'Satoshi',
    },
    statText: {
        fontSize: 32,
        fontFamily: 'Satoshi',
        fontWeight: "500",
        marginLeft: 8
    },
    changeText: {
        fontSize: 19,
        color: "#009632",
        marginLeft: 8,
        paddingBottom: 6,
        fontFamily: 'Satoshi',
        fontWeight: "400"
    }
});