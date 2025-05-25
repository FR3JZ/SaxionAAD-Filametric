import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

type ActiveDryerSettingsProps = {
    initialTemp: number;
    initialTimeMinutes: number;
};

const ActiveDryerSettings: React.FC<ActiveDryerSettingsProps> = ({
    initialTemp,
    initialTimeMinutes,
}) => {
    const [temperature, setTemperature] = useState(initialTemp);
    const [timeHours, setTimeHours] = useState(Math.floor(initialTimeMinutes / 60));
    const [timeMinutes, setTimeMinutes] = useState(initialTimeMinutes % 60);

    // RESET state when this screen gets focus (e.g. reopened)
    useFocusEffect(
        useCallback(() => {
            setTemperature(initialTemp);
            setTimeHours(Math.floor(initialTimeMinutes / 60));
            setTimeMinutes(initialTimeMinutes % 60);
        }, [initialTemp, initialTimeMinutes])
    );

    const increaseTemperature = () => setTemperature(temp => temp + 1);
    const decreaseTemperature = () => setTemperature(temp => Math.max(0, temp - 1));

    const increaseTime = () => {
        let totalMinutes = timeHours * 60 + timeMinutes + 1;
        setTimeHours(Math.floor(totalMinutes / 60));
        setTimeMinutes(totalMinutes % 60);
    };

    const decreaseTime = () => {
        let totalMinutes = timeHours * 60 + timeMinutes - 1;
        totalMinutes = Math.max(0, totalMinutes);
        setTimeHours(Math.floor(totalMinutes / 60));
        setTimeMinutes(totalMinutes % 60);
    };

    const handleSave = () => {
        const dryerSettings = {
            temperature,
            time: {
                hours: timeHours,
                minutes: timeMinutes,
            },
        };
        console.log("Saved settings:", dryerSettings);
    };

    return (
        <View style={styles.container}>
            <View style={styles.settingBox}>
                <View style={styles.labelGroup}>
                    <Text style={styles.label}>Target temperature</Text>
                    <Text style={styles.value}>{temperature}°C</Text>
                </View>
                <View style={styles.arrowGroup}>
                    <TouchableOpacity
                        onPress={increaseTemperature}
                        style={styles.arrowTouchable}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={styles.arrow}>↑</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={decreaseTemperature}
                        style={styles.arrowTouchable}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={styles.arrow}>↓</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.settingBox}>
                <View style={styles.labelGroup}>
                    <Text style={styles.label}>Time remaining</Text>
                    <Text style={styles.value}>
                        {timeHours} hours {timeMinutes} minutes
                    </Text>
                </View>
                <View style={styles.arrowGroup}>
                    <TouchableOpacity
                        onPress={increaseTime}
                        style={styles.arrowTouchable}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={styles.arrow}>↑</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={decreaseTime}
                        style={styles.arrowTouchable}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={styles.arrow}>↓</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    settingBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#eee",
        padding: 16,
        marginBottom: 20,
        borderRadius: 10,
    },
    labelGroup: {
        flex: 1,
        justifyContent: "center",
    },
    arrowGroup: {
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: { fontSize: 18, marginBottom: 4 },
    value: { fontSize: 20, fontWeight: "500" },
    arrow: {
        fontSize: 24,
        fontWeight: "bold",
    },
    arrowTouchable: {
        padding: 7,
    },
    saveButton: {
        backgroundColor: "#222", // Dark background (adjust as needed)
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});

export default ActiveDryerSettings;
