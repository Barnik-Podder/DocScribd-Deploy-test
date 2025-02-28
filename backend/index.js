const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoDB = require("./configs/db");
require("dotenv").config();
const signup_patient = require("./Routes/Signup_patient");
const bookingRoutes = require("./Routes/BookingRoutes");
const serverless = require("serverless-http"); // ✅ Add this

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoDB(); // Connect to MongoDB

// Routes
app.use("/api", signup_patient);
app.use("/api/bookings", bookingRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Export for Vercel serverless deployment
module.exports = serverless(app);
