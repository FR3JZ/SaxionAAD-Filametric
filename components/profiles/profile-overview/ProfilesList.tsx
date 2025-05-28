import React from 'react';
import { View, Text, StyleSheet, Pressable } from "react-native";
import { DryingProfile } from '@/constants/Objects';
import { router } from 'expo-router';

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
    }
]

const ProfilesList = ({ type }: { type: string }) => {
    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{type} profiles</Text>
                {type === 'Custom' && (
                    <Pressable onPress={handleAdd} style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </Pressable>
                )}
            </View>
                    
            <View style={styles.profilesContainer}>
                {testProfiles.filter(profile => type === "Custom" ? profile.Customizable : !profile.Customizable ).map((profile) => (
                    <View key={profile.ID} style={styles.profile}>
                        <Pressable style={styles.profileButton} onPress={() => routeToProfileScreen(profile)}>
                            <Text style={styles.profileText}>
                                {profile.Name}
                            </Text>
                        </Pressable>
                    </View>
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

function handleAdd() {
    console.log("Add profile");
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    profile: {
        borderWidth: 1,
        marginTop: 30,
        width: 350,
        height: 50
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
    }
});

export default ProfilesList;
