import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DryerAddPage from '../../..//components/dryer-add/DryerAddPage';
import DryerAddHeader from '@/components/dryer-add/DryerAddHeader';
import Snackbar from '@/components/error-handling/snackbar';

export default function AddDryerScreen() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  return (
    <View style={styles.container}>
      <DryerAddHeader titleText='QR Code Scanner'></DryerAddHeader>
      <DryerAddPage></DryerAddPage>
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
