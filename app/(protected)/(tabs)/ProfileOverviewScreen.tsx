import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ProfileOverviewPageHeader from '@/components/profiles/ProfileOverviewPageHeader';
import ProfileOverviewPage from '../../../components/profiles/ProfileOverviewPage';
export default function ProfileOverviewScreen() {
  return (
    <View style={styles.container}>
      <ProfileOverviewPageHeader numberOfProfiles={10}></ProfileOverviewPageHeader>
      {/* <ProfileOverviewPage></ProfileOverviewPage> */}
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
