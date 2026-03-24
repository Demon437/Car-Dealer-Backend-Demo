const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();

/* ================= APP INIT ================= */
const app = express();

/* ================= DB ================= */
connectDB();

/* ================= MIDDLEWARE ================= */
const allowedOrigins = [
  "http://localhost:8081",
  "http://localhost:3000",
  "http://localhost:5173",
  "https://car-dealer-demo.netlify.app",
  process.env.FRONTEND_URL, // For flexible production URL
].filter(Boolean); // Remove undefined entries

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
