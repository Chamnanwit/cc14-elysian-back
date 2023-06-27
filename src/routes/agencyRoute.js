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
router.delete("/properties/:id", agencyController.deleteProperty);
router.patch("/update-profileagency", agencyController.updateProfileAgency);

module.exports = router;
