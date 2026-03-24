const Car = require("../models/Car");

// =======================================
// GET /api/cars  (BUYER)
// =======================================
// controllers/carController.js
exports.getAllCarsForBuyer = async (req, res) => {
    try {
        console.log("📍 [getAllCarsForBuyer] API called");

        const cars = await Car.find()
            .select("car adminSellingPrice status createdAt _id")
            .sort({ createdAt: -1 });

        console.log("✅ [getAllCarsForBuyer] Total cars found in DB:", cars.length);
        console.log("📊 [getAllCarsForBuyer] Cars data:", JSON.stringify(cars, null, 2));

        res.json(cars);
        console.log("📤 [getAllCarsForBuyer] Data sent to frontend successfully");
    } catch (err) {
        console.error("❌ [getAllCarsForBuyer] Error:", err.message);
        res.status(500).json({ message: "Failed to fetch cars" });
    }
};
