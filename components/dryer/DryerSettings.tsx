import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ActiveDryerSettings from "./ActiveDryerSettings";

type DryerSettingsProps = {
  name: string;
  status: string;
  type: string;
  targetTemp: string;      
  actualTemp: string;
  progress: string;
  timeRemaining: string; 
};

const DryerSettings: React.FC<DryerSettingsProps> = ({
  name,
  status,
  type,
  targetTemp,
  actualTemp,
  progress,
  timeRemaining,
}) => {
  const parsedTemp = parseInt(targetTemp, 10);
  const parsedTime = timeRemaining.includes(":")
    ? (() => {
        const [h, m] = timeRemaining.split(":").map(Number);
        return h * 60 + m;
      })()
    : parseInt(timeRemaining, 10);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Dryer settings</Text>
        <Text style={styles.info}>Name: {name}</Text>
        <Text style={styles.info}>Type: {type}</Text>
        <Text style={styles.info}>Status: {status}</Text>
      </View>
      {status === "Drying" && (
        <ActiveDryerSettings
          initialTemp={parsedTemp}
          initialTimeMinutes={parsedTime}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default DryerSettings;
