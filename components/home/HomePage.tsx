import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DryerCard from "./DryerCard";
import { useDryerWebSocket } from "../../hooks/useDryerWebSocket";

const HomePage = () => {
  const { dryerMap } = useDryerWebSocket();
  const [expandedDryer, setExpandedDryer] = useState<string | null>(null);
  const [collapsingDryer, setCollapsingDryer] = useState<string | null>(null);

  const handleToggle = (dryerName: string) => {
    if (expandedDryer === dryerName) {
      setCollapsingDryer(dryerName);
      setExpandedDryer(null);
    } else {
      setExpandedDryer(dryerName);
      setCollapsingDryer(null);
    }
  };

  return (
    <ScrollView>
      <View style={styles.title}>
        <Text style={styles.titleText}>Dryers</Text>
      </View>

      {Object.values(dryerMap)
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((dryer) => {
          const isExpanded = expandedDryer === dryer.serial;
          const isCollapsing = collapsingDryer === dryer.serial;
          if (!isExpanded && !isCollapsing && (expandedDryer || collapsingDryer)) {
            return null;
          }

        return (
          <DryerCard
            key={dryer.serial}
            name={dryer.serial}
            status={dryer.status || "Completed"}
            type={"Solo"}
            targetTemp={dryer.targetTemp}
              actualTemp={dryer.temperature}
              humidity={`${dryer.humidity}%`}
              timeRemaining={dryer.timeRemaining || 0}
              totalTime={dryer.totalTime}
            isExpanded={isExpanded}
            onToggleExpand={() => handleToggle(dryer.serial)}
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
