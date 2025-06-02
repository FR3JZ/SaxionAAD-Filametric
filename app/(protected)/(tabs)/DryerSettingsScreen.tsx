import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import DryerSettings from "@/components/dryercard/DryerSettings";
import Snackbar from "@/components/error-handling/snackbar";

export default function DryerSettingsScreen() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const params = useLocalSearchParams();
  const name = Array.isArray(params.name) ? params.name[0] : params.name;

  return (
    <View style={styles.container}>
      <DryerSettings name={name} />
      <Snackbar duration={3000} visible={snackbarVisible} message='error' onDismiss={() => setSnackbarVisible(false)}/>
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