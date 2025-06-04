import React, {useState} from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import ProfilesList from './ProfilesList';
import { Ionicons } from '@expo/vector-icons';

const ProfileOverviewPage = () => {
    const [activeTab, setActiveTab] = useState<"Preset" | "Custom">("Preset");
    return (
        <View>
            <View style={styles.tabContainer}>
              <TouchableOpacity><Ionicons name="star-outline" size={25} color={'#000'}/><Text>Preset</Text></TouchableOpacity>
              <TouchableOpacity><Ionicons name="person-outline" size={25} color={'#000'}/><Text>Custom</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
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