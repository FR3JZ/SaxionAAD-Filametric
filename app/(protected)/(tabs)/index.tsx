import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../../components/home/HomepageHeader';
import HomePage from '../../../components/home/HomePage';
export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Header></Header>
      <HomePage></HomePage>
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
