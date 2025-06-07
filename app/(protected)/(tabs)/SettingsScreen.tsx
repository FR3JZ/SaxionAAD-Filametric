import { AuthContext } from '@/context/authContext';
import React, { useContext } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

export default function Settings() {
  const auth = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Pressable onPress={auth.logOut}>
        <Text>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  },
});

