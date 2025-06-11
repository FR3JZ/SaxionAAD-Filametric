import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    goBack: () => void;
    setUserPassword: (password: string) => void;
}

const GetPassword: React.FC<Props> = ({goBack, setUserPassword}) => {
    const [password, setPassword] = useState<string>("");
    const [secureText1, setSecureText1] = useState(true);
    const [isFocused, setIsFocused] = useState(false);

    const [isCorrectLength, setIsCorrectLength] = useState<boolean>(false);
    const [hasLowerAndUpercase, setHasLowerAndUpercase] = useState<boolean>(false);
    const [hasNumber, setHasNumber] = useState<boolean>(false);
    const [hasSymbol, setHasSymbol] = useState<boolean>(false);

    useEffect(() => {
        setIsCorrectLength(password.length >= 8);
        setHasLowerAndUpercase(/[a-z]/.test(password) && /[A-Z]/.test(password));
        setHasNumber(/\d/.test(password));
        setHasSymbol(/[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]/.test(password));
    }, [password]);

    function isPasswordCorrect():boolean {
        return isCorrectLength && hasLowerAndUpercase && hasNumber && hasSymbol;
    }

    function setNewUserPassword() {
        if(isPasswordCorrect()) {
            setUserPassword(password)
        }
    }

    const getBorderColor = () => {
        if (password === "") return "#E7E7E7";     
        if (isPasswordCorrect()) return "#00C03B"; 
        return "#FF2323";                          
    };

    return (
        <View>
            <View style={style.header}>
                <Image style={style.image} source={require('../../../assets/images/Filametric_F_logo.png')} />
                <Text style={style.titleText}>Create a password</Text>
            </View>

            <View style={style.textContainer}>
                <Text style={style.pageText}>protect your account by creating a strong password</Text>
            </View>

            <View style={[
                style.passwordContainer,
                { borderColor: getBorderColor() }
            ]}>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={secureText1}
                    autoCapitalize="none"
                    placeholderTextColor="gray"
                    placeholder="Password"
                    style={{ flex: 1 }}
                />
                <TouchableOpacity onPress={() => setSecureText1(!secureText1)} style={style.toggle}>
                    {secureText1 ? <Ionicons size={24} name='eye-sharp' /> : <Ionicons size={24} name='eye-off-sharp' />}
                </TouchableOpacity>
            </View>

            <View>
                <View style={style.checkRow}>
                    <Ionicons style={[style.icon, { color: isCorrectLength ? "#00C03B" : "#888888" }]} size={24} name='checkmark-circle'/>
                    <Text>A minimum of 8 characters</Text>
                </View>
                <View style={style.checkRow}>
                    <Ionicons style={[style.icon, { color: hasLowerAndUpercase ? "#00C03B" : "#888888" }]} size={24} name='checkmark-circle'/>
                    <Text>Lower and uppercase letter</Text>
                </View>
                <View style={style.checkRow}>
                    <Ionicons style={[style.icon, { color: hasNumber ? "#00C03B" : "#888888" }]} size={24} name='checkmark-circle'/>
                    <Text>At least 1 number</Text>
                </View>
                <View style={style.checkRow}>
                    <Ionicons style={[style.icon, { color: hasSymbol ? "#00C03B" : "#888888" }]} size={24} name='checkmark-circle'/>
                    <Text>At least 1 symbol</Text>
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
        fontSize: 16,
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
    },
    checkRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 6,
    },
    goBackText: {
        alignSelf: 'center',
        marginTop: 24,
        fontFamily: "Satoshi",
        fontSize: 16,
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
        textAlign: 'center'
    },
});

export default GetPassword;