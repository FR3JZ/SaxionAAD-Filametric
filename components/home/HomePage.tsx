import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DryerCard from "./DryerCard";

const dryers = [
  { name: "Dryer 1", status: "Completed", type: "Solo" },
  { name: "Dryer 2", status: "Running", type: "Solo" },
  { name: "Dryer 3", status: "Paused", type: "Solo" },
];

const HomePage = () => {
  const [expandedDryer, setExpandedDryer] = useState<string | null>(null);
  const [collapsingDryer, setCollapsingDryer] = useState<string | null>(null);

  const handleToggle = (dryerName: string) => {
    if (expandedDryer === dryerName) {
      // Start collapse animation
      setCollapsingDryer(dryerName);
      setExpandedDryer(null);
    } else {
      // Expand new one
      setExpandedDryer(dryerName);
      setCollapsingDryer(null);
    }
  };

  return (
    <ScrollView>
      <View style={styles.title}>
        <Text style={styles.titleText}>Dryers</Text>
      </View>

      {dryers.map((dryer, index) => {
        const isExpanded = expandedDryer === dryer.name;
        const isCollapsing = collapsingDryer === dryer.name;

        // Hide all non-expanded/collapsing cards while any animation is in progress
        if (!isExpanded && !isCollapsing && (expandedDryer || collapsingDryer)) {
          return null;
        }

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
            isExpanded={isExpanded}
            onToggleExpand={() => handleToggle(dryer.name)}
            onCollapseComplete={() => setCollapsingDryer(null)}
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
});

export default HomePage;
