require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const schedule = require("node-schedule");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const agencyRoute = require("./routes/agencyRoute");
const adminRoute = require("./routes/adminRoute");
const searchRoute = require("./routes/searchRoute");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const { checkPackageStatus } = require("./controllers/cronjobController");
const { cronjob } = require("./utils/croncheck");

const app = express();

app.use(cors());

app.use(morgan());

app.use(
  rateLimit({
    windowMs: 1000 * 60 * 1,
    max: 1000,
    message: { message: "too many requests" },
  })
);

app.use(helmet());

app.use(express.json());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/agent", agencyRoute);
app.use("/admin", adminRoute);
app.use("/search", searchRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Cronjob
cronjob(checkPackageStatus);

// const jobmidnight = schedule.scheduleJob("0 0 * * *", function () {
//   console.log("Hello I am cron every 1 minute! 🦶🏼");
// });

// const job = schedule.scheduleJob("* * * * *", function () {
//   console.log("Hello I am cron every 1 minute! 🦶🏼");
// });

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("server running on port" + port));
