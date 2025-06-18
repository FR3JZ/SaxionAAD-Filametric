import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from "react-native";

interface Props {
    cyclesInTimeFrame?: number;
    wrtLast?: number;
    timeframe: number;
}

const CyclesDataCard:  React.FC<Props> = ({cyclesInTimeFrame, wrtLast, timeframe}) => {

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
                <Ionicons style={styles.icon} size={32} name='checkmark-circle'></Ionicons>
                <Text style={styles.titleText}>Completed cycles</Text>
            </View>
            <Text style={styles.statText}>{cyclesInTimeFrame} Cycles</Text>
            <Text style={styles.changeText}> {getTimeframeText()}</Text>
        </View>
    )
}

export default CyclesDataCard;

const styles = StyleSheet.create({
    icon: {
        color: "#00C03B",
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