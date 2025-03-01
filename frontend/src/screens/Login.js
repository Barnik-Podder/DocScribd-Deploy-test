import React, { useState } from 'react';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import { useCookies } from 'react-cookie';


export default function Login() {
  const navigate = useNavigate();
  // const [cookies, setCookies] = useCookies([]);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ role: "", email: "", password: "" });
  const togglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URI}/login`,
        {
          ...credentials,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        // setCookies("role", credentials.role)
        setTimeout(() => {
          navigate("/")
        }, 1000);
      } else {
        handleError(message);
      }
      // }
    } catch (error) {
      console.log(error);
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div><Navbar /></div>
      <main>
        <div className='container'>
          <h1>LOGIN</h1>
          <p className='welcome'>Welcome back to DocScribd!!</p>
          <form onSubmit={handleSubmit}>
            <select id="role" name="role" className='field' value={credentials.role} onChange={onChange}>
              <option value=" ">--Select a option--</option>
              <option value="Clinic">Clinic</option>
              <option value="Patient">Patient</option>

            </select>
            <input
              type="email"
              className="email field"
              name="email"
              placeholder="Enter your email here"
              value={credentials.email}
              onChange={onChange}
            />
            <div className='password-eye'>
              <input
                type={showPassword ? "text" : "password"}
                className="password field"
                name="password"
                id="password"
                placeholder="Enter your password here"
                value={credentials.password}
                onChange={onChange}
              />
              <span className="eye" onClick={togglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <input type="submit" className="butn login_btn" value="Login" />
          </form>
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
        <ToastContainer />
      </main>
      <div><Footer /></div>
    </>
  );
}