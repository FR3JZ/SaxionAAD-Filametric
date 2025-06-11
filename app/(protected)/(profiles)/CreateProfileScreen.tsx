import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfileCreationPage from '@/components/profiles/ProfileCreationPage';
export default function CreateProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfileCreationPage></ProfileCreationPage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F9F9F9",
    display: 'flex',
    alignItems: 'center'
  },
});
