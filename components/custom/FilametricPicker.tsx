import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

interface Option {
  label: string;
  value: string;
}

interface FilametricPickerProps {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: Option[];
}

const FilametricPicker: React.FC<FilametricPickerProps> = ({
  label,
  selectedValue,
  onValueChange,
  options,
}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={options}
        value={selectedValue}
        useNativeAndroidPickerStyle={false}
        style={pickerSelectStyles}
        placeholder={{ label: 'Select an option...', value: null }}
        Icon={() => (
          <Ionicons name="chevron-down-outline" size={20} color="#555" />
        )}
      />
    </View>
  );
};

export default FilametricPicker;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontFamily: 'Satoshi-Medium',
    color: '#000',
    marginBottom: 6,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 48,
    borderRadius: 10,
    borderColor: '#CFCFCF',
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 15,
    fontFamily: 'Satoshi-Medium',
    color: '#000',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  inputAndroid: {
    height: 48,
    borderRadius: 10,
    borderColor: '#CFCFCF',
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 15,
    fontFamily: 'Satoshi-Medium',
    color: '#000',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  placeholder: {
    color: '#888',
  },
  iconContainer: {
    top: 14,
    right: 12,
  },
});
