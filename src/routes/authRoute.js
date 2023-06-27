const express = require("express");

const authController = require("../controllers/authController");
const otpController = require("../controllers/otpController");
const authenticateMiddleware = require("../middlewares/authenticate");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticateMiddleware, authController.getMe);
router.post("/checkme", authController.checkMe);

router.post("/otp", otpController.otp);
router.post("/verify", otpController.verify);

module.exports = router;
