const client = require("../mqttClient");
const topics = require("../topics");
const state = require("../state");
const publishShadow = require("./publishShadow");
const publishEvent = require("./publishEvents");
const { serial } = require("../config");

function subscribeAndHandle() {
  const subscriptions = [
    topics.shadow.delta,
    topics.shadow.get,
    topics.command.control,
    topics.command.stop,
    topics.command.register
  ];

  client.subscribe(subscriptions, () => {
    console.log("📡 Subscribed op command- en shadow-topics:");
    subscriptions.forEach(topic => console.log(" →", topic));
  });

  client.on("message", (topic, message) => {
    const payload = message.toString();
    console.log(`📥 ${topic} → ${payload}`);

    if (topic === topics.command.register) {
      try {
        const payload = JSON.parse(message.toString());
        const { temp_pass, sub } = payload;

        console.log("🔐 Apparaatregistratie ontvangen:", payload);

        const responseTopic = `filametric/telemetry/${serial}/status/register`;

        if (temp_pass === "111") {
          console.log("✅ Temp pass correct, registreer apparaat");

          const response = {
            success: true,
            sub: sub,
            serial: serial
          };

          client.publish(responseTopic, JSON.stringify(response));
        } else {
          console.log("❌ Ongeldige temp_pass!");

          const response = {
            success: false,
            reason: "Invalid temp_pass",
            sub: sub
          };

          client.publish(responseTopic, JSON.stringify(response));
        }

      } catch (err) {
        console.error("❌ Fout bij verwerken registratie:", err);
      }

      return;
    }

    if (topic === topics.command.control) {
    try {
      const { command, temp, time } = JSON.parse(payload);

      switch (command) {
        case "start":
  state.targetTemp = temp;

  if (state.isPaused && state.remainingTime > 0) {
    console.log("⏯️ Start na pauze — resterende tijd:", state.remainingTime, "sec");
    // Tijd blijft behouden
  } else {
    state.remainingTime = time;
    console.log("🕐 Start nieuw programma met tijd:", time, "sec");
  }

  state.isRunning = true;
  state.isPaused = false;
  state.mode = "standard";

  publishEvent("cycle_started", {
    temp,
    time: state.remainingTime
  });

  console.log("✅ Startcommando verwerkt.");
  break;

        case "stop":
          state.isRunning = false;
          state.isPaused = false;
          state.remainingTime = 0;
          state.targetTemp = 0;
          state.mode = "off";
          publishEvent("cycle_stopped");
          console.log("🛑 Stopcommando verwerkt.");
          break;

        case "pause":
          state.isPaused = true;
          state.isRunning = false;
          publishEvent("cycle_paused");
          console.log("⏸️ Pauzecommando verwerkt.");
          break;

        default:
          console.warn("⚠️ Onbekend commando ontvangen:", command);
      }
    } catch (err) {
      console.error("❌ Ongeldige payload of fout bij command:", err);
    }
    return;
  }

    if (topic === topics.shadow.delta) {
      try {
        const delta = JSON.parse(payload).state;

        if (delta.settings) {
          Object.assign(state.settings, delta.settings);
          console.log("⚙️ Instellingen bijgewerkt:", state.settings);
        }

        if (delta.custom_profiles) {
          state.customProfiles = delta.custom_profiles;
          console.log("📁 Custom profiles bijgewerkt.");
        }

        if (delta.latest_selected_profile) {
          state.selectedProfile = delta.latest_selected_profile;
          console.log("🎯 Nieuw profiel geselecteerd:", state.selectedProfile);
        }

        if (delta.latest_selected_mode) {
          state.mode = delta.latest_selected_mode;
          console.log("🎛️ Modus aangepast:", state.mode);
        }

        publishShadow(state);
      } catch (e) {
        console.error("❌ Fout bij verwerken shadow delta:", e);
      }
      return;
    }

    if (topic === topics.shadow.get) {
      console.log("📤 Shadow GET ontvangen.");
      return;
    }
  });
}

module.exports = subscribeAndHandle;
