import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import NotificationSettings from './NotificationSettings';
import UnitsFormatSettings from './UnitsFormatSettings';
import AppearanceSettings from './AppearanceSettings';
import PrivacyDataSettings from './PrivacyDataSettings';
import AboutSection from './AboutSection';

const SettingsPage = () => {
  return (
    <View style={styles.page}>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <NotificationSettings />
        <UnitsFormatSettings />
        <AppearanceSettings />
        <PrivacyDataSettings />
        <AboutSection />
      </ScrollView>
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  headerWrapper: {
    paddingTop: 35,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Satoshi-Bold',
    color: '#000',
  },
  scroll: {
    flex: 1,
  },
  content: {
    marginTop: 1,
    paddingHorizontal: 16,
  },
});
