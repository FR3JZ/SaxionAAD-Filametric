import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../../components/Header';
import AddProfilePage from '../../../components/profile-add/AddProfilePage';
import Snackbar from '@/components/error-handling/snackbar';
export default function AddDryerScreen() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header></Header>
      <AddProfilePage></AddProfilePage>
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
