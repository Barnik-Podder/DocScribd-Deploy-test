import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Signup.css'
import clinic from '../images/clinic.png'
import patient from '../images/patient.jpg'
import { Link } from 'react-router-dom'

export default function Signup() {
    return (
        <>
            <div><Navbar /></div>
            <main>
                <div className="container-signup">
                    <Link to="/signup-clinic" className='clinic'>
                        <img src={clinic} alt="clinic" />
                        <h2>Register a Clinic</h2>
                    </Link>
                    <Link to="/signup-patient" className='patient'>
                        <img src={patient} alt="patient" />
                        <h2>I am a Patient</h2>
                    </Link>
                </div>
            </main>
            <div><Footer /></div>
        </>
    )
}
