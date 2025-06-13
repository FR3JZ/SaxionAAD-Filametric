import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DangerZoneCard = () => {
    return (
        <View style={styles.card}>
            <View>
                <View style={styles.row}>
                    <Ionicons color="#FF2323" size={32} name="warning-outline"/>
                    <Text style={styles.dangerTitle}>Danger zone</Text>
                </View>
                <Text style={styles.dangerText}>These actions cannot be undone. Please proceed with caution.</Text>
            </View>

            <View style={styles.seperator}/>

            <View>
                <View style={styles.spacing}>
                    <Text style={styles.headingText}>Delete Dryers</Text>
                    <Text style={styles.text}>Remove all registered dryers and their settings</Text>
                    <TouchableOpacity style={styles.minorDangerButton}>
                        <Ionicons color="#FF2323" size={24} name="trash-outline"/>
                        <Text style={styles.minorDangerButtonText}>Delete all dryers</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.spacing}> 
                    <Text style={styles.headingText}>Delete Custom Profiles</Text>
                    <Text style={styles.text}>Remove all your custom filament profiles</Text>
                    <TouchableOpacity style={styles.minorDangerButton}>
                        <Ionicons color="#FF2323" size={24} name="trash-outline"/>
                        <Text style={styles.minorDangerButtonText}>Delete All Custom Profiles</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.headingText}>Reset All Settings</Text>
                    <Text style={styles.text}>Reset all preferences, notification settings and app configuration</Text>
                    <TouchableOpacity style={styles.minorDangerButton}>
                        <Ionicons color="#FF2323" size={24} name="reload-outline"/>
                        <Text style={styles.minorDangerButtonText}>Reset All Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.seperator}/>
                <Text style={styles.bigDangerHeadingText}>Permanently Delete Account</Text>
                <Text style={styles.text}>Permanently delete your Filametric account including all data and usage history</Text>
                <TouchableOpacity style={styles.bigDangerButton}>
                    <Ionicons color="#FFFFFF" size={24} name="trash-outline"/>
                    <Text style={styles.bigDangerButtonText}>Delete Account</Text>
                </TouchableOpacity>
            <View>
                
            </View>
        </View>
    )
}

export default DangerZoneCard;

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginTop: 16,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    seperator: {
        width: "95%",
        borderWidth: 1,
        borderColor: "#D1D1D1",
        marginVertical: 12,
    },
    dangerTitle: {
        color: "#FF2323",
        fontSize: 20,
        fontWeight: "500",
        fontFamily: "Satoshi",
        marginLeft: 8,
    },
    dangerText: {
        color: "#FF2323",
        fontSize: 16,
        fontWeight: "500",
        fontFamily: "Satoshi",
    },
    headingText: {
        color: "#262626",
        fontSize: 16,
        fontWeight: "500",
        fontFamily: "Satoshi",
    },
    text: {
        color: "#5D5D5D",
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "Satoshi",
    },
    minorDangerButton: {
        height: 48,
        backgroundColor: "#FFFFFF",
        justifyContent: 'center', 
        alignItems: "center", 
        flexDirection: 'row',    
        paddingHorizontal: 16,  
        columnGap: 8,   
        marginTop: 8,
        marginBottom: 4,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#FF2323",
    },
    minorDangerButtonText: {
        color: "#FF2323",
        fontSize: 18,
        fontWeight: "500",
        fontFamily: "Satoshi",
    },
    bigDangerButton: {
        height: 48,
        backgroundColor: "#FF2323",
        justifyContent: 'center', 
        alignItems: "center", 
        flexDirection: 'row',    
        paddingHorizontal: 16,  
        columnGap: 8,   
        marginTop: 8,
        marginBottom: 4,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#FF2323",
    },
    bigDangerButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "500",
        fontFamily: "Satoshi",
    },
    bigDangerHeadingText: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "500",
        fontFamily: "Satoshi",
    },
    spacing: {
        marginBottom: 16,
    },
});