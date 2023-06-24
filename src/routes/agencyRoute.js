const express = require("express");
const agencyController = require("../controllers/agencyController");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post(
    "/addImage/:propertyId",
    upload.array("imageLink"),
    agencyController.uploadProperty
    );
router.post("/properties", agencyController.createProperty);
router.get("/properties", agencyController.getAllPropertyList);
router.get("/properties/:id", agencyController.getPropertyList);
// router.get("/properties/:id", agencyController.getPropertyList);

module.exports = router;
