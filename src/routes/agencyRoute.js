const express = require("express");

const agencyController = require("../controllers/agencyController");
const paymentController = require("../controllers/paymantControll");
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

router.post("/payment", paymentController.package);

router.patch("/update-profileagency", agencyController.updateProfileAgency);
router.delete(
  "/delete-profileagency/:id",
  agencyController.deleteProfileAgency
);

module.exports = router;
