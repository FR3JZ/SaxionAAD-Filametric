import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';


interface Props {
    username: string;
    goToLogin: () => void;
}

const WelcomeUser: React.FC<Props> = ({username, goToLogin}) => {
    return (
        <View>
            <View style={style.header}>
                <Image style={style.imageLogo} source={require('../../../assets/images/Filametric_F_logo.png')} />
                <Text style={style.titleText}>Hi, {username}!</Text>
            </View>

            <View style={style.textContainer}>
                <Text style={style.pageText}>Access everything Filametric has to offer - all from a single account</Text>
            </View>

            <View  style={style.imageContainer}>
                <Image 
                    source={require("../../../assets/images/solo.png")}
                    style={style.soloImage}
                    resizeMode="contain"
                />
            </View>
            
            
            <Pressable style={style.button} onPress={goToLogin}>
                <Text style={style.buttonText}>Bring on the heat!</Text>
            </Pressable>
        </View>
    )
}

export default WelcomeUser;

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
    imageLogo: {
        width: 57,
        height: 54,
        resizeMode: 'contain',
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
    imageContainer: {
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    soloImage: {
        width: 300,
        height: 300
    },
    button: {
        height: 64,
        backgroundColor: "#FF5500",
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 32,
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
})
