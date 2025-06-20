import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DryerAddInstructionPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.instructionsContainer}>
                <View style={styles.header}>
                    <Ionicons name="settings-outline" size={20} color="black" />
                    <Text style={styles.instructionTitle}>Setup Instructions</Text>
                </View>

                {/* Step 1 Instruction */}
                <View style={styles.instructionLine}>
                    <View style={styles.stepContainer}><Text style={styles.stepText}>1</Text></View>
                    <View style={styles.instructionTextContainer}>
                        <Text style={styles.instructionText}>Go to Settings {'>'} Account on your dryer</Text>
                        <Text style={styles.instructionSubtext}>Navigate to the settings menu on your dryer</Text>
                    </View>
                </View>

                {/* Step 2 Instruction */}
                <View style={styles.instructionLine}>
                    <View style={styles.stepContainer}><Text style={styles.stepText}>2</Text></View>
                    <View style={styles.instructionTextContainer}>
                        <Text style={styles.instructionText}>Scan QR code from the app</Text>
                        <Text style={styles.instructionSubtext}>Use the scanner below to connect your dryer</Text>
                    </View>
                </View>
            </View>

            <View style={styles.explanationContainer}>
                <View style={styles.header}>
                    <Text style={styles.explanationTitle}>Why connect your dryer?</Text>
                </View>

                {/* Each benefit block highlights a reason to connect the dryer */}
                <View style={styles.benefitItem}>
                    <Ionicons name="person-outline" size={22} color="#7A42F4" />
                    <View style={styles.benefitTextBlock}>
                        <Text style={styles.benefitTitle}>Custom profiles & full customization</Text>
                        <Text style={styles.benefitText}>
                            Create and manage personalized drying profiles for different materials
                        </Text>
                    </View>
                </View>

                <View style={styles.benefitItem}>
                    <Ionicons name="globe-outline" size={22} color="#00B386" />
                    <View style={styles.benefitTextBlock}>
                        <Text style={styles.benefitTitle}>Access from anywhere in the world</Text>
                        <Text style={styles.benefitText}>
                            Monitor and control your dryer(s) remotely via an internet connection
                        </Text>
                    </View>
                </View>

                <View style={styles.benefitItem}>
                    <Ionicons name="notifications-outline" size={22} color="#FFC300" />
                    <View style={styles.benefitTextBlock}>
                        <Text style={styles.benefitTitle}>Receive notifications</Text>
                        <Text style={styles.benefitText}>
                            Get alerts when drying cycles complete or issues occur
                        </Text>
                    </View>
                </View>
            </View>

            {/* Navigates to QR scanner screen for pairing dryer */}
            <TouchableOpacity 
                onPress={() => router.push('/(protected)/(dryer-add)/QRCodeScannerScreen')} 
                style={styles.redirectButton}
            >
                <Text style={styles.redirectButtonText}>+ Connect Dryer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#F9F9F9'
    },
    instructionsContainer: {
        width: '90%',
        borderRadius: 10,
        padding: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 8,
    },
    instructionTitle: {
        fontFamily: 'Satoshi-Medium',
        fontSize: 21,
        marginLeft: 10,
    },
    instructionLine: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 8,
    },
    stepContainer: {
        backgroundColor: '#0086D4',
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginTop: 3,
    },
    stepText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
    },
    instructionTextContainer: {
        flex: 1,
    },
    instructionText: {
        fontFamily: 'Satoshi-Medium',
        fontSize: 16,
        color: '#000',
    },
    instructionSubtext: {
        fontSize: 14,
        color: '#5D5D5D',
        marginTop: 2,
    },
    explanationContainer: {
        marginTop: 20,
        width: '90%',
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    explanationTitle: {
        fontFamily: 'Satoshi-Medium',
        fontSize: 21,
        marginLeft: 18,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 18,
        marginTop: 16,
        gap: 12,
    },
    benefitTextBlock: {
        flexShrink: 1,
        flexGrow: 1,
        flexBasis: '85%',
    },
    benefitTitle: {
        fontFamily: 'Satoshi-Medium',
        fontSize: 16,
        color: '#000',
    },
    benefitText: {
        fontSize: 14,
        color: '#5D5D5D',
        marginTop: 2,
    },
    redirectButton: { 
        marginTop: 24,
        backgroundColor: '#00C03B',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
    },
    redirectButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default DryerAddInstructionPage;
