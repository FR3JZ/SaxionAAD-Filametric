import { AuthContext } from "@/context/authContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const PersonalInformationCard = () => {
    const auth = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // Local state for editable fields
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [currentUsername, setCurrentUsername] = useState<string>("");
    const [currentEmail, setCurrentEmail] = useState<string>("");

    useEffect(() => {
        setDetails();
    }, [])


    /**
     * @deprecated AWS cognito does not allow the change of the username. Or the email of a verified user.
     * This can only be done by an admin in AWS cognito.
     */
    function saveChanges() {
        console.log("Username: " + username + "  Email: " + email);
    }

    /**
     * Get the user email and username from the authcontext. 
     */
    async function setDetails() {
        const name = await auth.getCurrentUsername();
        const mail = await auth.getCurrentEmail();
        if (name !== null) setCurrentUsername(name);
        if (mail !== null) setCurrentEmail(mail);
    }

    return (
        <View style={styles.card}>
            <View>
                {/* Header with title and edit toggle icon */}
                <View style={styles.titleRow}>
                    <Text style={styles.titleText}>Personal Information</Text>
                    <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                        {!isEditing ? (
                            <Ionicons size={32} name="create-outline" />
                        ) : (
                            <Ionicons size={32} name="return-down-back-outline" />
                        )}
                    </TouchableOpacity>
                </View>

                {/* Display user identity section */}
                <View>
                    <View style={styles.infoRow}>
                        <Ionicons style={styles.userImage} size={40} name="person-circle" />
                        <View>
                            <Text style={styles.nameText}>{currentUsername}</Text>
                            <Text style={styles.nameText}>{currentEmail}</Text>
                        </View>
                    </View>

                    {/* Show editable input fields if in edit mode */}
                    {isEditing && (
                        <View style={styles.spacing}>
                            <Text style={styles.nameText}>Name</Text>
                            <TextInput
                                value={username}
                                onChangeText={setUsername}
                                placeholderTextColor="#B0B0B0"
                                placeholder={currentUsername}
                                style={styles.textField}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor="#B0B0B0"
                                placeholder={currentEmail}
                                style={styles.textField}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                            <Text style={[styles.grayText, {marginVertical: 4}]}>Email and username cannot be changed after registration</Text>
                            <TouchableOpacity onPress={saveChanges} style={styles.saveChangesButton}>
                                <Text style={styles.buttonText}>Save changes</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Logout button always visible */}
                <View style={styles.spacing}>
                    <TouchableOpacity onPress={() => auth.logOut()} style={styles.logOutButton}>
                        <Ionicons color="#FFFFFF" size={24} name="exit-outline" />
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default PersonalInformationCard;

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
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 16,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "500",
        fontFamily: "Satoshi",
    },
    userImage: {
        width: 40,
        height: 40,
        marginRight: 16,
    },
    nameText: {
        fontSize: 16,
        fontWeight: "500",
        fontFamily: "Satoshi",
        color: "#262626",
    },
    grayText: {
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "Satoshi",
        color: "#5D5D5D",
    },
    logOutButton: {
        height: 48,
        backgroundColor: "#FF5500",
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
        paddingHorizontal: 16,
        columnGap: 8,
        marginTop: 8,
        marginBottom: 4,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#FF5500",
    },
    saveChangesButton: {
        height: 48,
        backgroundColor: "#00C03B",
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
        paddingHorizontal: 16,
        columnGap: 8,
        marginTop: 8,
        marginBottom: 4,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#00C03B",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontFamily: "Satoshi-Medium",
        fontWeight: "500",
    },
    textField: {
        marginTop: 4,
        marginBottom: 4,
        height: 48,
        paddingTop: 8,
        paddingRight: 16,
        paddingBottom: 8,
        paddingLeft: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E7E7E7",
        fontFamily: "Satoshi",
        fontSize: 16,
        backgroundColor: "white",
    },
    spacing: {
        marginTop: 16,
    },
});
