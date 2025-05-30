import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type DryerStatus = 'Completed' | 'Paused' | 'Running';

interface DryerActionControlsProps {
  status: DryerStatus;
  onStart?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  onAddHour?: () => void;
  onTempDown?: () => void;
  onTempUp?: () => void;
}

const DryerActionControls: React.FC<DryerActionControlsProps> = ({
  status,
  onStart,
  onPause,
  onResume,
  onStop,
  onAddHour,
  onTempDown,
  onTempUp,
}) => {
  return (
    <View style={styles.container}>
      {/* Utility buttons */}
      <TouchableOpacity style={styles.secondaryButton} onPress={onAddHour}>
        <Text style={styles.secondaryText}>+1h</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={onTempDown}>
        <Text style={styles.secondaryText}>-5°C</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={onTempUp}>
        <Text style={styles.secondaryText}>+5°C</Text>
      </TouchableOpacity>

      {/* Action buttons */}
      {status === 'Completed' && (
        <TouchableOpacity style={styles.primaryButtonGreen} onPress={onStart}>
          <Text style={styles.primaryText}>Start</Text>
        </TouchableOpacity>
      )}

      {status === 'Paused' && (
        <>
          <TouchableOpacity style={styles.primaryButtonDark} onPress={onResume}>
            <Ionicons name="play" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButtonRed} onPress={onStop}>
            <Ionicons name="stop" size={20} color="#fff" />
          </TouchableOpacity>
        </>
      )}

      {status === 'Running' && (
        <>
          <TouchableOpacity style={styles.primaryButtonDark} onPress={onPause}>
            <Ionicons name="pause" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButtonRed} onPress={onStop}>
            <Ionicons name="stop" size={20} color="#fff" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    marginTop: 12,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#F1F3F6',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  secondaryText: {
    fontSize: 14,
    fontFamily: 'Satoshi-Medium',
    color: '#444',
  },
  primaryButtonGreen: {
    backgroundColor: '#00C566',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  primaryButtonDark: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 10,
    marginLeft: 6,
  },
  primaryButtonRed: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 10,
    marginLeft: 6,
  },
  primaryText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Satoshi-Bold',
  },
});

export default DryerActionControls;
