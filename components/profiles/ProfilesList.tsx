import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { DryingProfile } from '@/constants/Objects';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Testdata
const testProfiles: DryingProfile[] = [
    {
        ID: "3e26c1d7-fd62-4031-ab47-a28a9f610fc1",
        Name: "Profile A",
        Target_temperature: 60,
        Target_duration: 120,
        Mode: "Auto",
        Storage_temperature: 25,
        Customizable: true,
        User_Id: "43b22480-2922-4c34-9aa7-db780062014e"
    },
    {
        ID: "26ac2711-bcf4-4d01-b2dd-652165c8ca50",
        Name: "Profile B",
        Target_temperature: 90,
        Target_duration: 240,
        Mode: "Auto",
        Storage_temperature: 25,
        Customizable: false,
        User_Id: "43b22480-2922-4c34-9aa7-db780062014e"
    },
    {
        ID: "26ac2711-bcf4-4d01-b2dd-652165c8ca5",
        Name: "Profile B",
        Target_temperature: 90,
        Target_duration: 240,
        Mode: "Auto",
        Storage_temperature: 25,
        Customizable: false,
        User_Id: "43b22480-2922-4c34-9aa7-db780062014e"
    },
    {
        ID: "26ac2711-bcf4-4d01-b2dd-652165c8ca51",
        Name: "Profile B",
        Target_temperature: 90,
        Target_duration: 240,
        Mode: "Auto",
        Storage_temperature: 25,
        Customizable: false,
        User_Id: "43b22480-2922-4c34-9aa7-db780062014e"
    },
    {
        ID: "26ac2711-bcf4-4d01-b2dd-652165cca51",
        Name: "Profile B",
        Target_temperature: 90,
        Target_duration: 240,
        Mode: "Auto",
        Storage_temperature: 25,
        Customizable: false,
        User_Id: "43b22480-2922-4c34-9aa7-db780062014e"
    },
    {
        ID: "26ac2711-bcf4-4d01-b2dd-652165c8ca1",
        Name: "Profile B",
        Target_temperature: 90,
        Target_duration: 240,
        Mode: "Auto",
        Storage_temperature: 25,
        Customizable: false,
        User_Id: "43b22480-2922-4c34-9aa7-db780062014e"
    },
    {
        ID: "26ac2711-bcf4-4d01-b2d-652165c8ca51",
        Name: "Profile B",
        Target_temperature: 90,
        Target_duration: 240,
        Mode: "Auto",
        Storage_temperature: 25,
        Customizable: false,
        User_Id: "43b22480-2922-4c34-9aa7-db780062014e"
    },
    {
        ID: "26ac2711-bcf4-4d0-b2dd-652165c8ca51",
        Name: "Profile B",
        Target_temperature: 90,
        Target_duration: 240,
        Mode: "Auto",
        Storage_temperature: 25,
        Customizable: false,
        User_Id: "43b22480-2922-4c34-9aa7-db780062014e"
    },
    {
        ID: "26ac2711-bcf4-4d01-b2dd-652165c51",
        Name: "Profile B",
        Target_temperature: 90,
        Target_duration: 240,
        Mode: "Auto",
        Storage_temperature: 25,
        Customizable: false,
        User_Id: "43b22480-2922-4c34-9aa7-db780062014e"
    }
]

const ProfilesList = ({ type }: { type: string }) => {

    const [openedTab, setOpenedTab] = useState<string | null>(null)

    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{type} profiles</Text>
                <View style={styles.titleProfileAmount}>
                    <Text style={styles.titleProfileAmountText}>{testProfiles.length} profiles</Text>
                </View>
            </View>
                    
            <View style={styles.profilesContainer}>
                {testProfiles
                    .filter(profile => type === "Custom" ? profile.Customizable : !profile.Customizable)
                    .map((profile) => (
                        openedTab === profile.ID ? (
                            <View style={styles.openedProfile} key={profile.ID}>
                                <Text style={styles.profileText}>{profile.Name} (opened)</Text>
                            </View>
                        ) : (
                            <View style={styles.closedProfile} key={profile.ID}>
                                <View>
                                    <View><Ionicons name="star-outline" size={22} color={'#000'}/><Text>{profile.Name}</Text></View>
                                    <Ionicons name='chevron-down' size={22} color={'#000'}/>
                                </View>
                                <View>
                                    <View><Ionicons name='thermometer' size={22} color={'#000'}/><Text>{profile.Target_temperature}°C</Text></View>
                                    <View><Ionicons name='time-outline' size={22} color={'#000'}/><Text>{profile.Target_duration}</Text></View>
                                </View>
                            </View>
                        )
                ))}
            </View>
        </View>
    )
}

function routeToProfileScreen(profile: DryingProfile) {
    const serialized = JSON.stringify(profile);
    router.push({
        pathname: '/(protected)/(tabs)/ProfileScreen',
        params: { profile: serialized }
    })
}

const styles = StyleSheet.create({
    titleContainer: {
        width: '90%',
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginTop: 20,
    },

    titleText: {
        fontSize: 23,
        marginRight: 10,
    },

    titleProfileAmount: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 30,
        borderWidth: 1,
        borderColor: '#B0B0B0',
        borderRadius: 30,
        backgroundColor: "#fff"
    },

    titleProfileAmountText: {
        fontSize: 17,
        fontFamily: 'Satoshi-Light'
    },

    addButton: {
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: 30
    },

    addButtonText: {
        color: '#000',
        fontSize: 20,  
    },

    profilesContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    profile: {
        borderWidth: 1,
        marginTop: 30,
        width: '90%',
        height: 50,
        backgroundColor: '#ffff'
    },

    profileButton: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    profileText: {
        fontSize: 23,
        marginLeft: 15
    },

    openedProfile: {
        borderWidth: 1,
        width: '90%',
        marginTop: 20,
        padding: 10,
        backgroundColor: '#E0E0E0'
    },

    closedProfile: {
        borderWidth: 1,
        width: '90%',
        marginTop: 20,
        padding: 10,
        backgroundColor: '#FFFFFF'
    }
});

export default ProfilesList;
