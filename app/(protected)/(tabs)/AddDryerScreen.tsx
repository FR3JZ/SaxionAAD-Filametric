import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../../../components/Header';
import DryerAddPage from '../../..//components/dryer-add/DryerAddPage';
import Snackbar from '@/components/error-handling/snackbar';
export default function AddDryerScreen() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header></Header>
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
