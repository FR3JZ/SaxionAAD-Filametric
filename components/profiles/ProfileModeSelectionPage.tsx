import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import ProfileModeCard from "./ProfileModeCard";
import { getSavedMode } from "@/stores/modeStore";
import { useFocusEffect } from "expo-router";

const ProfileModeSelectionPage = ({ dryerId, profileId }: { dryerId: string, profileId: string }) => {
  
  const [selected, setSelected] = useState<string>("normal");

  const getCurrentMode = async() => {
    const currentMode = await getSavedMode(dryerId, profileId)
    if(currentMode !== null) {
      setSelected(currentMode);
    }
  }

  useFocusEffect(
    useCallback(() => { 
      getCurrentMode();
    }, [])
  )

  return (
    <View style={styles.container}>
      <ProfileModeCard
        title="Normal Mode"
        mode="normal"
        icon={require("../../assets/images/normal_mode_icon.png")}
        shortDescription="Optimized for efficient filament drying with standard settings"
        longDescription="Normal mode uses balanced temperature and fan speed to efficiently prepare your filament for printing. This mode provides reliable drying performance for most filament types and is recommended for routine drying needs. Ideal when you want consistent results without noise concerns."
        selected={selected}
        setSelected={setSelected}
        dryerId={dryerId}
        profileId={profileId}
      />

      <ProfileModeCard
        title="Silent Mode"
        mode="silent"
        icon={require("../../assets/images/silent_mode_icon.png")}
        shortDescription="Minimizes noise while drying filament"
        longDescription="Silent Mode operates with reduced fan speed to minimize noise while still effectively 
        drying your filament. This mode takes longer to complete but creates a much quieter environment. 
        Perfect for overnight drying sessions or when working in noise-sensitive areas like offices or shared spaces."
        selected={selected}
        setSelected={setSelected}
        dryerId={dryerId}
        profileId={profileId}
      />

      <ProfileModeCard
        title="Storage Mode"
        mode="storage"
        icon={require("../../assets/images/storage_mode_icon.png")}
        shortDescription="Keeps filament dry over longer periods"
        longDescription="Storage Mode is designed for long-term filament preservation. It maintains a consistent, 
        gentle temperature indefinitely to keep your filament dry and ready for use. This mode operates quietly by
        default and automatically continues until manually stopped. Ideal for storing opened filament spools or preparing 
        for extended periods between prints."
        selected={selected}
        setSelected={setSelected}
        dryerId={dryerId}
        profileId={profileId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
});

export default ProfileModeSelectionPage;
