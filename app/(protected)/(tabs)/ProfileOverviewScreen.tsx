import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../../../components/Header';
import ProfileOverviewPage from '../../../components/profiles/ProfileOverviewPage';
export default function ProfileOverviewScreen() {
  return (
    <View style={styles.container}>
      <Header></Header>
      <ProfileOverviewPage></ProfileOverviewPage>
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
