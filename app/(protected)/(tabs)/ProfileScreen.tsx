import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../../../components/Header';
import ProfilePage from '@/components/profile/ProfilePage';
import { DryingProfile } from '../../../constants/Objects';
import { useLocalSearchParams } from 'expo-router';
export default function ProfileScreen() {
  const params = useLocalSearchParams();
  let profile: DryingProfile | null = null;

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
