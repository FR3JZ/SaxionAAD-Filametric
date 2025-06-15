import ProfileModeSelectionPage from "@/components/profiles/ProfileModeSelectionPage";
import ProfilePageHeader from "@/components/profiles/ProfilePageHeader";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";


const SelectProfileModeScreen = () => {
    const params = useLocalSearchParams();
    return (
        <View style={styles.container}>
            <ProfilePageHeader backArrow={true} title="Select Mode"></ProfilePageHeader>
            <ProfileModeSelectionPage dryerId={params.dryerId as string} profileId={params.profileId as string}></ProfileModeSelectionPage>
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
export default SelectProfileModeScreen;