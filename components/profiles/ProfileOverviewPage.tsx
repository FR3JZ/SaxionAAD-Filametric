import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ProfilesList from './ProfilesList';
import ProfileService from '@/services/profileService';
import { getSavedProfile } from '@/stores/profileStore';
import { useFocusEffect } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

type ProfileOverviewPageProps = {
  selection: boolean;
  dryerId?: string;
};

const ProfileOverviewPage = ({ selection, dryerId }: ProfileOverviewPageProps) => {
  const [selected, setSelected] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<"Preset" | "Custom">("Preset");
  const [profiles, setProfiles] = useState<any[]>([]);

  // Fetch all available profiles from backend
  const fetchProfiles = async () => {
    const json:any = await ProfileService.getProfiles();
    setProfiles(json['profiles']);
  };

  // Load the currently selected profile for this dryer, if available
  const setSelectedProfile = async () => {
    if (dryerId) {
      const activeProfile:any = await getSavedProfile(dryerId);
      if (activeProfile !== null) {
        setSelected(activeProfile);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfiles();
      setSelectedProfile();
    }, [])
  );

  const translateX = useRef(new Animated.Value(0)).current;

  // Animate tab switch with horizontal slide effect
  const handleTabSwitch = (newTab: "Preset" | "Custom") => {
    if (newTab === activeTab) return;

    const direction = newTab === "Preset" ? -1 : 1;

    translateX.setValue(direction * screenWidth);
    setActiveTab(newTab);

    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView>
      {/* Tab Bar */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => handleTabSwitch("Preset")}
          style={[styles.tab, activeTab === "Preset" && styles.activeTab]}
        >
          <Ionicons
            name="star-outline"
            size={22}
            color={activeTab === "Preset" ? '#000' : '#B0B0B0'}
          />
          <Text style={[styles.tabText, activeTab === "Preset" && styles.activeTabText]}>
            Preset ({profiles.filter(profile => profile.customizable === false).length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabSwitch("Custom")}
          style={[styles.tab, activeTab === "Custom" && styles.activeTab]}
        >
          <Ionicons
            name="person-outline"
            size={22}
            color={activeTab === "Custom" ? '#000' : '#B0B0B0'}
          />
          <Text style={[styles.tabText, activeTab === "Custom" && styles.activeTabText]}>
            Custom ({profiles.filter(profile => profile.customizable === true).length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Animated Tab Content */}
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        {activeTab === "Preset" ? (
          <ProfilesList
            profiles={profiles.filter(profile => profile.customizable === false)}
            {...(selection ? { selected, setSelected, dryerId } : {})}
          />
        ) : (
          <ProfilesList
            profiles={profiles.filter(profile => profile.customizable === true)}
            {...(selection ? { selected, setSelected, dryerId } : {})}
          />
        )}
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    height: 80,
  },
  tab: {
    width: '43%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    color: '#B0B0B0',
    fontSize: 18,
  },
  activeTabText: {
    color: '#000',
  },
});

export default ProfileOverviewPage;
