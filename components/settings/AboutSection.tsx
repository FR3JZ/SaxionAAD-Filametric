import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutSection = () => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Ionicons name="information-circle-outline" size={24} color="#5D5D5D" style={styles.icon} />
        <Text style={styles.header}>About</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>App version</Text>
        <Text style={styles.value}>1.0.3</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Build:</Text>
        <Text style={styles.value}>2025.6.4</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Last updated:</Text>
        <Text style={styles.value}>June 4, 2025</Text>
      </View>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.button} onPress={() => console.log('Privacy Policy')}>
        <Text style={styles.buttonText}>Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => console.log('Terms')}>
        <Text style={styles.buttonText}>Term of Service</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => console.log('Support')}>
        <Text style={styles.buttonText}>Contact Support</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutSection;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Satoshi-Regular',
    color: '#5D5D5D',
  },
  value: {
    fontSize: 14,
    fontFamily: 'Satoshi-Medium',
    color: '#000',
  },
  divider: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginVertical: 16,
  },
  button: {
    borderWidth: 1,
    borderColor: '#D1D1D1',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Satoshi-Medium',
    color: '#000',
  },
});
