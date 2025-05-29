import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import AddInput from '../dryer-add/AddInput';
import { useFocusEffect } from 'expo-router';

const AddProfilePage = () => {
  const modes = [
    { name: 'test', id: 'd779451e-62c9-48c5-aab2-71f5451f537e'},
    { name: 'test2', id: 'a74ba26b-6159-4937-863c-ea5304099fc2'}
  ]

  const [name, setName] = useState<string>('');
  const [targetTemp, setTargetTemp] = useState<string>('');
  const [targetTimeDuration, setTargetTimeDuration] = useState<string>('');
  const [storageModeTemp, setStorageModeTemp] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<string>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [switchStorage, setSwitchStorage] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setName('');
      setTargetTemp('');
      setTargetTimeDuration('');
      setStorageModeTemp('');
      setIsDropdownOpen(false);
      setSwitchStorage(false);
    }, [])
  );

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setIsDropdownOpen(false);
  };

  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Create custom profile</Text>
      </View>
      <View style={styles.inputs}>
        <View style={styles.input}>
          <Text style={styles.titleText}>Name:</Text>
          <View style={styles.nameInput}>
            <AddInput placeholder='' value={name} onChangeText={setName}></AddInput>
          </View>
        </View>
        
        <View style={styles.input}>
          <Text style={styles.titleText}>Target temperature:</Text>
          <View style={styles.targetTempInput}>
            <AddInput placeholder='in °C' value={targetTemp} onChangeText={setTargetTemp}></AddInput>
          </View>
        </View>
        
        <View style={styles.input}>
          <Text style={styles.titleText}>Target time duration:</Text>
          <View style={styles.targetTimeDurationInput}>
            <AddInput placeholder='in minutes' value={targetTimeDuration} onChangeText={setTargetTimeDuration}></AddInput>
          </View>
        </View>
        
        <View style={styles.input}>
          <Text style={styles.titleText}>Mode:</Text>
          <View style={styles.modeDropdown}>
            <Pressable 
              style={styles.dropdownButton}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={styles.dropdownButtonText}>
                {selectedMode ? selectedMode.name : 'Select a mode'}
              </Text>
              <Text style={styles.dropdownArrow}>
                {isDropdownOpen ? '▲' : '▼'}
              </Text>
            </Pressable>
            
            {isDropdownOpen && (
              <View style={styles.dropdownList}>
                {modes.map((mode) => (
                  <Pressable
                    key={mode.id}
                    style={[
                      styles.dropdownItem,
                      selectedMode?.id === mode.id && styles.selectedDropdownItem
                    ]}
                    onPress={() => handleModeSelect(mode)}
                  >
                    <Text style={[
                      styles.dropdownItemText,
                      selectedMode?.id === mode.id && styles.selectedDropdownItemText
                    ]}>
                      {mode.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.input}>
          <Text style={styles.titleText}>Auto switch to storage:</Text>
          <View style={styles.toggleContainer}>
            <Pressable 
              style={[styles.toggleButton, switchStorage && styles.toggleButtonActive]}
              onPress={() => setSwitchStorage(!switchStorage)}
            >
              <View style={[styles.toggleCircle, switchStorage && styles.toggleCircleActive]} />
            </Pressable>
            <Text style={styles.toggleText}>{switchStorage ? 'On' : 'Off'}</Text>
          </View>
        </View>
        
        <View style={styles.input}>
          <Text style={styles.titleText}>Storage mode temp:</Text>
          <View style={styles.storageModeTempInput}>
            <AddInput placeholder='in °C' value={storageModeTemp} onChangeText={setStorageModeTemp}></AddInput>
          </View>
        </View>
        <TouchableOpacity style={styles.createContainer}>
            <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 23
  },
  inputs: {
    marginTop: 20,
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  nameInput: {
    marginLeft: 15,
    width: '85%'
  },
  targetTempInput: {
    marginLeft: 15,
    width: '45%'
  },
  targetTimeDurationInput: {
    marginLeft: 15,
    width: '42%'
  },
  storageModeTempInput: {
    marginLeft: 15,
    width: '42%'
  },
  modeDropdown: {
    margin: 15,
    width: '83%',
    position: 'relative'
  },
  dropdownButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333'
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666'
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  selectedDropdownItem: {
    backgroundColor: '#e6f3ff'
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333'
  },
  selectedDropdownItemText: {
    color: '#007bff',
    fontWeight: 'bold'
  },
  toggleContainer: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  toggleButton: {
    width: 50,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 2
  },
  toggleButtonActive: {
    backgroundColor: '#007bff'
  },
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3
  },
  toggleCircleActive: {
    alignSelf: 'flex-end'
  },
  toggleText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333'
  },

  createContainer: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#d9d9d9',
    paddingHorizontal: 40,
    paddingVertical: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  createText: {
    fontSize: 23
  }
});

export default AddProfilePage;