import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

const ProfileCreationPage = () => {

    const [profileName, setProfileName] = useState<string>("");

    return (
        <View>
            <View style={styles.headerContainer}>
                <Ionicons name="arrow-back" size={30} color={'#000'}/>
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
                    </View>
                    <View>
                        <View style={styles.modeContainer}>
                            <View style={styles.modeTitleContainer}>
                                <Image source={require("../../assets/images/normal_mode_icon.png")} style={styles.modeImage} resizeMode='contain' />
                                <Text style={styles.modeText}>Normal mode settings</Text>
                            </View>
                        </View>
                        <View style={styles.modeContainer}>
                            <View style={styles.modeTitleContainer}>
                                <Image source={require("../../assets/images/silent_mode_icon.png")} style={styles.modeImage} resizeMode='contain' />
                                <Text style={styles.modeText}>Silent mode settings</Text>
                            </View>
                        </View>
                        <View style={styles.modeContainer}>
                            <View style={styles.modeTitleContainer}>
                                <Image source={require("../../assets/images/storage_mode_icon.png")} style={styles.modeImage} resizeMode='contain' />
                                <Text style={styles.modeText}>Storage mode settings</Text>
                            </View>
                        </View>
                    </View>
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
        borderRadius: 10
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
    },

    modeText: {
        marginLeft: 10,
        fontSize: 21,
        fontFamily: 'Satoshi-Medium'
    }

});

export default ProfileCreationPage;