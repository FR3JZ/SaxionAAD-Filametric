import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface DryerInfoBlockProps {
  iconName: keyof typeof Ionicons.glyphMap;
  value: string;
  subValue?: string;
  iconColor?: string;
}

const DryerInfoBlock: React.FC<DryerInfoBlockProps> = ({
  iconName,
  value,
  subValue,
  iconColor = '#5D5D5D',
}) => {
  return (
    <View style={styles.infoBlock}>
      <Ionicons name={iconName} size={24} style={[styles.icon, { color: iconColor }]} />
      <View>
        <Text style={styles.infoText}>{value}</Text>
        {subValue && <Text style={styles.subInfoText}>{subValue}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 4,
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
  },
  infoText: {
    fontSize: 18,
    fontFamily: 'Satoshi-Medium',
    lineHeight: 22,
  },
  subInfoText: {
    fontSize: 13,
    fontFamily: 'Satoshi-Regular',
    color: '#666',
    lineHeight: 18,
  },
});

export default DryerInfoBlock;
