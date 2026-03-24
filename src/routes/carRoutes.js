const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const carController = require("../controllers/carContoller");

// BUYER – ALL CARS (LIVE + SOLD)
router.get("/", carController.getAllCarsForBuyer);

// BUYER – SINGLE CAR
router.get("/:id", adminController.getCarById);



module.exports = router;
