import React from "react";
import { Link } from "react-router-dom";
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
        <Link to={'clinic/' + clinic._id} className="butn login_btn position">BOOK!</Link>
      </div>
    </>
  );
};

export default ClinicCard;

