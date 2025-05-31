import React from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import DryerSettings from "@/components/dryercard/DryerSettings";

export default function DryerSettingsScreen() {
  const params = useLocalSearchParams();
  const name = Array.isArray(params.name) ? params.name[0] : params.name;

  return (
    <View style={styles.container}>
      <DryerSettings name={name} />
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