const client = require("../mqttClient");
const { telemetry } = require("../topics");

function publishTelemetry(state) {
  const data = {
    timestamp: Date.now(),
    temperature: {
      value: parseFloat(state.currentTemp.toFixed(2)),
      unit: "celsius"
    },
    humidity: {
      value: parseFloat(state.currentHumidity.toFixed(2)),
      unit: "percent"
    },
    sensor_status: "ok" // optioneel veld, kun je vervangen door dynamische status
  };

  client.publish(telemetry, JSON.stringify(data));
  console.log("📤 Telemetry sent:", data);
}

module.exports = publishTelemetry;
