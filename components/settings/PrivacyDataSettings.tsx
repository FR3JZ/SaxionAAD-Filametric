import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LabeledSwitchRow from '../custom/LabeledSwitchRow';

const PrivacyDataSettings = () => {
  // Local state for toggles
  const [analytics, setAnalytics] = useState(false);
  const [crashReports, setCrashReports] = useState(false);

  return (
    <View style={styles.card}>
      {/* Header with icon and section title */}
      <View style={styles.headerRow}>
        <Ionicons name="shield-outline" size={24} color="#007AFF" style={styles.icon} />
        <Text style={styles.header}>Privacy & Data</Text>
      </View>

      {/* Toggle for anonymous usage analytics */}
      <LabeledSwitchRow
        title="Anonymous data collection"
        description="Help us improve the app with usage analytics"
        value={analytics}
        onChange={(val) => {
          setAnalytics(val);
        }}
      />

      {/* Toggle for automatic crash reporting */}
      <LabeledSwitchRow
        title="Crash reports"
        description="Automatically send crash reports"
        value={crashReports}
        onChange={(val) => {
          setCrashReports(val);
        }}
      />
    </View>
  );
};

export default PrivacyDataSettings;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
  },
  header: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 19,
    color: '#000',
  },
});
