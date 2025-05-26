import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DryingProfile } from './../../constants/Objects';

const ProfilePage = ({profile}: {profile: DryingProfile | null}) => {
    return (
        <View>
            <Text>{profile!.ID}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  },
});

export default ProfilePage;
