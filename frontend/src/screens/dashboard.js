import React from 'react'
// import { useCookies } from 'react-cookie'
// import { Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  // const navigate = useNavigate();
  // const cookies = useCookies();
  // const {username} = useContext(AuthContext);
  return (
    <>
      <div><Navbar /></div>
      <main>

      </main>
      <div><Footer /></div>
    </>
  )
}

export default Dashboard
