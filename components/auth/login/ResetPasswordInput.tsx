import ErrorMessageText from '@/components/error-handling/ErrorMessageText';
import { Ionicons } from '@expo/vector-icons';
import { Auth } from 'aws-amplify';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const PasswordResetInput = () => {
    const [username, setUsername] = useState<string>("");
    const [usernameError, setUsernameError] = useState<string>("");

    const [resetCode, setResetCode] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");

    const [sendingCode, setSendingCode] = useState<boolean>(false);
    const [enterNewPassword, setEnterNewPassword] = useState<boolean>(false);
    const [sendingNewPassword, setSendingNewPassword] = useState<boolean>(false);
    const [passwordResetError, setPasswordResetError] = useState<string>("");

    const [secureText1, setSecureText1] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isCorrectLength, setIsCorrectLength] = useState<boolean>(false);
    const [hasLowerAndUpercase, setHasLowerAndUpercase] = useState<boolean>(false);
    const [hasNumber, setHasNumber] = useState<boolean>(false);
    const [hasSymbol, setHasSymbol] = useState<boolean>(false);
    
    // Check to see if the password is correct after input changes
    useEffect(() => {
        setIsCorrectLength(newPassword.length >= 8);
        setHasLowerAndUpercase(/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword));
        setHasNumber(/\d/.test(newPassword));
        setHasSymbol(/[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]/.test(newPassword));
    }, [newPassword]);

    /**
     * Tell cognito to start the password reset by sending the username.
     */
    const initiatePasswordReset = async () => {
        try {
            setSendingCode(true);
            setUsernameError("");
            await Auth.forgotPassword(username);
            setEnterNewPassword(true); // Switch to step 2
        } catch (error) {
            if (error instanceof Error) setUsernameError(error.message);
        } finally {
            setSendingCode(false);
        }
    };

    /**
     * Send the username, resetcode and new password to change the password.
     */
    const sendPasswordReset = async () => {
        try {
            setSendingNewPassword(true);
            setPasswordResetError("");
            await Auth.forgotPasswordSubmit(username, resetCode, newPassword);
            router.push("/LoginScreen"); // Navigate to login after success
        } catch (error) {
            if (error instanceof Error) setPasswordResetError(error.message);
        } finally {
            setSendingNewPassword(false);
        }
    };

    /**
     * Returns a color for user feedback on their password
     * @returns The color code string for the input border
     */
    const getBorderColor = () => {
        if (newPassword === "") return "#E7E7E7";
        if (isPasswordCorrect()) return "#00C03B";
        return "#FF2323";
    };

    /**
     * Check all booleans that are part of the password requirements
     * @returns Returns true when all password requirements are correct
     */
    function isPasswordCorrect():boolean {
        return isCorrectLength && hasLowerAndUpercase && hasNumber && hasSymbol;
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image style={style.image} source={require('@/assets/images/Filametric_F_Logo.png')} />
                <Text style={style.titleText}>Reset your password</Text>
            </View>

            {!enterNewPassword ?
                <View>
                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        placeholderTextColor="gray"
                        placeholder="Name"
                        style={style.textField}
                        autoCapitalize="none"
                    />

                    <ErrorMessageText message={usernameError} />

                    <TouchableOpacity onPress={initiatePasswordReset} style={style.button}>
                        {!sendingCode ?
                            <Text style={style.buttonText}>Send reset code</Text>
                            :
                            <ActivityIndicator style={style.loadingIndicator} color="white" />
                        }
                    </TouchableOpacity>
                </View>
                :
                <View>
                    <TextInput
                        value={resetCode}
                        onChangeText={setResetCode}
                        placeholderTextColor="gray"
                        placeholder="Reset code"
                        style={style.textField}
                        autoCapitalize="none"
                    />

                    <View style={[
                        style.passwordContainer,
                        { borderColor: getBorderColor() }
                    ]}>
                        <TextInput
                            value={newPassword}
                            onChangeText={setNewPassword}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            secureTextEntry={secureText1}
                            autoCapitalize="none"
                            placeholderTextColor="gray"
                            placeholder="New password"
                            style={{ flex: 1, fontSize: 20 }}
                        />
                        <TouchableOpacity onPress={() => setSecureText1(!secureText1)} style={style.toggle}>
                            {secureText1 ? <Ionicons size={24} name='eye-sharp' /> : <Ionicons size={24} name='eye-off-sharp' />}
                        </TouchableOpacity>
                    </View>

                    <ErrorMessageText message={passwordResetError} />

                    {/* Password criteria checklist */}
                    <View>
                        <View style={style.checkRow}>
                            <Ionicons style={[style.icon, { color: isCorrectLength ? "#00C03B" : "#888888" }]} size={24} name='checkmark-circle' />
                            <Text>A minimum of 8 characters</Text>
                        </View>
                        <View style={style.checkRow}>
                            <Ionicons style={[style.icon, { color: hasLowerAndUpercase ? "#00C03B" : "#888888" }]} size={24} name='checkmark-circle' />
                            <Text>Lower and uppercase letter</Text>
                        </View>
                        <View style={style.checkRow}>
                            <Ionicons style={[style.icon, { color: hasNumber ? "#00C03B" : "#888888" }]} size={24} name='checkmark-circle' />
                            <Text>At least 1 number</Text>
                        </View>
                        <View style={style.checkRow}>
                            <Ionicons style={[style.icon, { color: hasSymbol ? "#00C03B" : "#888888" }]} size={24} name='checkmark-circle' />
                            <Text>At least 1 symbol</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={sendPasswordReset} style={style.button}>
                        {!sendingNewPassword ?
                            <Text style={style.buttonText}>Reset password</Text>
                            :
                            <ActivityIndicator style={style.loadingIndicator} color="white" />
                        }
                    </TouchableOpacity>
                </View>
            }

            <Pressable onPress={() => router.push("/LoginScreen")}>
                <Text style={style.goBackText}>Go back</Text>
            </Pressable>
        </View>
    )
}

export default PasswordResetInput;

const style = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        marginTop: 32
    },
    titleText: {
        fontFamily: "Satoshi",
        fontSize: 32,
        fontWeight: "700",
        marginTop: 24,
        textAlign: 'center'
    },
    container: {
        margin: 20,
        flex: 1,
    },
    image: {
        width: 57,
        height: 54,
        resizeMode: 'contain',
    },
    button: {
        height: 64,
        backgroundColor: "#FF5500",
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 8,
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
        borderColor: "#E7E7E7",
        fontFamily: "Satoshi",
        fontSize: 20,
        backgroundColor: "white",
    },
    loadingIndicator: {
        width: 16,
        height: 16
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 4,
        height: 64,
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
    toggle: {
        paddingHorizontal: 10,
    },
    goBackText: {
        alignSelf: 'center',
        marginTop: 24,
        fontFamily: "Satoshi",
        fontSize: 20,
        fontWeight: "500",
    },
    icon: {
        color: "#888888",
    },
    checkRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 6,
    },
});