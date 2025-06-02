import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DryerAddHeader from '@/components/dryer-add/DryerAddHeader';
import DryerAddPage from '@/components/dryer-add/DryerAddPage';
export default function AddNewDryerInstructionScreen() {
  return (
    <View style={styles.container}>
      <DryerAddHeader titleText='Add New Solo'></DryerAddHeader>
      <DryerAddPage></DryerAddPage>
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
