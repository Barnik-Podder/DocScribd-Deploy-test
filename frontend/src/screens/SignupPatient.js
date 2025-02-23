import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './SignupPatient.css';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Signuppatient() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", dateOfBirth: "", gender: "" });


    const handleError = (err) =>
        toast.error(err, {
          position: "bottom-left",
        });
      const handleSuccess = (msg) =>
        toast.success(msg, {
          position: "bottom-right",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/signup`,
                {
                    ...credentials,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
    }

        const onChange = (event) => {
            setCredentials({ ...credentials, [event.target.name]: event.target.value })
        }

        return (
            <>
                <div><Navbar /></div>
                <main className='main'>
                    <form className='signup_patient' onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input className='name field' type='text' id='name' name='name' value={credentials.name} placeholder='Enter your name' onChange={onChange} />
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" className='field' value={credentials.gender} onChange={onChange}>
                            <option value=" ">--Select a option--</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="others">Others</option>
                        </select>
                        <label htmlFor="dateOfBirth">D.O.B</label>
                        <input className='date field' type='date' name='dateOfBirth' id='dateOfBirth' value={credentials.dateOfBirth} onChange={onChange} />
                        <label htmlFor="email">Email</label>
                        <input className='email field' type='email' name='email' id='email' placeholder='Enter your email' value={credentials.email} onChange={onChange} />
                        <label htmlFor="password">Password</label>
                        <input className='password field' type='password' name='password' id='password' placeholder='Enter your password' value={credentials.password} onChange={onChange} />
                        <input type="submit" className="butn login_btn" />
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </form>
                    <ToastContainer />
                </main>
                <div><Footer /></div>
            </>
        )
    }
