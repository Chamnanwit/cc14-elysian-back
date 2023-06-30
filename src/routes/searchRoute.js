const express = require("express");

const searchController = require("../controllers/searchController");

const router = express.Router();

router.get("/getroomtypeprovince", searchController.getRoomTypeProvince);

module.exports = router;
