const SellRequest = require("../models/SellRequest");


// ===============================
// POST /api/sell (WITH IMAGES)
// ===============================
exports.createSellRequest = async (req, res) => {
  try {
    console.log("========= SELL REQUEST START =========");

    // 🔹 BODY DEBUG
    console.log("REQ BODY 👉");
    console.dir(req.body, { depth: null });

    // 🔹 FILES DEBUG
    console.log("REQ FILES 👉");
    console.dir(req.files, { depth: null });

    // ================= IMAGES =================
    const images = req.files?.images || [];
    const rcImage = req.files?.rcImage?.[0];

    console.log("CAR IMAGES COUNT 👉", images.length);
    console.log("RC IMAGE 👉", rcImage ? rcImage.path : "NO RC IMAGE");

    const imageUrls = images.map((file) => {
      console.log("UPLOADED IMAGE PATH 👉", file.path);
      return file.path;
    });

    const rcImageUrl = rcImage ? rcImage.path : null;

    // ================= CREATE REQUEST =================
    const sellRequest = await SellRequest.create({
      source: "ONLINE",

      seller: {
        name: req.body.name,
        phone: req.body.phone,
        altPhone: req.body.altPhone,
        email: req.body.email,
        city: req.body.city,
        area: req.body.area,
      },

      car: {
        brand: req.body.brand,
        model: req.body.model,
        year: Number(req.body.year),
        variant: req.body.variant,
        transmission: req.body.transmission,
        fuelType: req.body.fuel,
        registrationNumber: req.body.registrationNumber,
        kmDriven: Number(req.body.km),
        condition: req.body.description,
        images: imageUrls,
      },

      sellerPrice: Number(req.body.expectedPrice),

      rcDetails: {
        rcOwner: req.body.rcOwner,
        rcOwnerName:
          req.body.rcOwner === "no" ? req.body.rcOwnerName : null,
        rcImage:
          req.body.rcOwner === "no" ? rcImageUrl : null,
      },
    });

    console.log("SELL REQUEST SAVED 👉", sellRequest._id);
    console.log("========= SELL REQUEST END =========");

    res.status(201).json({
      message: "Car sell request created successfully",
      data: sellRequest,
    });
  } catch (error) {
    console.error("❌ SELL REQUEST ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};

