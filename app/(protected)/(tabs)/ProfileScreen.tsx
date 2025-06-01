import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../../../components/Header';
import ProfilePage from '@/components/profile/ProfilePage';
import { DryingProfile } from '../../../constants/Objects';
import { useLocalSearchParams } from 'expo-router';
import Snackbar from '@/components/error-handling/snackbar';
export default function ProfileScreen() {
  const params = useLocalSearchParams();
  let profile: DryingProfile | null = null;

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  if(typeof params.profile === 'string') {
    try {
      profile = JSON.parse(params.profile);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Header></Header>
      <ProfilePage profile={profile}></ProfilePage>
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
