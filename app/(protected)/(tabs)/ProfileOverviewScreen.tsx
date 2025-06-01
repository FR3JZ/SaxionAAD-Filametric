import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../../../components/Header';
import ProfileOverviewPage from '../../../components/profiles/ProfileOverviewPage';
import Snackbar from '@/components/error-handling/snackbar';
export default function ProfileOverviewScreen() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header></Header>
      <ProfileOverviewPage></ProfileOverviewPage>
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
