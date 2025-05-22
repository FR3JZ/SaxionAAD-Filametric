import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Image
                source={require('../assets/images/Filametric_Full_Logo_v3.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.divider} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 40,
        paddingBottom: 15,
        backgroundColor: 'white',
    },
    logo: {
        width: 250,
        height: 60,
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        alignSelf: 'stretch',
        marginTop: 10,
    },
});

export default Header;
