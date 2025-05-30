import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  currentProfile: string;
  status: "Completed" | "Paused" | "Running";
}

const DryerProfileRow: React.FC<Props> = ({ currentProfile, status }) => {
  const statusIconName = status === "Completed" ? "moon" : "flame";
  const statusIconColor = status === "Completed" ? "#723BFF" : "#FF5500";

  return (
    <View style={styles.row}>
      <View style={styles.profileContainer}>
        <Ionicons name="folder" size={20} style={styles.iconFolder} />
        <Text style={styles.profileText}>{currentProfile}</Text>
      </View>
      <View style={styles.iconBubble}>
        <Ionicons name={statusIconName} size={24} style={{ color: statusIconColor }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
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
  iconFolder: {
    color: '#5D5D5D',
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
});

export default DryerProfileRow;
