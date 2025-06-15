module.exports = {
  isRunning: false,
  isPaused: false,
  targetTemp: 0,
  currentTemp: 22.0, // kamertemp
  currentHumidity: 10,
  remainingTime: 0,
  mode: "off",

  settings: {
    language: "nl",
    temperature_unit: "celsius",
    display: {
      brightness: 70
    }
  },
  customProfiles: {
    profile_001: {
      "name": "My PLA Profile",
      "description": "Standard drying for PLA",
      "target_temperature": 45.0,
      "duration": 8400,
      "drying_mode": "normal",
      "switch_to_storage": true,
      "storage_temperature": 25.0
    },
    profile_002: {
      "name": "My ABS Profile",
      "description": "Standard drying for PLA",
      "target_temperature": 60.0,
      "duration": 8400,
      "drying_mode": "normal",
      "switch_to_storage": true,
      "storage_temperature": 25.0
    }
  },
  selectedProfile: {
    type: "custom",
    id: "profile_001"
  },
  mode: "normal"
};
