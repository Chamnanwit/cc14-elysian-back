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
<<<<<<< HEAD
router.get('/payment/data',authenticateMiddleware ,paymentController.packageData);
=======
router.get("/payment/data", paymentController.packageData);
>>>>>>> c1f7c0e414d5053f798efca4453c0e15fd773ba1

router.patch("/update-profileagency", agencyController.updateProfileAgency);
router.delete(
  "/delete-profileagency/:id",
  agencyController.deleteProfileAgency
);

router.get("/agencybyid/:id", agencyController.getAgencyById);

router.get("/propertybyagencyid/:id", agencyController.getPropertyByAgencyId);

module.exports = router;
