require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoute = require("./routes/authRoute");
const agencyRoute = require("./routes/agencyRoute");
const adminRoute = require("./routes/adminRoute");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

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
app.use("/agent", agencyRoute);
app.use("/admin", adminRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("server running on port" + port));
