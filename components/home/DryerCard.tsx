import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DryerHeader from '../dryercard/DryerHeader';
import DryerInfoBlock from '../dryercard/DryerInfoBlock';
import DryerProfileRow from '../dryercard/DryerProfileRow';
import DryerProgressBar from '../dryercard/DryerProgressBar';
import DryerMachineView from '../dryercard/DryerMachineView';
import DryerActionControls from '../dryercard/DryerActionControls';
import ManualAdjustmentsPanel from '../dryercard/ManualAdjustmentsPanel';
import { getSavedProfile } from '@/stores/profileStore';
import { getSavedMode } from '@/stores/modeStore';
import { router, useFocusEffect } from 'expo-router';
import DryerService from '@/services/dryerService';

export type DryerStatus = 'Completed' | 'Paused' | 'Running';
export type DryerMachineType = 'Solo' | 'Duo';

export interface DryerCardProps {
  name: string;
  status: DryerStatus;
  type: DryerMachineType;
  targetTemp?: number;
  actualTemp?: number;
  timeRemaining?: number; // in minutes
  totalTime?: number; // in minutes
  humidity?: string;
  electricity?: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onCollapseComplete?: () => void;
}

// The main component representing a single dryer card with dynamic UI,
// machine controls, real-time updates and profile/mode state.

