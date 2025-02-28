const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoDB = require("./configs/db");
require("dotenv").config();
const signup_patient = require("./Routes/Signup_patient");
const bookingRoutes = require("./Routes/BookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoDB();

// Define Routes
app.use("/", signup_patient);
app.use("/bookings", bookingRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("You are trying to access the backend over HTTP");
});

// Export as a Serverless Function for Vercel
module.exports = app;
