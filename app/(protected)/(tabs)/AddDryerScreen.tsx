import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../../../components/Header';
import DryerAddPage from '../../..//components/dryer-add/DryerAddPage';
export default function AddDryerScreen() {
  return (
    <View style={styles.container}>
      <Header></Header>
      <DryerAddPage></DryerAddPage>
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
