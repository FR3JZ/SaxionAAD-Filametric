import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    goBack: () => void;
    setUserPassword: (password: string) => void;
}

const GetPassword: React.FC<Props> = ({ goBack, setUserPassword }) => {
    const [password, setPassword] = useState<string>("");
    const [secureText1, setSecureText1] = useState(true);
    const [isFocused, setIsFocused] = useState(false);

    // State for password validation rules
    const [isCorrectLength, setIsCorrectLength] = useState<boolean>(false);
    const [hasLowerAndUpercase, setHasLowerAndUpercase] = useState<boolean>(false);
    const [hasNumber, setHasNumber] = useState<boolean>(false);
    const [hasSymbol, setHasSymbol] = useState<boolean>(false);

    // Check to see if the password is correct when password changes
    useEffect(() => {
        setIsCorrectLength(password.length >= 8);
        setHasLowerAndUpercase(/[a-z]/.test(password) && /[A-Z]/.test(password));
        setHasNumber(/\d/.test(password));
        setHasSymbol(/[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]/.test(password));
    }, [password]);

    /**
     * Check all booleans that are part of the password requirements
     * @returns Returns true when all password requirements are correct
     */
    function isPasswordCorrect():boolean {
        return isCorrectLength && hasLowerAndUpercase && hasNumber && hasSymbol;
    }

    /**
     * Tells the parent what the new password is when the password is correct
     */
    function setNewUserPassword() {
        if (isPasswordCorrect()) {
            setUserPassword(password);
        }
    }

    /**
     * Returns a color for user feedback on their password
     * @returns The color code string for the input border
     */
    const getBorderColor = () => {
        if (password === "") return "#E7E7E7";
        if (isPasswordCorrect()) return "#00C03B";
        return "#FF2323";
    };

    return (
        <View>
            <View style={style.header}>
                <Image style={style.image} source={require('../../../assets/images/Filametric_F_Logo.png')} />
                <Text style={style.titleText}>Create a password</Text>
            </View>

            <View style={style.textContainer}>
                <Text style={style.pageText}>protect your account by creating a strong password</Text>
            </View>

            <View style={[style.passwordContainer, { borderColor: getBorderColor() }]}>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={secureText1}
                    autoCapitalize="none"
                    placeholderTextColor="gray"
                    placeholder="Password"
                    style={{ flex: 1, fontSize: 20 }}
                />
                <TouchableOpacity onPress={() => setSecureText1(!secureText1)} style={style.toggle}>
                    {secureText1
                        ? <Ionicons size={24} name='eye-sharp' />
                        : <Ionicons size={24} name='eye-off-sharp' />}
                </TouchableOpacity>
            </View>

            {/* Live password validation checklist */}
            <View style={style.checkRows}>
                <View style={style.checkRow}>
                    <Ionicons style={[style.icon, { color: isCorrectLength ? "#00C03B" : "#888888" }]} size={24} name='checkmark-circle' />
                    <Text style={style.checkRowText}>A minimum of 8 characters</Text>
                </View>
                <View style={style.checkRow}>
                    <Ionicons style={[style.icon, { color: hasLowerAndUpercase ? "#00C03B" : "#888888" }]} size={24} name='checkmark-circle' />
                    <Text style={style.checkRowText}>Lower and uppercase letter</Text>
                </View>
                <View style={style.checkRow}>
                    <Ionicons style={[style.icon, { color: hasNumber ? "#00C03B" : "#888888" }]} size={24} name='checkmark-circle' />
                    <Text style={style.checkRowText}>At least 1 number</Text>
                </View>
                <View style={style.checkRow}>
                    <Ionicons style={[style.icon, { color: hasSymbol ? "#00C03B" : "#888888" }]} size={24} name='checkmark-circle' />
                    <Text style={style.checkRowText}>At least 1 symbol</Text>
                </View>
            </View>

            <TouchableOpacity onPress={setNewUserPassword} style={style.button}>
                <Text style={style.buttonText}>Continue</Text>
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
        marginTop: 60
    },
    titleText: {
        fontFamily: "Satoshi",
        fontSize: 32,
        fontWeight: "700",
        marginTop: 40,
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
        fontSize: 16,
        backgroundColor: "white",
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
    icon: {
        color: "#888888",
        marginRight: 10
    },

    checkRows: {
        marginTop: 20,
        marginBottom: 20
    },

    checkRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 6,
    },

    checkRowText: {
        fontSize: 16,
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
        marginVertical: 4,
        marginTop: 15,
        marginBottom: 30
    },
    pageText: {
        fontFamily: "Satoshi",
        fontSize: 16,
        fontWeight: "500",
        color: "#888888",
        textAlign: 'center'
    },
});

export default GetPassword;