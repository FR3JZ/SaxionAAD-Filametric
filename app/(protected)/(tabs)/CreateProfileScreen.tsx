import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../../components/home/HomepageHeader';
import AddProfilePage from '../../../components/profile-add/AddProfilePage';
export default function AddDryerScreen() {
  return (
    <View style={styles.container}>
      <Header></Header>
      <AddProfilePage></AddProfilePage>
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
