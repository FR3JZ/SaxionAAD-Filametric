import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DryerAddHeader from '@/components/dryer-add/DryerAddHeader';
import QRScannerPage from '@/components/dryer-add/QRScannerPage';
export default function QRCodeScannerScreen() {
  return (
    <View style={styles.container}>
      <DryerAddHeader titleText='QR Code Scanner'></DryerAddHeader>
      <QRScannerPage></QRScannerPage>
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
