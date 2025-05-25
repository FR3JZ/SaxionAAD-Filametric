import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DryerAddInput from  './DryerAddInput';
import QRScanner from './QRScanner';
import { router, useFocusEffect } from 'expo-router';


export default function DryerAddPage() {
    const minNameLength = 2;
    const minLocationLength = 2;
    const maxNameLength = 100;
    const maxLocationLength = 150;

    const [qrData, setQRData] = useState<string | null>(null);
    const [dryerName, setDryerName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useFocusEffect(
      useCallback(() => {
        setQRData(null);
        setDryerName('');
        setLocation('');
        setError(null);
      }, [])
    );

    const checkLimits = (minLength : number, maxLength : number, value : number, name: string) => {
      if(value < minLength) {
        setError(`${name} should be atleast ${minLength} characters long`);
      } else if(value > maxLength) {
        setError(`${name} can not be longer than ${maxLength} characters`);
      } else {
        setError(null);
        return true;
      }

      return false;
      
    }

    const addDryer = () => {
      if(checkLimits(minNameLength, maxNameLength, dryerName.length, "Dryer name") &&
         checkLimits(minLocationLength, maxLocationLength, location.length, "Location")) 
      {
        router.push('/');
      }
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <Text style={styles.titleText}>Add dryer</Text>
                <QRScanner onScanData={setQRData}></QRScanner>
                {qrData && <Text>Scanned QR: {qrData}</Text>}
                <Text style={styles.descriptionText}>Scan QR to add dryer</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.input}>
                        <DryerAddInput placeholder="Dryer name" value={dryerName} onChangeText={setDryerName}></DryerAddInput>
                    </View>
                    <View style={styles.input}>
                        <DryerAddInput placeholder="Dryer location" value={location} onChangeText={setLocation}></DryerAddInput>
                    </View>
                </View>
                <Pressable style={styles.addButton} onPress={addDryer}>
                  <Text style={styles.addButtonText}>Add</Text>
                </Pressable>
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff"
  },

  itemContainer: {
    marginLeft: 10
  },

  titleText: {
    fontSize: 23,
    marginTop: 5 
  },
  
  descriptionText: {
    marginTop: 10
  },

  inputContainer: {
    marginTop: 50   
  },

  input: {
    marginBottom: 15
  },

  addButton: {
    backgroundColor: '#D9D9D9',
    width: 200,
    height: 40,
    alignSelf: 'center',
    marginRight: 10,
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  addButtonText: {
    fontSize: 20
  },

  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
    marginRight: 10
  }
});
