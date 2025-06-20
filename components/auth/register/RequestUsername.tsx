import { useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import React from "react";
import ErrorMessageText from "@/components/error-handling/ErrorMessageText";

interface Props {
    goBack: () => void;
    setNewUsername: (username: string) => void;
    sendDetails: () => void;
    isSendingAccountDetails: boolean;
    error: string;
}

const UsernameInput: React.FC<Props> = ({ setNewUsername, sendDetails, goBack, isSendingAccountDetails = false, error = "" }) => {
    const [username, setUsername] = useState<string>("");

    /**
     * Tells the parent the user want to use this username when the username is long enough
     */
    const goToNextQuestion = () => {
        if (username.length >= 3) {
            sendDetails();
        }
    };

    /**
     * sets the new username and tells the parent what it is.
     * @param newUsername is the username that was put in the input
     */
    const usernameChange = (newUsername:string) => {
        setUsername(newUsername)
        setNewUsername(newUsername);
    };

    /**
     * Get the border color for the username input based on validity
     * @returns The color code string
     */
    const getBorderColor = () => {
        if (username === "") return "#E7E7E7";
        if (username.length >= 3) return "#00C03B";
        return "#FF2323";
    };

    return (
        <View>
            <View style={style.header}>
                <Image style={style.image} source={require('../../../assets/images/Filametric_F_Logo.png')} />
                <Text style={style.titleText}>How can we call you?</Text>
            </View>

            <View style={style.textContainer}>
                <Text style={style.pageText}>So we can personalize things for you</Text>
            </View>

            <TextInput
                value={username}
                onChangeText={(value) => usernameChange(value)}
                placeholderTextColor="gray"
                placeholder="Username"
                style={[style.textField, { borderColor: getBorderColor() }]}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <ErrorMessageText message={error} />

            {/* Continue button with loading state */}
            <TouchableOpacity onPress={goToNextQuestion} style={style.button}>
                {!isSendingAccountDetails ?
                    <Text style={style.buttonText}>Continue</Text>
                    :
                    <ActivityIndicator color="#FFFFFF" style={style.activity} />
                }
            </TouchableOpacity>

            <Pressable onPress={goBack}>
                <Text style={style.goBackText}>Go back</Text>
            </Pressable>
        </View>
    );
};

const style = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },
    titleText: {
        fontFamily: "Satoshi-Bold",
        fontSize: 32,
        marginTop: 24,
        textAlign: 'center'
    },
    image: {
        width: 100,
        height: 90,
        resizeMode: 'contain',
    },
    button: {
        height: 64,
        backgroundColor: "#FF5500",
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 20,
        marginBottom: 4,
        borderWidth: 1,
        borderRadius: 16,
        borderColor: "#FF5500",
        paddingTop: 8,
        paddingRight: 16,
        paddingBottom: 8,
        paddingLeft: 16,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontFamily: "Satoshi",
    },
    textField: {
        marginTop: 4,
        marginBottom: 4,
        height: 64,
        paddingTop: 8,
        paddingRight: 16,
        paddingBottom: 8,
        paddingLeft: 16,
        borderRadius: 16,
        borderWidth: 1,
        fontFamily: "Satoshi",
        fontSize: 20,
        backgroundColor: "white",
    },
    goBackText: {
        alignSelf: 'center',
        marginTop: 24,
        fontFamily: "Satoshi",
        fontSize: 18,
        fontWeight: "500",
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        marginVertical: 4,
    },
    pageText: {
        fontFamily: "Satoshi",
        fontSize: 16,
        fontWeight: "500",
        color: "#888888",
        textAlign: 'center',
        marginBottom: 20
    },
    activity: {
        height: 16,
        width: 16,
    }
});

export default UsernameInput;