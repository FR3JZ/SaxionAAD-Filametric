import React, {useState} from 'react';
import { View, Text, StyleSheet, Pressable } from "react-native";
import ProfilesList from './ProfilesList';
import { Ionicons } from '@expo/vector-icons';

const ProfileOverviewPage = () => {
  const [activeTab, setActiveTab] = useState<"preset" | "custom">("preset");
  
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.titleText}>Profiles</Text>
      
      <View style={styles.tabContainer}>
        <Pressable 
          style={[styles.tab, activeTab === "preset" && styles.activeTab]} 
          onPress={() => setActiveTab("preset")}
        >
          <Ionicons name='star-outline' size={24} style={{ color: 'black' }} />
          <Text style={[styles.tabText, activeTab === "preset" && styles.activeTabText]}>
            Preset
          </Text>
        </Pressable>
        
        <Pressable 
          style={[styles.tab, activeTab === "custom" && styles.activeTab]} 
          onPress={() => setActiveTab("custom")}
        >
          <Text style={styles.userIcon}>👤</Text>
          <Text style={[styles.tabText, activeTab === "custom" && styles.activeTabText]}>
            Custom
          </Text>
        </Pressable>
      </View>
      
      <View>
        {activeTab === "preset" ? (
          <ProfilesList type="Preset" />
        ) : (
          <ProfilesList type="Custom" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: 19,
    marginLeft: 10,
    width: '95%'
  },
  titleText: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 23,
  },
  tabContainer: {
    marginTop: 12,
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    padding: 4,
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8E8E93',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  starIcon: {
    fontSize: 18,
    color: '#8E8E93',
  },
  userIcon: {
    fontSize: 18,
    color: '#8E8E93',
  }
});

export default ProfileOverviewPage;