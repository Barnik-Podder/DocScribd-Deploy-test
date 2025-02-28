import React, { useState, useContext } from "react";
import "./BookForm.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const BookingForm = ({ doctor, clinicId, onClose }) => {
  const { id: patientId } = useContext(AuthContext); // Get logged-in user (patient) ID
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  // Function to get the day of the week from a date
  const getDayOfWeek = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date(date).getDay()];
  };

  const handleBooking = async () => {
    if (!appointmentDate || !timeSlot) {
      toast.error("Please select a date and time slot.");
      return;
    }

    // Get the day of the selected date
    const selectedDay = getDayOfWeek(appointmentDate);

    // Check if the selected day exists in doctor's available slots
    const isDayAvailable = doctor.clinics
      .find(c => c.clinic === clinicId)
      ?.availability.some(slot => slot.day === selectedDay);

    if (!isDayAvailable) {
      toast.error(`Doctor is not available on ${selectedDay}. Please choose a valid day.`);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/bookings/book", {
        patientId,
        doctorId: doctor._id,
        clinicId,
        appointmentDate,
        timeSlot,
      });

      toast.success(response.data.message);
      onClose(); // Close modal after successful booking
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment.");
    }
  };

  return (
    <div className="bookingModal">
      <div className="bookingContent">
        <h2>Book Appointment</h2>
        <p><strong>Doctor:</strong> {doctor.name}</p>
        <p><strong>Specialization:</strong> {doctor.specialization}</p>

        <label>Date:</label>
        <input 
          type="date" 
          value={appointmentDate} 
          onChange={(e) => setAppointmentDate(e.target.value)} 
        />

        <label>Time Slot:</label>
        <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
          <option value="">Select Time</option>
          {doctor.clinics
            .find(c => c.clinic === clinicId)?.availability.map((slot, index) => (
              <option key={index} value={`${slot.day} ${slot.startTime} - ${slot.endTime}`}>
                {slot.day} {slot.startTime} - {slot.endTime}
              </option>
            ))}
        </select>

        <div className="buttons">
          <button className="confirmBtn" onClick={handleBooking}>Confirm</button>
          <button className="cancelBtn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
