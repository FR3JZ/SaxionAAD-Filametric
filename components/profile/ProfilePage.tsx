import React from 'react';
import { StyleSheet, View, Text, Pressable, TouchableOpacity } from 'react-native';
import { DryingProfile } from './../../constants/Objects';

const ProfilePage = ({profile}: {profile: DryingProfile | null}) => {
    return (
        <View>
            <View style={styles.title}>
              <Text style={styles.titleText}>{profile!.Name}</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.dataText}>Mode: {profile!.Mode}</Text>
              <Text style={styles.dataText}>Target temperature: {profile!.Target_temperature} C°</Text>
              <Text style={styles.dataText}>Time: {profile!.Target_duration} minutes</Text>
              {profile!.Storage_temperature > 0 && <Text style={styles.dataText}>Storage temperature: {profile!.Storage_temperature}</Text>}
            </View>
            {profile!.Customizable && 
              <View style={styles.editButtons}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Add to dryer(s)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  titleText: {
    fontSize: 23
  },

  data: {
    marginLeft: 40,
    marginTop: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },

  dataText: {
    fontSize: 19,
    padding: 10
  },

  editButtons: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    margin: 10,
    backgroundColor: '#D9D9D9',
    width: 200,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    fontSize: 19
  }
  
});

export default ProfilePage;
