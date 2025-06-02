import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DryerAddHeader from '@/components/dryer-add/DryerAddHeader';
import DryerAddInstructionPage from '@/components/dryer-add/DryerAddInstructionPage';
export default function AddNewDryerInstructionScreen() {
  return (
    <View style={styles.container}>
      <DryerAddHeader titleText='Add New Dryer'></DryerAddHeader>
      <DryerAddInstructionPage></DryerAddInstructionPage>
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
