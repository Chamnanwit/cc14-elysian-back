const express = require("express");

const agencyController = require("../controllers/agencyController");

const router = express.Router();

router.post("/properties", agencyController.createProperty);
router.get("/properties", agencyController.getAllPropertyList);
router.get("/properties/:id", agencyController.getPropertyList);
// router.get("/properties/:id", agencyController.getPropertyList);

module.exports = router;
