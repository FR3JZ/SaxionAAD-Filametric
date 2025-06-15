const { serial } = require("./config");

module.exports = {
  telemetry: `filametric/telemetry/${serial}/environment`,
  status: `filametric/telemetry/${serial}/status`,
  events: `filametric/${serial}/events`,

  command: {
    control: `filametric/command/${serial}/control`,
    stop: `filametric/command/${serial}/stop`,
    register: `filametric/command/${serial}/register`
  },

  shadow: {
    update: `$aws/things/${serial}/shadow/update`,
    delta: `$aws/things/${serial}/shadow/update/delta`,
    get: `$aws/things/${serial}/shadow/get`,
    getAccepted: `$aws/things/${serial}/shadow/get/accepted`,
    updateAccepted: `$aws/things/${serial}/shadow/update/accepted`,
    updateRejected: `$aws/things/${serial}/shadow/update/rejected`
  }
};