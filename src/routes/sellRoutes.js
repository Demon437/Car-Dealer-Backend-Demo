const express = require("express");
const router = express.Router();
const sellController = require("../controllers/sellController");
const upload = require("../middleware/upload");

router.post(
  "/",
  (req, res, next) => {
    console.log("🔥 SELL ROUTE HIT");
    next();
  },

  upload.fields([
    { name: "images", maxCount: 15 },
    { name: "rcImage", maxCount: 1 },
  ]),

  (err, req, res, next) => {
    // 👇 THIS WILL SHOW REAL MULTER ERROR
    console.error("❌ MULTER ERROR:", err);
    return res.status(400).json({
      message: "Multer failed",
      error: err?.message,
    });
  },

  (req, res, next) => {
    console.log("🔥 MULTER PASSED");
    console.log("FILES:", req.files);
    console.log("BODY:", req.body);
    next();
  },

  sellController.createSellRequest
);

module.exports = router;
