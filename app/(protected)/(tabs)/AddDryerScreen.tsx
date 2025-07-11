import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DryerAddPage from '../../..//components/dryer-add/DryerAddPage';
import DryerAddHeader from '@/components/dryer-add/DryerAddHeader';
export default function AddDryerScreen() {
  return (
    <View style={styles.container}>
      <DryerAddHeader titleText='QR Code Scanner'></DryerAddHeader>
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
