import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';

interface Props {
  dryerId: string,
  currentProfile: any;
  currentMode: string;
  status: "Completed" | "Paused" | "Running";
}

const DryerProfileRow: React.FC<Props> = ({ dryerId, currentProfile, currentMode, status }) => {
  const routeToSelectProfile = () => {
    if(status === "Completed") {
      router.push({
        pathname: '/(protected)/(profiles)/SelectProfileScreen',
        params: { dryerId: dryerId}
      });
    }
  }

  const routeToSelectModus = () => {
    if(status === "Completed") {
      router.push({
        pathname: '/(protected)/(profiles)/SelectProfileModeScreen',
        params: { dryerId: dryerId, profileId: currentProfile.id}
      })
    }
  }

  const statusIconName = status === "Completed" ? "moon" : "flame";
  const statusIconColor = status === "Completed" ? "#723BFF" : "#FF5500";

  const modeIcons = {
    normal: require('../../assets/images/normal_mode_icon.png'),
    silent: require('../../assets/images/silent_mode_icon.png'),
    storage: require('../../assets/images/storage_mode_icon.png')
  }

  const icon = (modeIcons as any)[currentMode];

  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.profileContainer} onPress={routeToSelectProfile}>
        <Ionicons name="folder" size={20} style={styles.iconFolder} />
        <Text style={styles.profileText}>{currentProfile.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconBubble} onPress={routeToSelectModus}>
        <Image source={icon} style={styles.modeIcon} resizeMode="contain" />
      </TouchableOpacity>
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

  modeIcon: {
    width: 30,
    height: 30
  }
});

export default DryerProfileRow;
