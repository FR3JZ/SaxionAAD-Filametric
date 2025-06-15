const client = require("../mqttClient");
const { shadow } = require("../topics");

let lastReported = {};

function getReportedState(state) {
  return {
    settings: state.settings,
    custom_profiles: state.customProfiles,
    latest_selected_profile: state.selectedProfile,
    latest_selected_mode: state.mode
  };
}

function publishShadow(state) {
  const currentReported = getReportedState(state);
  const changed = {};

  for (const key in currentReported) {
    if (JSON.stringify(currentReported[key]) !== JSON.stringify(lastReported[key])) {
      changed[key] = currentReported[key];
    }
  }

  if (Object.keys(changed).length > 0) {
    const payload = {
      state: {
        reported: changed
      }
    };

    client.publish(shadow.update, JSON.stringify(payload));
    console.log("📤 Shadow update sent:", JSON.stringify(payload, null, 2));

    // Deep copy zodat next diff werkt
    lastReported = JSON.parse(JSON.stringify(currentReported));
  }
}

// Optioneel bij boot: altijd alles sturen
function forcePublishShadow(state) {
  lastReported = {};
  publishShadow(state);
}

module.exports = {
  publishShadow,
  forcePublishShadow
};