import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import DryerCard from "./DryerCard";
import { router } from "expo-router";

const dryers = [
  {
    name: "Dryer 1",
    status: "Completed",
    type: "Solo",
  },
  {
    name: "Dryer 2",
    status: "Running",
    type: "Solo",
  },
  {
    name: "Dryer 3",
    status: "Paused",
    type: "Solo",
  },
];

const HomePage = () => {
  const [expandedDryer, setExpandedDryer] = useState<string | null>(null);

  return (
    <ScrollView>
      {!expandedDryer && (
        <View style={styles.title}>
          <Text style={styles.titleText}>Dryers</Text>
          <Pressable
            style={styles.addButton}
            onPress={() => router.push("/(protected)/(tabs)/AddDryerScreen")}
          >
            <Text>+</Text>
          </Pressable>
        </View>
      )}

      {dryers.map((dryer, index) => {
        const isExpanded = expandedDryer === dryer.name;
        if (expandedDryer && !isExpanded) return null;

        return (
          <DryerCard
            key={index}
            name={dryer.name}
            status={dryer.status as any}
            type={dryer.type as any}
            targetTemp={75}
            actualTemp={73}
            progress={75}
            timeRemaining="25min"
            currentProfile="My Profile 1"
            isExpanded={isExpanded}
            onToggleExpand={() =>
              setExpandedDryer(isExpanded ? null : dryer.name)
            }
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    marginTop: 10,
  },
  titleText: {
    fontSize: 23,
    marginLeft: 10,
    marginBottom: 10,
    fontFamily: "Satoshi-Bold",
  },
  addButton: {
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
    width: 30,
    marginBottom: 5,
    marginRight: 10,
  },
});

export default HomePage;
