const request = require('request');
const dotenv = require('dotenv');
dotenv.config();
const adminService = require("../services/adminService");

const url_line_notification = "https://notify-api.line.me/api/notify";


exports.dailyReport = async () => {
    try {
  const {
    dailyEarningResult,
    monthlyEarningResult,
    yearlyEarningResult,
    totalEarning,
  } = await adminService.getEarning();

  const report = {
    dailyEarningResult: JSON.parse(JSON.stringify(dailyEarningResult[0])).sum,
    monthlyEarningResult: JSON.parse(JSON.stringify(monthlyEarningResult[0]))
      .sum,
    yearlyEarningResult: JSON.parse(JSON.stringify(yearlyEarningResult[0]))
      .sum,
    totalEarning: JSON.parse(JSON.stringify(totalEarning[0])).sum,
  };


  lineReport = `ยอดขายรายวัน: ${report.dailyEarningResult}\nยอดขายรายเดือน: ${report.monthlyEarningResult}\nยอดขายรายปี: ${report.yearlyEarningResult}\nยอดขายรวม: ${report.totalEarning}`
  


console.log(lineReport)


        request({
            method: 'POST',
            uri: url_line_notification,
            header: {
                'Content-Type': 'multipart/form-data',
            },
            auth: {
                bearer: process.env.TOKEN,
            },
            form: {
                message: lineReport
            },
        }, (err, httpResponse, body) => {
            if (err) {
                console.log(err)
            } else {
                console.log(body)
            }
        });


        console.log("")



    } catch (err) {
        console.log(err);
      }
    };