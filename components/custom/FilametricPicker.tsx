import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor="#555" 
          mode="dropdown"
        >
          {options.map((opt) => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 48,
    paddingLeft: 12,
  },
  picker: {
    height: 55,
    fontSize: 15,
    fontFamily: 'Satoshi-Medium',
    color: '#000',
    width: '100%',
  },
});
