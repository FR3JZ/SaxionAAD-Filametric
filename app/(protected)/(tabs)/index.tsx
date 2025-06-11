import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Auth } from 'aws-amplify'; // Make sure this is installed and configured
import Header from '../../../components/home/HomepageHeader';
import HomePage from '../../../components/home/HomePage';

export default function TabOneScreen() {

  useEffect(() => {
    const fetchSessionToken = async () => {
      try {
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();
        console.log('JWT Token:', token);
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
    backgroundColor: "white"
  },
});
