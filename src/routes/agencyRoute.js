const express = require("express");

const agencyController = require("../controllers/agencyController");
const authenticateMiddleware = require("../middlewares/authenticate");

const router = express.Router();

router.post(
  "/properties",
  authenticateMiddleware,
  agencyController.createProperty
);
router.get("/properties", agencyController.getAllProperty);
router.get("/properties/:id", agencyController.getPropertyById);
router.get("/all-agency", agencyController.getAllAgency);
router.delete("/properties/:id", agencyController.deleteProperty);

router.patch("/update-profileagency", agencyController.updateProfileAgency);
router.delete(
  "/delete-profileagency/:id",
  agencyController.deleteProfileAgency
);

router.get("/agencybyid", agencyController.getAgencyById);

router.get("/get-report", agencyController.getReportAgency);

module.exports = router;
