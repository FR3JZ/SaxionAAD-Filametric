import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../../components/home/HomepageHeader';
import HomePage from '../../../components/home/HomePage';
import { useFocusEffect } from 'expo-router';
import DryerService from '@/services/dryerService';
export default function TabOneScreen() {

  const fetchDryers = async() => {
    const devices = await DryerService.getDryers();
    console.log(devices.devices[0]);
  }

  useFocusEffect(
    useCallback(() => {
      fetchDryers();
      
    }, [])
  );

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
