import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SettingsPage from '@/components/settings/SettingsPage';
export default function Settings() {
  return (
    <View style={styles.container}>
      <SettingsPage/>
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

