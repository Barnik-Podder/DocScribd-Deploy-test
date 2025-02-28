import React, { useState } from "react";
import "./DoctorCard.css";
import BookingForm from "./BookForm"; // Import the booking form


const DoctorCard = ({ doctor, clinicId }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  return (
    <div className="docCard">
      <h3 className="name">Dr. {doctor.name}</h3>
      <p className="info"><strong>Email:</strong> {doctor.email}</p>
      <p className="info"><strong>Specialization:</strong> {doctor.specialization}</p>

      <div className="availability">
        <p><strong>Availability:</strong></p>
        <ul>
          {doctor.clinics
            .find(c => c.clinic === clinicId)?.availability.map((slot, index) => (
              <li key={index}>
                {slot.day}: {slot.startTime} - {slot.endTime}
              </li>
            ))}
        </ul>
      </div>

      <p className="fees"><strong>Fees:</strong> ₹{doctor.fees}</p>

      {/* Button to Open Booking Form */}
      <button className="bookBtn" onClick={() => setShowBookingForm(true)}>
        Book Appointment
      </button>

      {/* Show Booking Form Modal */}
      {showBookingForm && (
        <BookingForm 
          doctor={doctor} 
          clinicId={clinicId} 
          onClose={() => setShowBookingForm(false)} 
        />
      )}
    </div>
  );
};

export default DoctorCard;
