const express = require("express");

const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/create-pricing-plan", adminController.createPricingPlan);
router.get("/pricing-plan", adminController.getAllPricingPlan);
router.get("/pricing-plan/:id", adminController.getPricingPlanById);
router.delete("/delete-pricing-plan/:id", adminController.deletePricingPlan);
router.patch("/update-pricing-plan", adminController.updatePricingPlan);

module.exports = router;

// export const updatePricingPlan = (id, updatePricingPlanObj) =>
//   axios.put(`/admin/update-pricing-plan/${id}`, updatePricingPlanObj);
// export const deletePricingPlan = (id) =>
//   axios.delete(`/admin/delete-pricing-plan/${id}`);
