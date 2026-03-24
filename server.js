const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();

/* ================= APP INIT ================= */
const app = express();

/* ================= DB ================= */
connectDB();

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true,
  })
);

// ⬇️ IMPORTANT: increase body limits (safe for uploads)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
const PORT = process.env.PORT || 5000;
/* ================= ROUTES ================= */
const sellRoutes = require("./src/routes/sellRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const carRoutes = require("./src/routes/carRoutes");
const uploadRoutes = require("./src/routes/uploadRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");

app.use("/api/sell", sellRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/expenses", expenseRoutes);

/* ================= SERVER ================= */
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// 🔥 MOST IMPORTANT FIX (TIMEOUT)
server.setTimeout(5 * 60 * 1000); // 5 minutes
