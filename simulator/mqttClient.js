const mqtt = require("mqtt");
const config = require("./config");
const fs = require("fs")

const deviceId = "BasDroger";
const endpoint ="a3ua9vpcdqe1om-ats.iot.eu-north-1.amazonaws.com";

const options = {
  clientId: deviceId,
  host: endpoint,
  port: 8883,
  protocol: "mqtts",
  cert: fs.readFileSync("./cert/BasDroger.cert.pem"),
  key: fs.readFileSync("./cert/BasDroger.private.key"),
  ca: fs.readFileSync("./cert/root-CA.crt"),
  rejectUnauthorized: true,
}



const client = mqtt.connect(options);

module.exports = client;
