import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ProfilesList from './ProfilesList';
import ProfileService from '@/services/profileService';

const screenWidth = Dimensions.get('window').width;

const ProfileOverviewPage = () => {
  const [activeTab, setActiveTab] = useState<"Preset" | "Custom">("Preset");
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
        const json = await ProfileService.getProfiles();
        setProfiles(json['profiles']);
    };

    fetchProfiles();
}, []);
  
  const translateX = useRef(new Animated.Value(0)).current;
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
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => handleTabSwitch("Preset")}
          style={[styles.tab, activeTab === "Preset" && styles.activeTab]}
        >
          <Ionicons name="star-outline" size={22} color={activeTab === "Preset" ? '#000' : '#B0B0B0'} />
          <Text style={[styles.tabText, activeTab === "Preset" && styles.activeTabText]}>Preset ({profiles.filter(profile => profile.customizable === false).length})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabSwitch("Custom")}
          style={[styles.tab, activeTab === "Custom" && styles.activeTab]}
        >
          <Ionicons name="person-outline" size={22} color={activeTab === "Custom" ? '#000' : '#B0B0B0'} />
          <Text style={[styles.tabText, activeTab === "Custom" && styles.activeTabText]}>Custom ({profiles.filter(profile => profile.customizable === true).length})</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        {activeTab === "Preset" ? (
          <ProfilesList profiles={profiles.filter(profile => profile.customizable === false)} />
        ) : (
          <ProfilesList profiles={profiles.filter(profile => profile.customizable === true)} />
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
    height: 80
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
