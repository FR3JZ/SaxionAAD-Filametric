import React from 'react';
import SwitchToggle from 'react-native-switch-toggle';

interface FilametricSwitchProps {
  value: boolean;
  onChange: (val: boolean) => void;
}

const FilametricSwitch: React.FC<FilametricSwitchProps> = ({ value, onChange }) => {
  return (
    <SwitchToggle
      switchOn={value}
      onPress={() => onChange(!value)}
      circleColorOff="#fff"
      circleColorOn="#fff"
      backgroundColorOn="black"
      backgroundColorOff="#E7E7E7"
      containerStyle={{
        width: 52,
        height: 30,
        borderRadius: 30,
        padding: 3,
      }}
      circleStyle={{
        width: 23,
        height: 23,
        borderRadius: 11,
        marginLeft: -4,
      }}
    />
  );
};

export default FilametricSwitch;
