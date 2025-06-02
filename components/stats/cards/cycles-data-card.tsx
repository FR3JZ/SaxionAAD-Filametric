import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from "react-native"

interface Props {
    dryer: string;
    timeframe: string;
}

const CyclesDataCard:  React.FC<Props> = ({dryer, timeframe}) => {

    function getTimeframeText(): string{
        return "in " + timeframe.toLowerCase();
    }

    return (
        <View style={styles.card}>
            <View style={styles.titleContainer}>
                <Ionicons style={styles.icon} size={32} name='checkmark-circle'></Ionicons>
                <Text style={styles.titleText}> Cycles</Text>
            </View>
            <Text style={styles.statText}>7 Cycles</Text>
            <Text style={styles.changeText}>+ 1 w.r.t. {getTimeframeText()}</Text>
        </View>
    )
}

export default CyclesDataCard;

const styles = StyleSheet.create({
    icon: {
        color: "#00C03B",
    },
    card: {
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 14,
        marginVertical: 6,
        padding: 4
    },
    titleContainer: {
        marginVertical: 16,
        flexDirection: 'row',
        flex: 1,
    },
    titleText: {
        fontSize: 24
    },
    statText: {
        fontSize: 32,
        fontWeight: "bold",
        marginLeft: 8
    },
    changeText: {
        fontSize: 19,
        color: "#009632",
        marginLeft: 8,
        paddingBottom: 6,
    }
})