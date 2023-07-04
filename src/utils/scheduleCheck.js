const schedule = require("node-schedule");

function checkPackageJob(callback) {
  // return schedule.scheduleJob("0 0 * * *", callback);
  // return schedule.scheduleJob("*/10 * * * * *", callback);
}

function dailyReportJob(callback) {
  //return schedule.scheduleJob("0 0 * * *", callback);
  // return schedule.scheduleJob("*/10 * * * * *", callback);
}

module.exports = { checkPackageJob, dailyReportJob };
