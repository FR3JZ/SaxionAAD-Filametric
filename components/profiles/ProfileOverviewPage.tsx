import React, {useState} from 'react';
import { View, Text, StyleSheet, Pressable } from "react-native";
import ProfilesList from './ProfilesList';

const ProfileOverviewPage = () => {
    const [activeTab, setActiveTab] = useState<"preset" | "custom">("preset");
    return (
        <View>
            <Text style={styles.titleText}>Profiles</Text>
            <View style={styles.tabContainer}>
                <Pressable style={[styles.tab, activeTab == "preset" && styles.activeTab]} onPress={() => setActiveTab("preset")}>
                    <Text style={[styles.tabText, activeTab == "preset" && styles.activeTabText]}>Preset profiles</Text>
                </Pressable>
    
                <Pressable style={[styles.tab, activeTab == "custom" && styles.activeTab]} onPress={() => setActiveTab("custom")}>
                    <Text style={[styles.tabText, activeTab == "custom" && styles.activeTabText]}>Custom profiles</Text>
                </Pressable>
            </View>

            <View>
                {activeTab == "preset" ? (
                    <ProfilesList type="Preset"></ProfilesList>
                ) : (
                    <ProfilesList type="Custom"></ProfilesList>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
      fontFamily: 'Satoshi-Variable',
      fontWeight: 'thin',
      fontSize: 24,
    },

    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 2
    }, 
  
    tab:  {
      borderWidth: 1,
      borderColor: '#000',
      width: 175,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    activeTab: {
      backgroundColor: '#000',
    },
  
    tabText: {
      color: '#000',
      fontSize: 18
    },
  
    activeTabText: {
      color: '#fff'
    }
  });

export default ProfileOverviewPage;