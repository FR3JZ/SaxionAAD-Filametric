import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FilametricPicker from '../custom/FilametricPicker';

const AppearanceSettings = () => {
  // Local state for theme and language settings
  const [theme, setTheme] = useState<string>('System');
  const [language, setLanguage] = useState<string>('English');

  return (
    <View style={styles.card}>
      {/* Header section with icon and title */}
      <View style={styles.headerRow}>
        <Ionicons name="color-palette-outline" size={24} color="#8A4DFF" style={styles.icon} />
        <Text style={styles.header}>Appearance</Text>
      </View>

      {/* Theme selection dropdown */}
      <FilametricPicker
        label="Theme"
        selectedValue={theme}
        onValueChange={(val) => {
          setTheme(val);
        }}
        options={[
          { label: 'System', value: 'System' },
          { label: 'Light', value: 'Light' },
          { label: 'Dark', value: 'Dark' },
        ]}
      />

      {/* Language selection dropdown */}
      <FilametricPicker
        label="Language"
        selectedValue={language}
        onValueChange={(val) => {
          setLanguage(val);
        }}
        options={[
          { label: 'English', value: 'English' },
          { label: 'Dutch', value: 'Dutch' },
          { label: 'German', value: 'German' },
        ]}
      />
    </View>
  );
};

export default AppearanceSettings;

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
