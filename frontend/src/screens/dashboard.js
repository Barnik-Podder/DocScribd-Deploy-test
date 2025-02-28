import React, { useEffect, useState, useContext } from 'react';
import './Dashboard.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from "../context/AuthContext";
import AddDoctorPopup from '../components/AddDoctorPopup';
import { ToastContainer } from 'react-toastify';

function Dashboard() {
  const { role, id } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [clinicData, setClinicData] = useState(null);
  const [doctors, setDoctors] = useState([]);  
  const [appointments, setAppointments] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (role === "Patient") {
          // Fetch patient details
          const response = await axios.get(`http://localhost:5000/getuser?id=${id}`);
          setUserData(response.data);

          // Fetch patient appointments
          const appointmentResponse = await axios.get(`http://localhost:5000/bookings/patient/${id}`);
          setAppointments(appointmentResponse.data);

          // Fetch clinic and doctor details for each appointment
          const clinicPromises = appointmentResponse.data.map(async (appointment) => {
            const clinicRes = await axios.get(`http://localhost:5000/getclinic?id=${appointment.clinicId}`);
            return { ...appointment, clinic: clinicRes.data };
          });

          const updatedAppointments = await Promise.all(clinicPromises);
          setAppointments(updatedAppointments);

          // Fetch unique doctors for these appointments
          const doctorIds = [...new Set(updatedAppointments.map(a => a.doctorId))];
          const doctorResponses = await Promise.all(doctorIds.map(id => axios.get(`http://localhost:5000/getdoctor?id=${id}`)));
          setDoctors(doctorResponses.map(res => res.data));
        }

        if (role === "Clinic") {
          // Fetch clinic details
          const clinicResponse = await axios.get(`http://localhost:5000/getclinic?id=${id}`);
          setClinicData(clinicResponse.data);

          // Fetch doctors associated with this clinic
          const doctorsResponse = await axios.get(`http://localhost:5000/getdoctorclinic?clinicId=${id}`);
          setDoctors(doctorsResponse.data);
        }
      } catch (err) {
        setError("Failed to fetch data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, role]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <ToastContainer />
      <main>
        {role === "Clinic" ? (
          <div className="clinicdash">
            <div className="banner">
              <h1>{clinicData?.name}</h1>
              <p className="clinicDetails">Address: {clinicData?.address}</p>
              <p className="clinicDetails">Contact: <Link to={'tel:' + clinicData?.mobileNo}>{clinicData?.mobileNo}</Link></p>
              <p className="clinicDetails">Email: <Link to={'mailto:' + clinicData?.email}>{clinicData?.email}</Link></p>
              <p className="clinicDetails">Timing: {clinicData?.clinicTimings?.from} - {clinicData?.clinicTimings?.to}</p>
            </div>

            <div className="Doctors">
              <button onClick={() => setShowPopup(true)} className='login_btn butn'>Add Doctor</button>
              {showPopup && <AddDoctorPopup onClose={() => setShowPopup(false)} />}

              <section className="doctors">
                <h2>Doctors</h2>
                {doctors.length > 0 ? (
                  <ul>
                    {doctors.map(doctor => (
                      <li key={doctor._id}>
                        <p><strong>Name:</strong> Dr. {doctor.name}</p>
                        <p><strong>Email:</strong> {doctor.email}</p>
                        <p><strong>Specialization:</strong> {doctor.specialization}</p>
                        <p><strong>Availability:</strong></p>
                        <ul>
                          {doctor.clinics
                            .find(c => c.clinic === id)?.availability.map((slot, index) => (
                              <li key={index}>
                                {slot.day}: {slot.startTime} - {slot.endTime}
                              </li>
                            ))}
                        </ul>
                        <p><strong>Fees:</strong> {doctor.fees}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No doctors available.</p>
                )}
              </section>
            </div>
          </div>
        ) : role === "Patient" ? (
          <div className="banner">
            <h1>Welcome, {userData?.name}!</h1>
            <p className="patientDetails">D.O.B: {userData?.dateOfBirth}</p>
            <p className="patientDetails">Gender: {userData?.gender}</p>
            <p className="patientDetails">Email: <Link to={'mailto:' + userData?.email}>{userData?.email}</Link></p>

            {/* Appointments Section */}
            <section className="appointments">
              <h2>Your Appointments</h2>
              {appointments.length > 0 ? (
                <ul>
                  {appointments.map(appointment => (
                    <li key={appointment._id} className="appointmentCard">
                      <p><strong>Clinic:</strong> {appointment.clinic?.name}</p>
                      <p><strong>Doctor:</strong> {doctors.find(doc => doc._id === appointment.doctorId)?.name}</p>
                      <p><strong>Date:</strong> {appointment.appointmentDate}</p>
                      <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No appointments booked.</p>
              )}
            </section>
          </div>
        ) : (
          <p>Login to view Dashboard</p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;
