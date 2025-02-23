import React, { useRef, useContext } from 'react'
import './Navbar.css'
import { FaBars, FaTimes } from "react-icons/fa"
import { CgProfile } from "react-icons/cg";
import brandLogo from '../images/brand_logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import { ToastContainer } from "react-toastify";

export default function Navbar() {
  const navRef = useRef();
  const { username, logout } = useContext(AuthContext); 

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  

  return (
    <>
      <header>
        <ToastContainer />
        <div className="brand_logo">
          <Link to="/"><img src={brandLogo} draggable="false" className="brand_logo" alt="logo" /></Link>
        </div>
        <div className='wrap' ref={navRef}>
          <nav>
            <ul className="nav_links" onClick={showNavbar}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">About</Link></li>
              <li><Link to="/">Contact Us</Link></li>
            </ul>
          </nav>
          {username ?
            (
              <div className='btn'>
                <CgProfile className='CgProfile'/>
                <p>Welcome {username}!</p>
                <button className="login_btn butn" onClick={logout}>Logout</button>
              </div>

            ) : (
              <div className='btn'>
                <Link to="/login"><button className="login_btn butn">Login</button></Link>
                <Link to="/signup"><button className="signup_btn butn">Sign Up</button></Link>
              </div>
            )
          }

          <button onClick={showNavbar} className="nav-btn nav-close-btn">
            <FaTimes />
          </button>
        </div>
        <button onClick={showNavbar} className="nav-btn">
          <FaBars />
        </button>
      </header>
    </>
  )
}
