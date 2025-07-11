import ProfileOverviewPage from "@/components/profiles/ProfileOverviewPage";
import ProfilePageHeader from "@/components/profiles/ProfilePageHeader";
import { UnknownOutputParams, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";


const SelectProfileScreen = () => {
    const params:UnknownOutputParams = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <ProfilePageHeader backArrow={true} title="Select Profile"></ProfilePageHeader>
            <ProfileOverviewPage dryerId={params.dryerId as string} selection={true}></ProfileOverviewPage>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: "#F9F9F9",
      display: 'flex',
      alignItems: 'center'
    },
  });
export default SelectProfileScreen;