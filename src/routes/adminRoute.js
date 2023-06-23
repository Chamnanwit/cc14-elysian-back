const express = require("express");

const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/create-pricing-plan", adminController.createPricingPlan);
router.get("/pricing-plan", adminController.getAllPricingPlanList);
router.get("/pricing-plan/:id", adminController.getPricingPlanList);

module.exports = router;
