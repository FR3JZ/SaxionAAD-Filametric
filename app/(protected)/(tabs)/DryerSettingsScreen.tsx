import React from "react";
import { View, StyleSheet } from "react-native";
import { UnknownOutputParams, useLocalSearchParams } from "expo-router";
import DryerSettings from "@/components/dryercard/DryerSettings";

export default function DryerSettingsScreen() {
  const params:UnknownOutputParams = useLocalSearchParams();
  const name:string = Array.isArray(params.name) ? params.name[0] : params.name;

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