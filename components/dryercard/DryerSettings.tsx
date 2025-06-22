import React, { useState, useRef } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import LabeledSwitchRow from "../custom/LabeledSwitchRow";
import LabeledSliderRow from "../custom/LabeledSliderRow";

interface DryerSettingsProps {
  name: string;
}

const DryerSettings: React.FC<DryerSettingsProps> = ({ name }) => {
  // State variables for toggles and slider
  const [sleepMode, setSleepMode] = useState(false);
  const [brightness, setBrightness] = useState(75);
  const [enableSounds, setEnableSounds] = useState(false);
  const [autoUpdateFirmware, setAutoUpdateFirmware] = useState(false);

  // Animation value for fade in/out
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animate fade in when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, [])
  );

  // Animate fade out before navigating back
  const handleBackPress = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      router.back();
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={25} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Settings</Text>
        </View>

        {/* Firmware Section */}
        <View style={styles.section}>
          <View style={styles.headerRow}>
            <Ionicons name="terminal-outline" size={24} color="black" style={styles.icon} />
            <Text style={styles.sectionTitle}>Firmware</Text>
          </View>
          <LabeledSwitchRow
            title="Auto update new firmware"
            description="Automatically search and push firmware updates to your dryer(s)"
            value={autoUpdateFirmware}
            onChange={(val) => {
              setAutoUpdateFirmware(val);
            }}
          />

          {/* Version Info */}
          <View style={styles.versionRow}>
            <Text style={styles.versionLabel}>Current version</Text>
            <View style={styles.versionTagWhite}>
              <Text style={styles.versionTextBlack}>1.2.3</Text>
            </View>
          </View>

          <View style={styles.versionRow}>
            <View>
              <Text style={styles.versionLabel}>Latest version</Text>
              <Text style={[styles.caption, { marginTop: 4 }]}>Available for download</Text>
            </View>
            <View style={styles.versionTagPurple}>
              <Text style={styles.versionTextWhite}>1.2.4</Text>
            </View>
          </View>

          {/* Update Button */}
          <TouchableOpacity style={styles.updateButton}>
            <View style={styles.updateButtonContent}>
              <Ionicons name="share-outline" size={20} color="white" style={styles.updateIcon} />
              <Text style={styles.updateButtonText}>Update '{name}'</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Device Settings */}
        <View style={styles.section}>
          <View style={styles.headerRow}>
            <Ionicons name="tv-outline" size={24} color="black" style={styles.icon} />
            <Text style={styles.sectionTitle}>Device Settings</Text>
          </View>

          <LabeledSwitchRow
            title="Device sounds"
            description="Sounds from the dryer for reminders, notifications and warnings"
            value={enableSounds}
            onChange={(val) => {
              setEnableSounds(val);
            }}
          />

          <View style={styles.divider} />

          <View style={styles.row}>
            <LabeledSwitchRow
              title="Display sleep after 5 minutes"
              description="Automatically turns off the display after 5 minutes inactivity"
              value={sleepMode}
              onChange={(val) => {
                setSleepMode(val);
              }}
            />
          </View>

          <LabeledSliderRow
            title="Display brightness"
            value={brightness}
            onChange={setBrightness}
          />

          {/* Display Off Button */}
          <TouchableOpacity style={styles.turnOffButton}>
            <Text style={styles.turnOffButtonText}>Turn off display</Text>
          </TouchableOpacity>
          <Text style={styles.caption}>Immediately turns off the dryer's display</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
    paddingTop: 30,
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    flex: 1,
    marginRight: 24,
    fontFamily: "Satoshi-Bold",
  },
  section: {
    marginBottom: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
  },
  sectionTitle: {
    fontFamily: "Satoshi-Medium",
    fontSize: 19,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  caption: {
    marginTop: 6,
    fontSize: 13,
    color: "#888",
    fontFamily: "Satoshi-Light",
  },
  versionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  versionLabel: {
    fontFamily: "Satoshi-Medium",
    fontSize: 14,
  },
  versionTagWhite: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#B0B0B0",
  },
  versionTextBlack: {
    color: "#000",
    fontFamily: "Satoshi-Medium",
    fontSize: 13,
  },
  versionTagPurple: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: "#00C03B",
    borderWidth: 1,
    borderColor: "#00C03B",
  },
  versionTextWhite: {
    color: "#fff",
    fontFamily: "Satoshi-Medium",
    fontSize: 13,
  },
  updateButton: {
    marginTop: 12,
    backgroundColor: "#00C03B",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  updateButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  updateIcon: {
    marginRight: 8,
  },
  updateButtonText: {
    color: "white",
    fontSize: 17,
    fontFamily: "Satoshi-Medium",
  },
  turnOffButton: {
    marginTop: 2,
    backgroundColor: "#723BFF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  turnOffButtonText: {
    color: "white",
    fontSize: 17,
    fontFamily: "Satoshi-Medium",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginTop: 5,
  },
});


export default DryerSettings;
