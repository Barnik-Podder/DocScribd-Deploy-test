const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// 📌 Create a new appointment
router.post("/book", bookingController.bookAppointment);

// 📌 Get all appointments for a patient
router.get("/patient/:patientId", bookingController.getPatientAppointments);

// 📌 Get all appointments for a doctor
router.get("/doctor/:doctorId", bookingController.getDoctorAppointments);

// 📌 Get all appointments for a clinic
router.get("/clinic/:clinicId", bookingController.getClinicAppointments);

// 📌 Cancel an appointment
router.put("/cancel/:bookingId", bookingController.cancelAppointment);

// 📌 Confirm an appointment (For clinics)
router.put("/confirm/:bookingId", bookingController.confirmAppointment);

module.exports = router;
