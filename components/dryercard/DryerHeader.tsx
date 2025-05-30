import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  name: string;
  status: "Completed" | "Paused" | "Running";
}

const DryerHeader: React.FC<Props> = ({ name, status }) => {
  const statusColor =
    status === "Completed" ? '#24d69f' :
    status === "Paused" ? '#FFD966' :
    '#FFA726';

  return (
    <View style={styles.titleBlock}>
      <Text style={styles.title}>{name}</Text>
      <View style={[styles.statusTag, { backgroundColor: statusColor }]}>
        <Text style={styles.statusText}>{status.toUpperCase()}</Text>
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
    marginRight: 10,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 13,
    fontFamily: 'Satoshi-Bold',
    color: 'white'
  },
});

export default DryerHeader;
