import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const DryerAddConfirmationPage = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/checkmark.json')}
        autoPlay
        loop={true}
        style={styles.checkAnimation}
      />
      <Text style={styles.successText}>Success!</Text>
      <Text style={styles.successSubtext}>Your dryer is successfully paired</Text>
      <Image 
        source={require("../../assets/images/solo.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => router.push('/(protected)/(tabs)')} style={styles.button}><Ionicons name="home" size={20} color={"#fff"}/><Text style={styles.buttonText}>Back to home</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: "#fff",
    width: '100%',
    height: '100%',
  },
  checkAnimation: {
    marginTop: 100,
    width: 150,
    height: 150,
  },

  successText: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 26
  },

  successSubtext: {
    fontSize: 14,
    color: '#000',
    marginBottom: 60
  },

  image: {
    marginRight: 60,
    width: 300,
    height: 300
  },
  
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 50,
    backgroundColor: '#FF5500',
    borderRadius: 10,
    marginTop: 60
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    marginLeft: 13
  }
  
});

export default DryerAddConfirmationPage;
