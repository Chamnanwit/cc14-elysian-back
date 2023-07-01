const express = require("express");

const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/create-pricing-plan", adminController.createPricingPlan);
router.get("/pricing-plan", adminController.getAllPricingPlan);
router.get("/pricing-plan/:id", adminController.getPricingPlanById);
router.delete("/delete-pricing-plan/:id", adminController.deletePricingPlan);
router.patch("/update-pricing-plan", adminController.updatePricingPlan);

router.post("/create-optionaltype", adminController.createOptionalType);
router.get("/optionaltype", adminController.getAllOptionalType);
router.get("/optionaltype/:id", adminController.getOptionalTypeById);
router.delete("/delete-optionaltype/:id", adminController.deleteOptionalType);
router.patch("/update-optionaltype", adminController.updateOptionalType);

router.post("/create-optional", adminController.createOptional);
router.get("/optional", adminController.getAllOptional);
router.get("/optional/:id", adminController.getOptionalById);
router.delete("/delete-optional/:id", adminController.deleteOptional);
router.patch("/update-optional", adminController.updateOptional);

router.patch("/update-profileadmin", adminController.updateProfileAdmin);

router.patch("/admin-edit-form", adminController.updateAdminForm);
router.delete("/admin-delete-form/:id", adminController.deleteAdminForm);

router.get("/all-admin", adminController.getAllAdmin);

router.get("/get-report", adminController.getReport);
router.get("/get-all-purchase-history", adminController.getAllPurchaseHistory);
router.get(
  "/get-report-agent-details/:id",
  adminController.getReportAgentDetailById
);

module.exports = router;
