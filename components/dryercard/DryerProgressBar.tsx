import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  progress: number;
}

const DryerProgressBar: React.FC<Props> = ({ progress }) => (
  <View style={styles.wrapper}>
    <View style={styles.progressBar}>
      <View style={[styles.progressFill, { width: `${progress}%` }]} />
    </View>
    <Text style={styles.progressText}>{progress}%</Text>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 12,
    backgroundColor: '#F1F3F6',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5D5D5D',
  },
  progressText: {
    fontSize: 13,
    fontFamily: 'Satoshi-Regular',
    color: '#5D5D5D',
    marginLeft: 12,
  },
});

export default DryerProgressBar;
