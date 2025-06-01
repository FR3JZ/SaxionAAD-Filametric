import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../../components/Header';
import HomePage from '../../../components/home/HomePage';
import Snackbar from '@/components/error-handling/snackbar';
export default function TabOneScreen() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header></Header>
      <HomePage></HomePage>
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
