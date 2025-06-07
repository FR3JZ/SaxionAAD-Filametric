import Statistics from '@/components/stats/statistics';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <Statistics />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F9FAFB',
  },
});
