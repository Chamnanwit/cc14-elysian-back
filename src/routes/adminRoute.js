const express = require("express");

const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/create-pricing-plan", adminController.createPricingPlan);
router.get("/pricing-plan", adminController.getAllPricingPlan);
router.get("/pricing-plan/:id", adminController.getPricingPlanById);

module.exports = router;
