const express = require("express");

const agencyController = require("../controllers/agencyController");

const router = express.Router();

router.post("/properties", agencyController.createProperty);
router.get("/properties", agencyController.getPropertyList);

module.exports = router;
