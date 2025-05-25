import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import type { DryerCardProps } from "./DryerCard";
import { router } from "expo-router";

const DryerCardActions: React.FC<DryerCardProps> = ({
  name,
  status,
  type,
  targetTemp,
  actualTemp,
  progress,
  timeRemaining
}) => {
  const renderPrimaryButton = () => {
    if (status === "Drying") {
      return (
        <TouchableOpacity style={styles.buttonStop}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      );
    }
    if (status === "Idle") {
      return (
        <TouchableOpacity style={styles.buttonStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const showProfiles = status === "Drying" || status === "Idle";
  const showSettings = true; // Always show settings

  const containerStyle =
    status === "Offline" ? styles.buttonRowEnd : styles.buttonRow;

  return (
    <View style={containerStyle}>
      {renderPrimaryButton()}

      {showProfiles && (
        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>Profiles</Text>
        </TouchableOpacity>
      )}

      {showSettings && (
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() =>
             router.push({
      pathname: '/(protected)/(tabs)/DryerSettingsScreen',
      params: {
        name,
        status,
        type,
        targetTemp: targetTemp?.toString() ?? '',
        actualTemp: actualTemp?.toString() ?? '',
        progress: progress?.toString(),
        timeRemaining,
      },
    })
          }
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  buttonRowEnd: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonStop: {
    backgroundColor: "#e53935",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  buttonStart: {
    backgroundColor: "#43a047",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  buttonSecondary: {
    backgroundColor: "#6200ea",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default DryerCardActions;
