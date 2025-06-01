import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  name: string;
  status: "Completed" | "Paused" | "Running";
}

const DryerHeader: React.FC<Props> = ({ name, status }) => {
  const getStatusColors = (status: Props['status']) => {
    switch (status) {
      case "Completed":
        return { textAndBorder: '#00C03B', background: '#D5FFE4' };
      case "Paused":
        return { textAndBorder: '#F6B900', background: '#FFF8DC' };
      case "Running":
      default:
        return { textAndBorder: '#006BAB', background: '#DEF2FF' };
    }
  };

  const { textAndBorder, background } = getStatusColors(status);

  return (
    <View style={styles.titleBlock}>
      <Text style={styles.title}>{name}</Text>
      <View style={[styles.statusTag, { backgroundColor: background, borderColor: textAndBorder }]}>
        <Text style={[styles.statusText, { color: textAndBorder }]}>{status.toUpperCase()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Satoshi-Medium',
    marginRight: 8,
  },
  statusTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 11,
    fontFamily: 'Satoshi-Bold',
  },
});

export default DryerHeader;
