import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import React from "react";

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
                <Image style={style.image} source={require('../../../assets/images/Filametric_F_Logo.png')} />
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

            <TouchableOpacity onPress={goToNextQuestion} style={style.button}>
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
        fontSize: 18,
        fontWeight: "500",
        color: "#888888",
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20
    },
});

export default EmailInput;