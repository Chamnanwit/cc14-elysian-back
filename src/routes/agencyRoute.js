const express = require("express");
const agencyController = require("../controllers/agencyController");
const upload = require("../middlewares/upload");
const paymentController = require("../controllers/paymantControll");
const authenticateMiddleware = require("../middlewares/authenticate");

const router = express.Router();

router.post(
  "/addImage/:propertyId",
  upload.array("imageLink"),
  agencyController.uploadProperty
);
router.post(
  "/properties",
  authenticateMiddleware,
  agencyController.createProperty
);

router.post(
  "/propertiesandoptionals",
  agencyController.createPropertyAndOptional
);

router.get("/properties", agencyController.getAllProperty);
router.get("/properties/:id", agencyController.getPropertyById);
router.get("/all-agency", agencyController.getAllAgency);
router.delete("/properties/:id", agencyController.deleteProperty);

router.post("/payment", authenticateMiddleware, paymentController.package);
router.get(
  "/payment/data",
  authenticateMiddleware,
  paymentController.packageData
);

router.patch("/update-profileagency", agencyController.updateProfileAgency);
router.delete(
  "/delete-profileagency/:id",
  agencyController.deleteProfileAgency
);

router.get("/agencybyid/:id", agencyController.getAgencyById);

router.get("/propertybyagencyid/:id", agencyController.getPropertyByAgencyId);

router.get("/purchase-history/:id", agencyController.getPurchaseHistoryById);

router.get("/get-all-sub-district", agencyController.getAllSubDistrict);

module.exports = router;
