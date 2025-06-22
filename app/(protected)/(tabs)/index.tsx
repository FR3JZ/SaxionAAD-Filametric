import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Auth } from 'aws-amplify'; // Make sure this is installed and configured
import Header from '../../../components/home/HomepageHeader';
import HomePage from '../../../components/home/HomePage';
import { useFocusEffect } from 'expo-router';
import DryerService from '@/services/dryerService';
export default function TabOneScreen() {

  const fetchDryers = async() => {
    const devices = await DryerService.getDryers();
  }

  useFocusEffect(
    useCallback(() => {
      fetchDryers();
    }, [])
  );


  useEffect(() => {
    const fetchSessionToken = async () => {
      try {
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();
      } catch (error) {
        console.error('Error fetching session token:', error);
      }
    };

    fetchSessionToken();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <HomePage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F9F9F9"
  },
});
