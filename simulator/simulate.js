const client = require("./mqttClient");
const config = require("./config");
const state = require("./state");
const publishTelemetry = require("./handlers/publishTelemetry");
const { publishShadow }  = require("./handlers/publishShadow");
const publishEvent = require("./handlers/publishEvents");
const subscribeAndHandle = require("./handlers/handleIncoming");

// PID-regelaar
const PID = {
  integral: 0,
  previousError: 0,
  kp: 1.2,
  ki: 0.01,
  kd: 0.3,
};

const humidityPID = {
  integral: 0,
  previousError: 0,
  kp: 1.0,
  ki: 0.005,
  kd: 0.2,
};

function updateEnvironment(dt = 1) {
  // Veiligheidscontroles op geldige getallen
  if (typeof state.currentHumidity !== "number" || isNaN(state.currentHumidity)) {
    console.warn("⚠️ currentHumidity is ongeldig, reset naar 25");
    state.currentHumidity = 25;
    humidityPID.integral = 0;
    humidityPID.previousError = 0;
  }

  if (typeof state.targetHumidity !== "number" || isNaN(state.targetHumidity)) {
    console.warn("⚠️ targetHumidity is ongeldig, reset naar 35");
    state.targetHumidity = 35;
  }

  if (typeof state.currentTemp !== "number" || isNaN(state.currentTemp)) {
    console.warn("⚠️ currentTemp is ongeldig, reset naar 22");
    state.currentTemp = 22;
    PID.integral = 0;
    PID.previousError = 0;
  }

  if (typeof state.targetTemp !== "number" || isNaN(state.targetTemp)) {
    console.warn("⚠️ targetTemp is ongeldig, reset naar 40");
    state.targetTemp = 40;
  }

  // Temperatuurregeling
  if (state.isRunning && !state.isPaused) {
    const error = state.targetTemp - state.currentTemp;
    PID.integral += error * dt;
    const derivative = (error - PID.previousError) / dt;
    const output = PID.kp * error + PID.ki * PID.integral + PID.kd * derivative;
    state.currentTemp += output * dt;
    PID.previousError = error;
  } else {
    const ambient = 22.0;
    if (state.currentTemp > ambient) {
      state.currentTemp -= 0.03 + Math.random() * 0.04;
    } else if (state.currentTemp < ambient) {
      state.currentTemp += 0.03 + Math.random() * 0.04;
    }
    if (Math.abs(state.currentTemp - ambient) < 0.2) {
      state.currentTemp += (Math.random() - 0.5) * 0.04;
    }
  }

  // Vochtigheidsregeling
  if (state.isRunning && !state.isPaused) {
    const error = state.targetHumidity - state.currentHumidity;
    humidityPID.integral += error * dt;
    const derivative = (error - humidityPID.previousError) / dt;
    const output = humidityPID.kp * error + humidityPID.ki * humidityPID.integral + humidityPID.kd * derivative;
    state.currentHumidity += output * dt;
    humidityPID.previousError = error;
  } else {
    if (state.currentHumidity < 25) state.currentHumidity += 0.05;
    else if (state.currentHumidity > 25) state.currentHumidity -= 0.05;
  }

  // 🔁 Rond af naar max 2 decimalen
  state.currentTemp = Math.round(state.currentTemp * 100) / 100;
  state.currentHumidity = Math.round(state.currentHumidity * 100) / 100;
}


// Interval-timer voor simulatie
function simulationLoop() {
  updateEnvironment(1);

  if (state.isRunning && !state.isPaused) {
    state.remainingTime = Math.max(0, state.remainingTime - 1);
    if (state.remainingTime === 0) {
      state.isRunning = false;
      state.mode = "off";
      publishEvent("cycle_complete");
    }
  }

  // Publiceren
  publishTelemetry(state);
  publishShadow(state);
  publishEvent("status_report", state); // ✅ FIXED: correcte call
}

// Start alles bij connectie
client.on("connect", () => {
  console.log("✅ Verbonden met broker");

  publishTelemetry(state);
  publishShadow(state);
  publishEvent("boot_completed", state);

  // Commands en shadow delta afhandelen
  subscribeAndHandle();

  // Start simulatie
  setInterval(simulationLoop, config.eventInterval || 5000);
});
