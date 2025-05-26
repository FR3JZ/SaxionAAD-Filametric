import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DryingProfile } from './../../constants/Objects';

const ProfilePage = ({profile}: {profile: DryingProfile | null}) => {
    return (
        <View>
            <View style={styles.title}>
              <Text style={styles.titleText}>{profile!.Name}</Text>
            </View>
            <View style={styles.data}>

            </View>
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
    
  }
  
});

export default ProfilePage;
