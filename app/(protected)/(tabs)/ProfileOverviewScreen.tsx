import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ProfileOverviewPage from '../../../components/profiles/ProfileOverviewPage';
import ProfilePageHeader from '@/components/profiles/ProfilePageHeader';
export default function ProfileOverviewScreen() {
  return (
    <View style={styles.container}>
      <ProfilePageHeader backArrow={false} title="Profiles"></ProfilePageHeader>
      <ProfileOverviewPage></ProfileOverviewPage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F9F9F9",
  },
});
