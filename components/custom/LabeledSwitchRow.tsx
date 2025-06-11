import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FilametricSwitch from './FilametricSwitch';

interface LabeledSwitchRowProps {
  title: string;
  description: string;
  value: boolean;
  onChange: (val: boolean) => void;
}

const LabeledSwitchRow: React.FC<LabeledSwitchRowProps> = ({
  title,
  description,
  value,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <FilametricSwitch value={value} onChange={onChange} />
    </View>
  );
};

export default LabeledSwitchRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: "Satoshi-Medium",
  },
  description: {
    fontSize: 13,
    marginTop: 2,
    fontFamily: "Satoshi-Light",
    color: "#888",
  },
});
