import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../../../components/Header';
import ProfilePage from '../../../components/profiles/ProfilePage';
export default function Profiles() {
  return (
    <View style={styles.container}>
      <Header></Header>
      <ProfilePage></ProfilePage>
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
