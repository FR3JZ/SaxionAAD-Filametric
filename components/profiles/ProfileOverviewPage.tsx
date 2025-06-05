import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ProfilesList from './ProfilesList';

const screenWidth = Dimensions.get('window').width;

const ProfileOverviewPage = () => {
  const [activeTab, setActiveTab] = useState<"Preset" | "Custom">("Preset");

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

  const renderTabContent = () => {
    if (activeTab === "Preset") {
      return <ProfilesList type='Preset' />;
    } else {
      return <ProfilesList type='Custom' />;
    }
  };

  return (
    <ScrollView>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => handleTabSwitch("Preset")}
          style={[styles.tab, activeTab === "Preset" && styles.activeTab]}
        >
          <Ionicons name="star-outline" size={22} color={activeTab === "Preset" ? '#000' : '#B0B0B0'} />
          <Text style={[styles.tabText, activeTab === "Preset" && styles.activeTabText]}>Preset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabSwitch("Custom")}
          style={[styles.tab, activeTab === "Custom" && styles.activeTab]}
        >
          <Ionicons name="person-outline" size={22} color={activeTab === "Custom" ? '#000' : '#B0B0B0'} />
          <Text style={[styles.tabText, activeTab === "Custom" && styles.activeTabText]}>Custom</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        {activeTab === "Preset" ? (
          <ProfilesList type="Preset" />
        ) : (
          <ProfilesList type="Custom" />
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
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '90%'
  },

  tab: {
    width: '48%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 8,
  },

  activeTab: {
    backgroundColor: '#F9F9F9',
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
