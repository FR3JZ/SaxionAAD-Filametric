import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  ImageSourcePropType,
} from "react-native";

interface ProfileMultiPickerProps {
  image: ImageSourcePropType;
  label: string;
  hours: number;
  setHours: (value: number) => void;
  minutes: number;
  setMinutes: (value: number) => void;
  temperature: number;
  setTemperature: (value: number) => void;
}

const ProfileMultiPicker = ({
  image,
  label,
  hours,
  setHours,
  minutes,
  setMinutes,
  temperature,
  setTemperature,
}: ProfileMultiPickerProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState({
    hours,
    minutes,
    temperature,
  });

  const handleInputClick = () => {
    setModalVisible(true);
  };

  const handleValueChange = (
    value: number,
    type: "hours" | "minutes" | "temperature"
  ) => {
    setSelectedValues((prev) => ({ ...prev, [type]: value }));
  };

  const handleSave = () => {
    // Commit selection to parent state
    setHours(selectedValues.hours);
    setMinutes(selectedValues.minutes);
    setTemperature(selectedValues.temperature);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  // Picker data ranges
  const hoursData:number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutesData:number[] = Array.from({ length: 60 }, (_, i) => i);
  const temperatureData:number[] = Array.from({ length: 100 }, (_, i) => i);

  return (
    <View style={styles.inputsContainer}>
      {/* Time & Temp Preview Blocks */}
      <View style={styles.inputsWrapper}>
        <TouchableOpacity onPress={handleInputClick}>
          <View style={styles.input}>
            <Text style={styles.inputText}>{selectedValues.hours}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.type}>hrs</Text>
      </View>

      <View style={styles.inputsWrapper}>
        <TouchableOpacity onPress={handleInputClick}>
          <View style={styles.input}>
            <Text style={styles.inputText}>{selectedValues.minutes}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.type}>min</Text>
      </View>

      <View style={styles.inputsWrapper}>
        <TouchableOpacity onPress={handleInputClick}>
          <View style={styles.input}>
            <Text style={styles.inputText}>{selectedValues.temperature}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.type}>°C</Text>
      </View>

      {/* Modal Picker for Hours / Minutes / Temperature */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalTitleContainer}>
              <Image source={image} style={styles.modeImage} resizeMode="contain" />
              <Text style={styles.modalTitle}>{label}</Text>
            </View>

            {/* Picker Columns */}
            <View style={styles.pickersWrapper}>
              <View style={styles.pickerContainer}>
                {/* Hours Picker */}
                <View style={styles.pickerColumn}>
                  <Text style={styles.pickerLabel}>Hours</Text>
                  <FlatList
                    data={hoursData}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => handleValueChange(item, "hours")}
                        style={[
                          styles.pickerItem,
                          selectedValues.hours === item && styles.selectedItem,
                        ]}
                      >
                        <Text style={styles.pickerItemText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.pickerList}
                  />
                </View>

                {/* Minutes Picker */}
                <View style={styles.pickerColumn}>
                  <Text style={styles.pickerLabel}>Minutes</Text>
                  <FlatList
                    data={minutesData}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => handleValueChange(item, "minutes")}
                        style={[
                          styles.pickerItem,
                          selectedValues.minutes === item && styles.selectedItem,
                        ]}
                      >
                        <Text style={styles.pickerItemText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.pickerList}
                  />
                </View>

                {/* Temperature Picker */}
                <View style={styles.pickerColumn}>
                  <Text style={styles.pickerLabel}>Temperature</Text>
                  <FlatList
                    data={temperatureData}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => handleValueChange(item, "temperature")}
                        style={[
                          styles.pickerItem,
                          selectedValues.temperature === item && styles.selectedItem,
                        ]}
                      >
                        <Text style={styles.pickerItemText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.pickerList}
                  />
                </View>
              </View>
            </View>

            {/* Modal Actions */}
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleSave} style={[styles.button, styles.saveButton]}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputsWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  inputText: {
    color: "#B0B0B0",
    fontSize: 20,
  },
  type: {
    fontSize: 18,
    fontFamily: "Satoshi-Medium",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 400,
    height: 450,
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modeImage: {
    width: 25,
    height: 25,
  },
  modalTitle: {
    fontSize: 20,
    marginLeft: 10,
    fontFamily: "Satoshi-Medium",
  },
  pickersWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "80%",
  },
  pickerColumn: {
    alignItems: "center",
    width: 100,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  pickerList: {
    flexDirection: "column",
  },
  pickerItem: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 10,
  },
  selectedItem: {
    backgroundColor: "#E0E0E0",
  },
  pickerItemText: {
    fontSize: 18,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FF2323",
  },
  saveButton: {
    backgroundColor: "#00C03B",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ProfileMultiPicker;
