import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FilametricSlider from "./FilametricSlider";

interface LabeledSliderRowProps {
  title: string;
  value: number;
  onChange: (val: number) => void;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
}

const LabeledSliderRow: React.FC<LabeledSliderRowProps> = ({
  title,
  value,
  onChange,
  unit = "%",
  min,
  max,
  step,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{title}</Text>
        <Text style={styles.value}>
          {value}
          {unit}
        </Text>
      </View>
      <FilametricSlider
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontFamily: "Satoshi-Medium",
    fontSize: 16,
  },
  value: {
    fontFamily: "Satoshi-Light",
    fontSize: 16,
    color: "#888",
  },
});

export default LabeledSliderRow;
