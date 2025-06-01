import Snackbar from '@/components/error-handling/snackbar';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Settings() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
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

