const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoDB = require("./configs/db");
require('dotenv').config();
const signup_patient = require("./Routes/Signup_patient");
const bookingRoutes = require("./Routes/BookingRoutes");




const port = process.env.PORT||5001


app.use(cors());

mongoDB();

app.get('/', (req, res) => {
  res.send("You are trying to access the backend over http");
});

app.use(express.json());

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use(cookieParser());

app.use(express.json());

app.use("/", signup_patient);
app.use("/bookings", bookingRoutes);
