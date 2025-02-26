import React, { useEffect, useState, useContext } from 'react'

import axios from "axios";
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { role, id } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (role === "Patient") {
          const response = await axios.get(`http://localhost:5000/getuser?id=${id}`);
          setData(response.data);
        }
        if (role === "Clinic") {
          const response = await axios.get(`http://localhost:5000/getclinic?id=${id}`);
          setData(response.data);
        }
      } catch (err) {
        setError("Failed to fetch clinic details.");
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
      <div><Navbar /></div>
      <main>
        {(role === "Clinic") ? (
          <div className="alignleft">
            <h1>{data.name}</h1>
            <p className="clinicDetails">Address: {data.address}</p>
            <p className="clinicDetails">Contact: <Link to={'tel:' + data.mobileNo}>{data.mobileNo}</Link></p>
            <p className="clinicDetails">Email: <Link to={'mailto:' + data.email}>{data.email}</Link></p>
            <p className="clinicDetails">Timing: {data.clinicTimings.from} - {data.clinicTimings.to}</p>
          </div>
        ) : (role === "Patient") ? (
          <div className="alignleft">
            <h1>Welcome, {data.name}!</h1>
            <p className="patientDetails">D.O.B: {data.dateOfBirth}</p>
            <p className="patientDetails">Gender: {data.gender}</p>
            <p className="patientDetails">Email: <Link to={'mailto:' + data.email}>{data.email}</Link></p>
            {/* <h2>Appointments</h2>
            <ul>
              {data.appointments.map((appointment, index) => (
                <li key={index}>
                  {appointment.date} - {appointment.time} with {appointment.doctor}
                </li>
              ))}
            </ul> */}
          </div>
        ) : (
          <p>Login to view Dashboard</p>
        )}


      </main>
      <div><Footer /></div>
    </>
  )
}

export default Dashboard
