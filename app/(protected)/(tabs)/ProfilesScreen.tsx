import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Profiles() {
  return (
    <View style={styles.container}>
      <Text>Profiles</Text>
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
