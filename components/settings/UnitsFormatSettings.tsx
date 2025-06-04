// UnitsFormatSettings.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FilametricPicker from '../custom/FilametricPicker';

const UnitsFormatSettings = () => {
  const [tempUnit, setTempUnit] = useState('Celsius');
  const [timeFormat, setTimeFormat] = useState('24-hour');

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Ionicons name="thermometer" size={24} color="red" style={styles.icon} />
        <Text style={styles.header}>Units & Format</Text>
      </View>

      <FilametricPicker
        label="Temperature unit"
        selectedValue={tempUnit}
        onValueChange={(val) => {
          setTempUnit(val);
          console.log('Temp unit changed to:', val);
        }}
        options={[
          { label: 'Celsius °C', value: 'Celsius' },
          { label: 'Fahrenheit °F', value: 'Fahrenheit' },
        ]}
      />

      <FilametricPicker
        label="Time format"
        selectedValue={timeFormat}
        onValueChange={(val) => {
          setTimeFormat(val);
          console.log('Time format changed to:', val);
        }}
        options={[
          { label: '24-hour', value: '24-hour' },
          { label: '12-hour', value: '12-hour' },
        ]}
      />
    </View>
  );
};

export default UnitsFormatSettings;

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
});
