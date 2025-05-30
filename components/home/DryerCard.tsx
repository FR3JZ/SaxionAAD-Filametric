import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type DryerStatus = "Completed" | "Paused" | "Running";

export interface DryerCardProps {
  name: string;
  status: DryerStatus;
  type: string;
  targetTemp?: number;
  actualTemp?: number;
  progress?: number; // 0 to 100
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
  timeRemaining = "0h 0m",
  totalTime = "8h 0m",
  humidity = "10%",
  electricity = "0.39 kWh",
  currentProfile,
}) => {
  const statusIconName = status === "Completed" ? "moon" : "flame";
  const statusIconColor = status === "Completed" ? "#723BFF" : "#FF5500";

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.topRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{name}</Text>
            <View
              style={[
                styles.statusTag,
                {
                  backgroundColor:
                    status === "Completed"
                      ? '#24d69f'
                      : status === "Paused"
                      ? '#FFD966'
                      : '#FFA726',
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                ]}
              >
                {status.toUpperCase()}
              </Text>
            </View>
          </View>
          <Ionicons name="create-outline" size={24} style={styles.iconEdit} />
        </View>

        <Text style={styles.subtitle}>Last connected: just now</Text>

        {/* Temp & Time */}
        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Ionicons name="thermometer" size={24} style={styles.iconThermometer} />
            <View>
              <Text style={styles.infoText}>{actualTemp}°C</Text>
              <Text style={styles.subInfoText}>/ {targetTemp}°C</Text>
            </View>
          </View>
          <View style={styles.infoBlock}>
            <Ionicons name="time-outline" size={24} style={styles.iconClock} />
            <View>
              <Text style={styles.infoText}>{timeRemaining}</Text>
              <Text style={styles.subInfoText}>/ {totalTime}</Text>
            </View>
          </View>
        </View>

        {/* Humidity & Electricity */}
        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Ionicons name="water" size={24} style={styles.iconWater} />
            <Text style={styles.infoText}>{humidity}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Ionicons name="flash-outline" size={24} style={styles.iconFlash} />
            <Text style={styles.infoText}>{electricity}</Text>
          </View>
        </View>

        {/* Profile row with separate status icon */}
        <View style={styles.profileRow}>
          <View style={styles.profileContainer}>
            <Ionicons name="folder" size={20} style={styles.iconFolder} />
            <Text style={styles.profileText}>{currentProfile}</Text>
          </View>
          <View style={styles.iconBubble}>
            <Ionicons name={statusIconName} size={24} style={{ color: statusIconColor }} />
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressWrapper}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
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
  titleBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Satoshi-Medium',
    marginRight: 10,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 13,
    fontFamily: 'Satoshi-Bold',
    color: 'white'
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
  infoBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 4,
  },
  infoText: {
    fontSize: 18,
    fontFamily: 'Satoshi-Medium',
    lineHeight: 22,
  },
  subInfoText: {
    fontSize: 13,
    fontFamily: 'Satoshi-Regular',
    color: '#666',
    lineHeight: 18,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F1F3F6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  profileText: {
    fontSize: 16,
    fontFamily: 'Satoshi-Medium',
    color: '#5D5D5D',
    flex: 1,
    marginLeft: 10,
    textAlign: 'left',
  },
  iconBubble: {
    backgroundColor: '#F1F3F6',
    borderRadius: 12,
    padding: 12,
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressWrapper: {
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
  iconThermometer: {
    marginRight: 8,
    marginTop: 2,
    color: '#FF3B30',
  },
  iconClock: {
    marginRight: 8,
    marginTop: 2,
    color: '#00C03B',
  },
  iconWater: {
    marginRight: 8,
    marginTop: 2,
    color: '#0086D4',
  },
  iconFlash: {
    marginRight: 8,
    marginTop: 2,
    color: '#FF5500',
  },
  iconFolder: {
    color: '#5D5D5D',
  },
  iconEdit: {
    color: '#5D5D5D',
  },
});


export default DryerCard;
