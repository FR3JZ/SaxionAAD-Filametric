import { Ionicons } from "@expo/vector-icons";
import { router, UnknownOutputParams, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AddInput from "./AddInput";
import ErrorMessageText from "../error-handling/ErrorMessageText";

const DryerAddPage = () => {
  const params:UnknownOutputParams = useLocalSearchParams();

  const [dryerName, setDryerName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dryerNameError, setDryerNameError] = useState<string>("");

  // Clears form state every time screen is focused
  useFocusEffect(
    useCallback(() => {
      setDryerName("");
      setLocation("");
      setDescription("");
    }, [])
  );

  // Called when user taps "Add Dryer" button
  function addDryer() {
    if(dryerHasValidName()) {
      // Proceed to confirmation screen if validation passes
      router.push('/(protected)/(dryer-add)/AddDryerConfirmationScreen');
    }
  }

  // Simple validation: name must not be empty
  function dryerHasValidName(): boolean {
    if (dryerName.length < 1) {
      setDryerNameError("Please enter a name for the dryer");
      return false;
    }
    setDryerNameError("");
    return true;
  }

  return (
    <View style={styles.container}>
      <View style={styles.dryerInfoContainer}>
        <View style={styles.dryerInfoTitle}>
          <Ionicons name="information-circle-outline" size={25} color={'#000'} style={styles.dryerInfoIcon}/>
          <Text style={styles.dryerInfoTitleText}>Dryer Information</Text>
        </View>

        <View style={styles.dryerInfoInputs}>
          {/* Required input */}
          <Text style={styles.dryerInfoInputTitle}>Dryer Name *</Text>
          <AddInput placeholder="E.g. Solo Unit #3" value={dryerName} onChangeText={setDryerName} />
          <ErrorMessageText message={dryerNameError} />

          <Text style={styles.dryerInfoInputTitle}>Location</Text>
          <AddInput placeholder="E.g. Workshop" value={location} onChangeText={setLocation} />

          <Text style={styles.dryerInfoInputTitle}>Description</Text>
          <TextInput 
            style={styles.dryerInfoDescriptionInput}
            multiline={true}
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            placeholder="Additional information"
            placeholderTextColor={'#888888'}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.buttons}>
          {/* Cancel returns to tabs screen without saving */}
          <TouchableOpacity 
            onPress={() => router.push('/(protected)/(tabs)')} 
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          {/* Add button triggers validation and routing */}
          <TouchableOpacity onPress={addDryer} style={[styles.button, styles.addButton]}>
            <Ionicons name="add" size={30} color={'#fff'} />
            <Text style={styles.buttonText}>Add Dryer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

// Styling
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: "#F9F9F9"
  },
  dryerInfoContainer: {
    borderRadius: 20,
    width: '85%',
    height: 500,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3
  },
  dryerInfoTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20
  },
  dryerInfoIcon: {
    marginRight: 10,
    marginTop: 2
  },
  dryerInfoTitleText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 22
  },
  dryerInfoInputs: {
    marginTop: 20,
    marginLeft: 20
  },
  dryerInfoInputTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 17,
    marginBottom: 10
  },
  dryerInfoDescriptionInput: {
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 10,
    width: '93%',
    height: 100,
    padding: 10,
    fontFamily: 'Satoshi-Regular',
    fontSize: 17
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20
  },
  cancelButton: {
    paddingHorizontal: 42,
    backgroundColor: '#5D5D5D'
  },
  addButton: {
    backgroundColor: '#00C03B'
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Satoshi-Medium',
    fontSize: 16
  }
});

export default DryerAddPage;
