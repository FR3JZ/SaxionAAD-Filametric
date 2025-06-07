import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { router } from "expo-router";

interface Props {
    goBack: () => void;
    setUserEmail: (email: string) => void;
}

const EmailInput: React.FC<Props> = ({setUserEmail, goBack}) => {
    const [email, setEmail] = useState<string>("");

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,24}$/;

    const getBorderColor = () => {
        if (email === "") return "#E7E7E7";     
        if (emailRegex.test(email)) return "#00C03B"; 
        return "#FF2323";                          
    };

    const goToNextQuestion = () => {
        if (emailRegex.test(email)){
            setUserEmail(email)
        }
    }

    return (
        <View>
            <View style={style.header}>
                <Image style={style.image} source={require('../../../assets/images/Filametric_F_logo.png')} />
                <Text style={style.titleText}>Create your account</Text>
            </View>

            <View style={style.textContainer}>
                <Text style={style.pageText}>Access everything Filametric has to offer - all from a single account</Text>
            </View>

            <TextInput
                value={email}
                onChangeText={(value) => setEmail(value)}
                placeholderTextColor="gray"
                placeholder="Email Address"
                style={[style.textField, { borderColor: getBorderColor() }]}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <Pressable onPress={goToNextQuestion} style={style.button}>
                <Text style={style.buttonText}>Continue</Text>
            </Pressable>

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
        fontFamily: "Satoshi",
        fontSize: 16,
        backgroundColor: "white",
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

export default EmailInput;