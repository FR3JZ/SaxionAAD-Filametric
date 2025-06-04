// NotificationSettings.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LabeledSwitchRow from '../custom/LabeledSwitchRow';

const NotificationSettings = () => {
  const [system, setSystem] = useState(false);
  const [drying, setDrying] = useState(false);
  const [silica, setSilica] = useState(false);
  const [email, setEmail] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Ionicons name="notifications-outline" size={24} color="#F6B900" style={styles.icon} />
        <Text style={styles.header}>Notifications</Text>
      </View>

      <LabeledSwitchRow
        title="System notifications"
        description="Receive alerts for device status and errors from all connected dryers"
        value={system}
        onChange={(val) => {
          setSystem(val);
          console.log('System notifications:', val);
        }}
      />

      <LabeledSwitchRow
        title="Drying complete notifications"
        description="Get notified when any dryer completes its drying cycle or switches to storage mode"
        value={drying}
        onChange={(val) => {
          setDrying(val);
          console.log('Drying complete notifications:', val);
        }}
      />

      <LabeledSwitchRow
        title="Silica replacement reminders"
        description="Receive alerts when silica beads need replacement in any dryer"
        value={silica}
        onChange={(val) => {
          setSilica(val);
          console.log('Silica replacement reminders:', val);
        }}
      />

      <View style={styles.divider} />

      <LabeledSwitchRow
        title="Email notifications"
        description="Receive updates via email for all dryers"
        value={email}
        onChange={(val) => {
          setEmail(val);
          console.log('Email notifications:', val);
        }}
      />
    </View>
  );
};

export default NotificationSettings;

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
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginVertical: 12,
  },
});
