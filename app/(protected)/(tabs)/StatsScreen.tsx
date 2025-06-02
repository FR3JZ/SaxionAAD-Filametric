import Snackbar from '@/components/error-handling/snackbar';
import Statistics from '@/components/stats/statistics';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Stats() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  
  return (
    <View style={styles.container}>
      <Statistics></Statistics>
      <Snackbar duration={3000} visible={snackbarVisible} message='error' onDismiss={() => setSnackbarVisible(false)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F9FAFB"
  },
});