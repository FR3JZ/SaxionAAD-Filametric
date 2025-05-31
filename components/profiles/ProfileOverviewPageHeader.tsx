import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const ProfileOverviewPageHeader = ({numberOfProfiles} : {numberOfProfiles: number}) => {
  const [activeTab, setActiveTab] = useState<"Preset" | "Custom">("Preset");

  return (
    <View style={styles.shadowWrapper}>
        <View style={styles.headerContainer}>
        <Text style={styles.titleText}>Profiles</Text>

        <View style={styles.tabContainer}>
            <Pressable 
            style={[styles.tab, activeTab === "Preset" && styles.activeTab]} 
            onPress={() => setActiveTab("Preset")}
            >
            <Ionicons 
                name="star-outline" 
                size={20} 
                color={activeTab === "Preset" ? '#000' : '#8E8E93'} 
            />
            <Text style={[styles.tabText, activeTab === "Preset" && styles.activeTabText]}>
                Preset
            </Text>
            </Pressable>

            <Pressable 
            style={[styles.tab, activeTab === "Custom" && styles.activeTab]} 
            onPress={() => setActiveTab("Custom")}
            >
                <Ionicons
                    name='person-outline'
                    size={20}
                    color={activeTab === "Custom" ? '#000' : '#8E8E93'}
                />
            <Text style={[styles.tabText, activeTab === "Custom" && styles.activeTabText]}>
                Custom
            </Text>
            </Pressable>
        </View>
        <View style={styles.statsContainer}>
            <Text style={styles.statsInfoText}>{activeTab} Profiles</Text>
            <Text style={styles.numberOfProfilesText}>{numberOfProfiles} profiles</Text>
        </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    shadowWrapper: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 1,
    },
    headerContainer: {
        paddingTop: 60,
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#D1D1D1',

        
        
    },
    titleText: {
        textAlign: 'center',
        fontFamily: 'Satoshi-Bold',
        fontSize: 23,
    },
    tabContainer: {
        marginTop: 24,
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        padding: 4,
        marginVertical: 10,
        width: '90%',
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 16,
        backgroundColor: 'transparent',
    },
    activeTab: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#8E8E93',
        marginLeft: 6,
    },
    activeTabText: {
        color: '#000',
        fontWeight: '600',
    },
    statsContainer: {
        marginTop: 20,
        marginBottom: 20,
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    statsInfoText: {
        fontFamily: 'Satoshi-Medium',
        fontSize: 20
    },
    numberOfProfilesText: {
        fontSize: 15,
        borderColor: '#B0B0B0',
        borderWidth: 1,
        borderRadius: 20,
        paddingTop: 4,
        paddingBottom: 4,
        paddingHorizontal: 8
    }
});

export default ProfileOverviewPageHeader;
