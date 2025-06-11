import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ProfileMultiPicker from "./ProfileMultiPicker";
import FilametricSwitch from "../custom/FilametricSwitch";
import { router } from "expo-router";
import ProfileService from "@/services/profileService";

const ProfileCreationPage = () => {
    const normalModeIcon = "../../assets/images/normal_mode_icon.png"
    const silentModeIcon = "../../assets/images/silent_mode_icon.png"
    const storageModeIcon = "../../assets/images/storage_mode_icon.png"

    const [profileName, setProfileName] = useState<string>("");

    const [normalHours, setNormalHours] = useState<number>(10);
    const [normalMins, setNormalMins] = useState<number>(0);
    const [normalTemp, setNormalTemp] = useState<number>(90);

    const [silentHours, setSilentHours] = useState<number>(10);
    const [silentMins, setSilentMins] = useState<number>(0);
    const [silentTemp, setSilentTemp] = useState<number>(90);

    const [storageHours, setStorageHours] = useState<number>(10);
    const [storageMins, setStorageMins] = useState<number>(0);
    const [storageTemp, setStorageTemp] = useState<number>(90);
    const [autoSwitchToStorage, setAutoSwitchToStorage] = useState<boolean>(true);

    const [errorVisible, setErrorVisible] = useState<boolean>(false);

    const createProfile = async () => {
        
        if(profileName.length < 2) {
            setErrorVisible(true);
        } else {
            setErrorVisible(false);
            const body = 
            {
                customizable: true,
                name: profileName, 
                description: "",
                normal: {
                    duration: normalHours * 60 + normalMins,
                    target_temperature: normalTemp
                },
                silent: {
                    duration: silentHours * 60 + silentMins,
                    target_temperature: silentTemp
                },
                storage: {
                    duration: storageHours * 60 + storageMins,
                    target_temperature: storageTemp
                },
                switch_to_storage: autoSwitchToStorage
            }
    
            const json = await ProfileService.createProfile(body);
            router.back();
        }
        
    }

    return (
        <View>
            <View style={styles.headerContainer}>
                <TouchableOpacity 
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create New Profile</Text>
                <View style={styles.headerPlaceholder}/>
            </View>

            <View style={styles.inputsContainer}>
                <View style={styles.inputsWrapper}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Profile name</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={"#B0B0B0"} 
                            placeholder="Super secret profile"
                            onChangeText={setProfileName}
                            value={profileName}
                        />

                        {errorVisible && <Text style={styles.errorText}>Please enter a name for your profile</Text>}
                    </View>
                    <View>
                        <View style={styles.modeContainer}>
                            <View style={styles.modeTitleContainer}>
                                <Image source={require(normalModeIcon)} style={styles.modeImage} resizeMode='contain' />
                                <Text style={styles.modeText}>Normal mode settings</Text>
                            </View>
                            <ProfileMultiPicker
                                image={require(normalModeIcon)}
                                label="Normal mode settings"
                                hours={normalHours}
                                setHours={setNormalHours}
                                minutes={normalMins}
                                setMinutes={setNormalMins}
                                temperature={normalTemp}
                                setTemperature={setNormalTemp}
                            ></ProfileMultiPicker> 
                        </View>
                        <View style={styles.modeContainer}>
                            <View style={styles.modeTitleContainer}>
                                <Image source={require(silentModeIcon)} style={styles.modeImage} resizeMode='contain' />
                                <Text style={styles.modeText}>Silent mode settings</Text>
                            </View>
                            <ProfileMultiPicker
                                image={require(silentModeIcon)}
                                label="Normal mode settings"
                                hours={silentHours}
                                setHours={setSilentHours}
                                minutes={silentMins}
                                setMinutes={setSilentMins}
                                temperature={silentTemp}
                                setTemperature={setSilentTemp}
                            ></ProfileMultiPicker> 
                        </View>
                        <View style={styles.modeContainer}>
                            <View style={styles.modeTitleContainer}>
                                <Image source={require(storageModeIcon)} style={styles.modeImage} resizeMode='contain' />
                                <Text style={styles.modeText}>Storage mode settings</Text>
                            </View>
                            <ProfileMultiPicker
                                image={require(storageModeIcon)}
                                label="Normal mode settings"
                                hours={storageHours}
                                setHours={setStorageHours}
                                minutes={storageMins}
                                setMinutes={setStorageMins}
                                temperature={storageTemp}
                                setTemperature={setStorageTemp}
                            ></ProfileMultiPicker> 

                            <View style={styles.storageOptions}>
                                <View style={styles.storageOptionsInfo}>
                                    <Text style={styles.storageOptionsInfoTitle}>Auto switch to storage mode</Text>
                                    <Text style={styles.storageOptionsInfoSubtitle}>Automatically switch to storage mode after the drying cycle is completed</Text>
                                </View>
                                <FilametricSwitch value={autoSwitchToStorage} onChange={setAutoSwitchToStorage}></FilametricSwitch>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.createButton} onPress={createProfile}><Text style={styles.createButtonText}>Create Profile</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    headerContainer: {
        width: '89%',
        paddingTop: 55  ,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerTitle: {
        fontSize: 23
    },

    headerPlaceholder: {
        width: 30, 
        height: 30,
    },

    inputsContainer: {
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingBottom: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    inputsWrapper: {
        marginTop: 15,
        marginLeft: 15,
        width: '92%'
    },

    titleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#D1D1D1',
        paddingBottom: 20
    },

    title: {
        fontSize: 21
    },

    errorText: {
        color: '#FF0000'
    },

    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        borderRadius: 10,
        padding: 8,
        fontSize: 18,
        marginTop: 10
    },

    modeImage: {
        width: 28,
        height: 28
    },
    
    modeContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#D1D1D1',
        paddingBottom: 15
    },

    modeTitleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
    },

    modeText: {
        marginLeft: 10,
        fontSize: 21,
        fontFamily: 'Satoshi-Medium'
    },

    storageOptions: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    storageOptionsInfo: {
        marginTop: 20,
        marginRight: 10,
        width: '85%'
    },

    storageOptionsInfoTitle: {
        fontFamily: 'Satoshi-Medium',
        fontSize: 17
    },

    storageOptionsInfoSubtitle: {
        fontFamily: 'Satoshi-Light',
        fontSize: 14
    },

    createButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'center',
        width: '98%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#00C03B'
    },

    createButtonText: {
        color: '#fff',
        fontSize: 18
    },

});

export default ProfileCreationPage;