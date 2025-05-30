import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DryerHeader from '../dryercard/DryerHeader';
import DryerInfoBlock from '../dryercard/DryerInfoBlock';
import DryerProfileRow from '../dryercard/DryerProfileRow';
import DryerProgressBar from '../dryercard/DryerProgressBar';
import DryerMachineView from '../dryercard/DryerMachineView';
import DryerActionControls from '../dryercard/DryerActionControls';

export type DryerStatus = 'Completed' | 'Paused' | 'Running';
export type DryerMachineType = 'Solo' | 'Duo';

export interface DryerCardProps {
  name: string;
  status: DryerStatus;
  type: DryerMachineType;
  targetTemp?: number;
  actualTemp?: number;
  progress?: number;
  timeRemaining?: string;
  totalTime?: string;
  humidity?: string;
  electricity?: string;
  currentProfile: string;
}

const DryerCard: React.FC<DryerCardProps> = ({
  name,
  status,
  type,
  targetTemp = 80,
  actualTemp = 23,
  progress = 100,
  timeRemaining = '0h 0m',
  totalTime = '8h 0m',
  humidity = '10%',
  electricity = '0.39 kWh',
  currentProfile,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* Header and Toggle Icon */}
        <View style={styles.topRow}>
          <DryerHeader name={name} status={status} />
          <TouchableOpacity onPress={() => setShowDetails(prev => !prev)}>
            <Ionicons
              name={showDetails ? 'return-up-back-outline' : 'create-outline'}
              size={24}
              style={styles.iconToggle}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Last connected: just now</Text>

        {/* Temperature and Time */}
        <View style={styles.infoRow}>
          <DryerInfoBlock
            iconName="thermometer"
            value={`${actualTemp}°C`}
            subValue={`/ ${targetTemp}°C`}
            iconColor="#FF3B30"
          />
          <DryerInfoBlock
            iconName="time-outline"
            value={timeRemaining}
            subValue={`/ ${totalTime}`}
            iconColor="#00C03B"
          />
        </View>

        {/* Humidity and Electricity */}
        <View style={styles.infoRow}>
          <DryerInfoBlock
            iconName="water"
            value={humidity}
            iconColor="#0086D4"
          />
          <DryerInfoBlock
            iconName="flash-outline"
            value={electricity}
            iconColor="#FF5500"
          />
        </View>

        {/* Conditionally expanded detail */}
        {showDetails && (
          <>
            <DryerMachineView
              type={type}
              onLeftAction={() => console.log('Settings pressed')}
              onRightAction={() => console.log('Options pressed')}
            />
          </>
        )}
        <DryerProfileRow currentProfile={currentProfile} status={status} />
        <DryerProgressBar progress={progress} />

        {showDetails && (
          <DryerActionControls
            status={status}
            onStart={() => console.log('Start')}
            onResume={() => console.log('Resume')}
            onPause={() => console.log('Pause')}
            onStop={() => console.log('Stop')}
            onAddHour={() => console.log('+1h')}
            onTempDown={() => console.log('-5°C')}
            onTempUp={() => console.log('+5°C')}
          />
        )}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 6,
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 24,
    width: '100%',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Satoshi-Light',
    color: '#888888',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconToggle: {
    color: '#5D5D5D',
  },
});

export default DryerCard;