const DryerCard: React.FC<DryerCardProps> = ({
  name,
  status,
  type,
  targetTemp = 80,
  actualTemp = 23,
  timeRemaining = 0,
  totalTime = 0,
  humidity = '0%',
  electricity = '0',
  isExpanded,
  onToggleExpand,
  onCollapseComplete,
}) => {
  const [showAdjustments, setShowAdjustments] = useState<boolean>(false);
  const [adjustedTemp, setAdjustedTemp] = useState<number | null>(null);
  const [adjustedTime, setAdjustedTime] = useState<number | null>(null);

  const [machineViewHeight, setMachineViewHeight] = useState<number>(0);
  const [profile, setProfile] = useState<any>({});
  const [mode, setMode] = useState<string>("normal");

  const animatedHeight = useRef<Animated.Value>(new Animated.Value(0)).current;

  // Load profile & mode on screen focus
  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        const storedProfile:any = await getSavedProfile(name);
        if(storedProfile) {
          setProfile(storedProfile);
        }
      };
      const fetchMode = async () => {
        const storedMode:string | null = await getSavedMode(name, profile.id);
        setMode(storedMode ?? 'normal');
      };
      fetchProfile();
      fetchMode();
    }, [name, profile])
  );

  // Animate expand/collapse of the machine panel
  useEffect(() => {
    if (!isExpanded && machineViewHeight === 0) return;
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? machineViewHeight : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      if (!isExpanded && onCollapseComplete) {
        onCollapseComplete();
      }
    });
  }, [isExpanded, machineViewHeight]);

  // Sync local adjustments when modal is closed
  useEffect(() => {
    if (!showAdjustments) {
      setAdjustedTemp(targetTemp);
      setAdjustedTime(timeRemaining);
    }
  }, [targetTemp, timeRemaining, showAdjustments]);

  const formatMinutesToTime = (minutes: number): string => {
    const h:number = Math.floor(minutes / 60);
    const m:number = Math.floor(minutes % 60);
    return `${h}h ${m}m`;
  };

  const calculateProgress = (): number => {
    if (!totalTime || totalTime <= 0) return 0;
    const used:number = totalTime - timeRemaining;
    const progress:number = (used / totalTime) * 100;
    return Math.min(Math.max(Math.floor(progress), 0), 100);
  };

  // Get the new temperature, limited to min 0, max 90
  const newTemprature = (currentTemp:number, adjustment:number) : number => {
    const newTemp:number = currentTemp + adjustment;
    if(newTemp < 0) {
      return 0;
    }
    if(newTemp > 90) {
      return 90;
    }
    return newTemp;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* Header + Expand/Collapse Toggle */}
        <View style={styles.topRow}>
          <DryerHeader name={name} status={status} />
          <TouchableOpacity onPress={onToggleExpand}>
            <Ionicons
              name={isExpanded ? 'return-up-back-outline' : 'create-outline'}
              size={24}
              style={styles.iconToggle}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Last connected: just now</Text>

        {/* Temperature + Time Blocks */}
        <View style={styles.infoRow}>
          <DryerInfoBlock
            iconName="thermometer"
            value={`${actualTemp}°C`}
            subValue={`/ ${targetTemp}°C`}
            iconColor="#FF3B30"
          />
          <DryerInfoBlock
            iconName="time-outline"
            value={formatMinutesToTime(timeRemaining)}
            subValue={`/ ${formatMinutesToTime(totalTime)}`}
            iconColor="#00C03B"
          />
        </View>

        {/* Humidity + Energy */}
        <View style={styles.infoRow}>
          <DryerInfoBlock iconName="water" value={humidity} iconColor="#0086D4" />
          <DryerInfoBlock iconName="flash-outline" value={electricity} iconColor="#FF5500" />
        </View>

        {/* Expandable Machine View (animated height) */}
        <Animated.View style={{ overflow: 'hidden', height: animatedHeight }}>
          <DryerMachineView
            type={type}
            onRightAction={() => setShowAdjustments(true)}
            onLeftAction={() =>
              router.push({
                pathname: "/(protected)/(tabs)/DryerSettingsScreen",
                params: { name },
              })
            }
          />
        </Animated.View>

        {/* Hidden ref component for dynamic height measuring */}
        <View
          style={styles.hidden}
          onLayout={(e) => {
            if (machineViewHeight === 0) {
              setMachineViewHeight(e.nativeEvent.layout.height);
            }
          }}
        >
          <DryerMachineView type={type} onRightAction={() => { }} onLeftAction={() => { }} />
        </View>

        <DryerProfileRow
          dryerId={name}
          currentProfile={profile}
          currentMode={mode}
          status={status}
          isExpanded={isExpanded}
        />

        <DryerProgressBar progress={calculateProgress()} />

        {/* Controls only when expanded */}
        {isExpanded && (
          <DryerActionControls
            status={status}
            onStart={() => DryerService.startDryer(name, profile.id, mode)}
            onResume={() => DryerService.startDryer(name, profile.id, mode)}
            onPause={() => DryerService.pauseDryer(name)}
            onStop={() => DryerService.stopDryer(name)}
            onAddHour={() =>
              DryerService.changeDryerWhileRunning(name, timeRemaining + 60, Number(targetTemp))
            }
            onTempDown={() =>
              DryerService.changeDryerWhileRunning(name, timeRemaining, newTemprature(Number(targetTemp), -5))
            }
            onTempUp={() =>
              DryerService.changeDryerWhileRunning(name, timeRemaining, newTemprature(Number(targetTemp), 5))
            }
          />
        )}

        {/* Modal: Manual Temp/Time Adjustment */}
        {showAdjustments && (
          <ManualAdjustmentsPanel
            targetTemp={adjustedTemp ?? targetTemp}
            timeRemaining={adjustedTime ?? timeRemaining}
            onTempChange={setAdjustedTemp}
            onTimeChange={setAdjustedTime}
            onDismiss={() => {
              setShowAdjustments(false);

              const tempChanged:boolean = adjustedTemp !== null && adjustedTemp !== targetTemp;
              const timeChanged:boolean = adjustedTime !== null && adjustedTime !== timeRemaining;

              if (tempChanged || timeChanged) {
                DryerService.changeDryerWhileRunning(name, adjustedTime!, adjustedTemp!);
              }
            }}
          />
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  wrapper: {
    marginTop: 3,
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
  hidden: {
    position: 'absolute',
    opacity: 0,
    top: -9999,
    left: -9999,
  },
});

export default DryerCard;
