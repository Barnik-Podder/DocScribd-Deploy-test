const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: String,  // Store as String instead of ObjectId
    required: true,
  },
  doctorId: {
    type: String,  // Store as String instead of ObjectId
    required: true,
  },
  clinicId: {
    type: String,  // Store as String instead of ObjectId
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("appointment_data", appointmentSchema);

module.exports = Booking;
