import React from "react";
import './ClinicCard.css'


const ClinicCard = ({ clinic }) => {
  return (
    <>
      <div className="card">
        <h1>{clinic.name}</h1>
        <p>Address: {clinic.address}</p>
        <p>Contact </p>
        <p className="pad-left">Mobile: {clinic.mobileNo}</p>
        <p className="pad-left">Email: {clinic.email}</p>
        <p>Timing:
          <span className="pad-left">From: {clinic.clinicTimings.from}</span>
          <span className="pad-left">To: {clinic.clinicTimings.to}</span></p>
        <button className="butn login_btn">BOOK!</button>
      </div>
    </>
  );
};

export default ClinicCard;

