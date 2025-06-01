import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AddInput from "./AddInput";

const DryerAddPage = () => {
  const params = useLocalSearchParams();

  const [dryerName, setDryerName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      setDryerName("");
      setLocation("");
      setDescription("");
    }, [])
  );

  function addDryer() {

    router.push('/(protected)/(dryer-add)/AddDryerConfirmationScreen');
  }

  return (
    <View style={styles.container}>
      <View style={styles.dryerInfoContainer}>
        <View style={styles.dryerInfoTitle}><Ionicons name="information-circle-outline" size={25} color={'#000'} style={styles.dryerInfoIcon}/><Text style={styles.dryerInfoTitleText}>Dryer Information</Text></View>
        <View style={styles.dryerInfoInputs}>
          <Text style={styles.dryerInfoInputTitle}>Dryer Name *</Text>
          <AddInput placeholder="E.g. Solo Unit #3" value={dryerName} onChangeText={setDryerName}></AddInput>
          <Text style={styles.dryerInfoInputTitle}>Location</Text>
          <AddInput placeholder="E.g. Workshop" value={location} onChangeText={setLocation}></AddInput>
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
          <TouchableOpacity onPress={() => router.push('/(protected)/(tabs)')} style={[styles.button, styles.cancelButton]}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity>
          <TouchableOpacity onPress={addDryer} style={[styles.button, styles.addButton]}><Ionicons name="add" size={30} color={'#fff'}/><Text style={styles.buttonText}>Add Dryer</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#fff',
  },

  dryerInfoContainer: {
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 20,
    width: '85%',
    height: 500
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
    backgroundColor: '#FF5500',
  },

  buttonText: {
    color: '#fff',
    fontFamily: 'Satoshi-Medium',
    fontSize: 16
  }


});

export default DryerAddPage