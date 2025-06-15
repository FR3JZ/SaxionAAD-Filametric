const client = require("../mqttClient");
const { events } = require("../topics");

function publishEvent(eventType = "cycle_started", extraData = {}) {
  const msg = {
    event: eventType,
    timestamp: new Date().toISOString(),
    ...extraData
  };

  client.publish(events, JSON.stringify(msg));
  console.log("📤 Event sent:", msg);
}

module.exports = publishEvent;
