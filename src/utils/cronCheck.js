const schedule = require("node-schedule");

function cronjob(callback) {
  return schedule.scheduleJob("0 0 * * *", callback);
  // return schedule.scheduleJob("*/10 * * * * *", callback);
}

module.exports = { cronjob };
