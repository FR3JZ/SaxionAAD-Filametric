import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FilametricPicker from '../custom/FilametricPicker';

const UnitsFormatSettings = () => {
  // State for selected temperature unit and time format
  const [tempUnit, setTempUnit] = useState<string>('Celsius');
  const [timeFormat, setTimeFormat] = useState<string>('24-hour');

  return (
    <View style={styles.card}>
      {/* Section header with icon */}
      <View style={styles.headerRow}>
        <Ionicons name="thermometer" size={24} color="red" style={styles.icon} />
        <Text style={styles.header}>Units & Format</Text>
      </View>

      {/* Temperature unit selection */}
      <FilametricPicker
        label="Temperature unit"
        selectedValue={tempUnit}
        onValueChange={(val) => {
          setTempUnit(val);
        }}
        options={[
          { label: 'Celsius °C', value: 'Celsius' },
          { label: 'Fahrenheit °F', value: 'Fahrenheit' },
        ]}
      />

      {/* Time format selection */}
      <FilametricPicker
        label="Time format"
        selectedValue={timeFormat}
        onValueChange={(val) => {
          setTimeFormat(val);
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
