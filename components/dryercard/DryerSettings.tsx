import React, { useState, useRef } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Slider } from "@react-native-assets/slider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import SwitchToggle from "react-native-switch-toggle";

interface DryerSettingsProps {
  name: string;
}

const DryerSettings: React.FC<DryerSettingsProps> = ({ name }) => {
  const [sleepMode, setSleepMode] = useState(false);
  const [brightness, setBrightness] = useState(75);
  const [enableSounds, setEnableSounds] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }, [])
  );

  const handleBackPress = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
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
            <Ionicons
              name="terminal-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.sectionTitle}>Firmware</Text>
          </View>

          <View style={styles.versionRow}>
            <Text style={styles.versionLabel}>Current version</Text>
            <View style={styles.versionTagWhite}>
              <Text style={styles.versionTextBlack}>1.2.3</Text>
            </View>
          </View>

          <View style={styles.versionRow}>
            <View>
              <Text style={styles.versionLabel}>Latest version</Text>
              <Text style={[styles.caption, { marginTop: 4 }]}>
                Available for download
              </Text>
            </View>
            <View style={styles.versionTagPurple}>
              <Text style={styles.versionTextWhite}>1.2.4</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.updateButton}>
            <View style={styles.updateButtonContent}>
              <Ionicons
                name="share-outline"
                size={20}
                color="white"
                style={styles.updateIcon}
              />
              <Text style={styles.updateButtonText}>Update '{name}'</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Display Settings */}
        <View style={styles.section}>
          <View style={styles.headerRow}>
            <Ionicons
              name="tv-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.sectionTitle}>Display Settings</Text>
          </View>
          <View style={[styles.row, { marginVertical: 6 }]}>
            <View>
              <Text style={styles.text}>Sleep mode after 5 minutes</Text>
              <Text style={styles.caption}>
                Display automatically turns off after inactivity
              </Text>
            </View>
            <SwitchToggle
              switchOn={sleepMode}
              onPress={() => setSleepMode(!sleepMode)}
              circleColorOff="#fff"
              circleColorOn="#fff"
              backgroundColorOn="black"
              backgroundColorOff="#E7E7E7"
              containerStyle={{
                width: 52,
                height: 30,
                borderRadius: 30,
                padding: 3,
              }}
              circleStyle={{
                width: 23,
                height: 23,
                borderRadius: 11,
                marginLeft: -4,
              }}
            />
          </View>

          <View style={styles.divider} />

          <View style={[styles.brightnessContainer, { marginTop: 6 }]}>
            <View style={styles.brightnessLabelRow}>
              <Text style={styles.text}>Brightness</Text>
              <Text style={styles.brightnessPercent}>{brightness}%</Text>
            </View>
            <Slider
              value={brightness}
              onValueChange={setBrightness}
              minimumValue={0}
              maximumValue={100}
              step={1}
              thumbSize={25}
              trackHeight={15}
              thumbTintColor="#5D5D5D"
              minimumTrackTintColor="#5D5D5D"
              maximumTrackTintColor="#E7E7E7"
              thumbStyle={{
                borderWidth: 3,
                borderColor: "#5D5D5D",
                backgroundColor: "#FFFFFF",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 3,
              }}
            />
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.turnOffButton}>
            <Text style={styles.turnOffButtonText}>Turn off display</Text>
          </TouchableOpacity>
          <Text style={styles.caption}>Turns off the display immediately</Text>
        </View>

        {/* Sound Settings */}
        <View style={styles.section}>
          <View style={styles.headerRow}>
            <Ionicons
              name="volume-high-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.sectionTitle}>Sound Settings</Text>
          </View>
          <View style={[styles.row, { marginVertical: 6 }]}>
            <View>
              <Text style={styles.text}>Enable sounds</Text>
              <Text style={styles.caption}>
                Beeps for notifications and warnings
              </Text>
            </View>
            <SwitchToggle
              switchOn={enableSounds}
              onPress={() => setEnableSounds(!enableSounds)}
              circleColorOff="#fff"
              circleColorOn="#fff"
              backgroundColorOn="black"
              backgroundColorOff="#E7E7E7"
              containerStyle={{
                width: 52,
                height: 30,
                borderRadius: 30,
                padding: 3,
              }}
              circleStyle={{
                width: 23,
                height: 23,
                borderRadius: 11,
                marginLeft: -4,
              }}
            />
          </View>
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
    paddingTop: 35,
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
    marginBottom: 6,
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
  brightnessLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  brightnessPercent: {
    fontSize: 14,
    color: "#888",
    fontFamily: "Satoshi-Light",
  },
  text: {
    fontFamily: "Satoshi-Medium",
    fontSize: 14,
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
    backgroundColor: "#723BFF",
    borderWidth: 1,
    borderColor: "#723BFF",
  },
  versionTextWhite: {
    color: "#fff",
    fontFamily: "Satoshi-Medium",
    fontSize: 13,
  },
  updateButton: {
    marginTop: 12,
    backgroundColor: "#723BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
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
    fontSize: 14,
    fontFamily: "Satoshi-Medium",
  },
  turnOffButton: {
    marginTop: 12,
    backgroundColor: "#FF5500",
    padding: 12,
    borderRadius: 24,
    alignItems: "center",
  },
  turnOffButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Satoshi-Medium",
  },
  slider: {
    width: "100%",
    height: 80,
  },
  brightnessContainer: {},
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 10,
  },
});

export default DryerSettings;
