import DangerZoneCard from "@/components/UserProfile/DangerZoneCard";
import PersonalInformationCard from "@/components/UserProfile/PersonalInformationCard";
import UserProfileHeader from "@/components/UserProfile/UserProfileHeader";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function() {
    return (
        <ScrollView>
            <UserProfileHeader/>
            <View style={styles.container}>
                <PersonalInformationCard/>
                <DangerZoneCard/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignSelf: 'center',
        paddingVertical: 8
    },
})