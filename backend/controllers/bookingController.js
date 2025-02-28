const Booking = require("../models/Appointment");

// ✅ Create a new appointment booking
exports.bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, clinicId, appointmentDate, timeSlot } = req.body;

    if (!patientId || !doctorId || !clinicId || !appointmentDate || !timeSlot) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newBooking = new Booking({
      patientId,
      doctorId,
      clinicId,
      appointmentDate,
      timeSlot,
    });

    await newBooking.save();
    res.status(201).json({ message: "Appointment booked successfully!", booking: newBooking });

  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get all appointments for a specific patient
exports.getPatientAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Booking.find({ patientId });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get all appointments for a specific doctor
exports.getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Booking.find({ doctorId });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get all appointments for a specific clinic
exports.getClinicAppointments = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const appointments = await Booking.find({ clinicId });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching clinic appointments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Cancel an appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.status(200).json({ message: "Appointment cancelled successfully", booking });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Confirm an appointment (For clinics)
exports.confirmAppointment = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    booking.status = "Confirmed";
    await booking.save();

    res.status(200).json({ message: "Appointment confirmed successfully", booking });
  } catch (error) {
    console.error("Error confirming appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
