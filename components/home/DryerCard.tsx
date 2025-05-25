import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";
import DryerCardButtons from "./dryerCardButtons"; // Adjust path as needed

export type DryerStatus = "Offline" | "Drying" | "Idle";

export interface DryerCardProps {
  name: string;
  status: DryerStatus;
  type: string;
  targetTemp?: number;
  actualTemp?: number;
  progress?: number;
  timeRemaining?: string;
}

const DryerCard: React.FC<DryerCardProps> = ({
  name,
  status,
  type,
  targetTemp,
  actualTemp,
  progress = 0,
  timeRemaining = "",
}) => {
  const statusStyle = styles[`statusTag__${status}` as `statusTag__${DryerStatus}`] as TextStyle;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}: {type}</Text>
        <Text style={[styles.statusTag, statusStyle]}>{status}</Text>
      </View>

      {status === "Drying" && (
        <>
          <View style={styles.tempBox}>
            <Text style={styles.tempText}>Target: {targetTemp}°C</Text>
            <Text style={styles.tempText}>Actual: {actualTemp}°C</Text>
          </View>

          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            <Text style={styles.progressText}>{progress}%</Text>
          </View>

          <Text style={styles.remainingText}>{timeRemaining} Remaining</Text>
        </>
      )}

      <DryerCardButtons
        name={name}
        status={status}
        type={type}
        targetTemp={targetTemp}
        actualTemp={actualTemp}
        progress={progress}
        timeRemaining={timeRemaining}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f3f3f3",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  statusTag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    color: "white",
    fontWeight: "600",
    fontSize: 12,
    overflow: "hidden",
  },
  statusTag__Offline: {
    backgroundColor: "#e53935",
  },
  statusTag__Drying: {
    backgroundColor: "#43a047",
  },
  statusTag__Idle: {
    backgroundColor: "#66bb6a",
  },
  tempBox: {
    backgroundColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    justifyContent: "flex-start",
  },
  progressBarBackground: {
    backgroundColor: "#ccc",
    height: 22,
    borderRadius: 11,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBarFill: {
    backgroundColor: "#43a047",
    height: "100%",
  },
  progressText: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    color: "black",
    fontWeight: "700",
    fontSize: 14,
    top: 0,
    bottom: 0,
    lineHeight: 22,
  },
  remainingText: {
    textAlign: "center",
    fontSize: 13,
    marginBottom: 14,
    fontWeight: "500",
  },
  tempText: {
    marginBottom: 6,
  },
});

export default DryerCard;
