import DryerAddConfirmationPage from '@/components/dryer-add/DryerAddConfirmationPage';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
export default function QRCodeScannerScreen() {
  return (
    <View style={styles.container}>
        <DryerAddConfirmationPage></DryerAddConfirmationPage>
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
