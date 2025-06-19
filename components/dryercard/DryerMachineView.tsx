import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type DryerMachineType = 'Solo' | 'Duo';

interface DryerMachineViewProps {
  type: DryerMachineType;
  onLeftAction?: () => void;
  onRightAction?: () => void;
}

const dryerImages: Record<DryerMachineType, any> = {
  Solo: require('../../assets/images/solo.png'),
  Duo: require('../../assets/images/duo.png'),
};

const DryerMachineView: React.FC<DryerMachineViewProps> = ({
  type,
  onLeftAction,
  onRightAction,
}) => {
  const imageSource = dryerImages[type];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftButton} onPress={onLeftAction}>
        <Ionicons name="settings-outline" size={24} color="#5D5D5D" />
      </TouchableOpacity>

      <Image source={imageSource} style={styles.machineImage} resizeMode="contain" />

      <TouchableOpacity style={styles.rightButton} onPress={onRightAction}>
        <Ionicons name="options-outline" size={24} color="#5D5D5D" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  leftButton: {
    backgroundColor: '#F1F3F6',
    borderRadius: 12,
    padding: 12,
    marginRight: -15, 
  },
  rightButton: {
    backgroundColor: '#F1F3F6',
    borderRadius: 12,
    padding: 12,
    marginLeft: 5,
  },
  machineImage: {
    width: 220,
    height: 220,
  },
});

export default DryerMachineView;
