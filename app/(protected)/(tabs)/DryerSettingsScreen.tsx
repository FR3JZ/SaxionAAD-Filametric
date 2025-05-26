import React from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import DryerSettings from "../../../components/dryer/DryerSettings";
import Header from "@/components/Header";
export default function DryerSettingsScreen() {
  const {
    name,
    status,
    type,
    targetTemp,
    actualTemp,
    progress,
    timeRemaining,
  } = useLocalSearchParams();

  return (
    <View style={styles.container}>
        <Header></Header>
      <DryerSettings
        name={Array.isArray(name) ? name[0] : name ?? ""}
        status={Array.isArray(status) ? status[0] : status ?? ""}
        type={Array.isArray(type) ? type[0] : type ?? ""}
        targetTemp={Array.isArray(targetTemp) ? targetTemp[0] : targetTemp ?? ""}
        actualTemp={Array.isArray(actualTemp) ? actualTemp[0] : actualTemp ?? ""}
        progress={Array.isArray(progress) ? progress[0] : progress ?? ""}
        timeRemaining={Array.isArray(timeRemaining) ? timeRemaining[0] : timeRemaining ?? ""}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  },
});