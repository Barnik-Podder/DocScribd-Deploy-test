import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './SignupClinic.css';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Signupclinic() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        name: "",
        address: "",
        mobileNo: "",
        email: "",
        password: "",
        clinicTimings: { from: "", to: "" },
        latitude: "",
        longitude: ""
    });
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);

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
                `http://localhost:5000/clinic`,
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
            handleError("An error occurred during signup.");
        }
    }

    const onChange = (event) => {
        if (event.target.name === "from" || event.target.name === "to") {
            setCredentials({
                ...credentials,
                clinicTimings: {
                    ...credentials.clinicTimings,
                    [event.target.name]: event.target.value
                }
            });
        } else {
            setCredentials({ ...credentials, [event.target.name]: event.target.value });
        }
    }

    // Geolocation Handler
    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            handleError("Geolocation is not supported by your browser.");
            return;
        }

        setIsFetchingLocation(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setCredentials((prev) => ({
                    ...prev,
                    latitude,
                    longitude
                }));
                handleSuccess("Lat and Long fetched successfully!");
                if (credentials.address === "") {
                    // Reverse Geocode to get Address
                    try {
                        const response = await axios.get(
                            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                        );
                        setCredentials((prev) => ({
                            ...prev,
                            address: response.data.display_name || "Address not found"
                        }));
                        handleSuccess("Location fetched successfully!");
                    } catch (error) {
                        console.error("Reverse Geocoding Error:", error);
                        handleError("Unable to fetch address.");
                    }

                    setIsFetchingLocation(false);
                }
                setIsFetchingLocation(false);
            },
            (error) => {
                console.error("Geolocation Error:", error);
                handleError("Unable to fetch your location.");
                setIsFetchingLocation(false);
            }
        );
    };

    return (
        <>
            <div><Navbar /></div>
            <main className='main'>
                <form className='signup_clinic' onSubmit={handleSubmit}>
                    <label htmlFor="name">Clinic Name</label>
                    <input className='name field' type='text' id='name' name='name' value={credentials.name} placeholder='Enter Clinic Name' onChange={onChange} autoComplete="on" />

                    <label htmlFor="address">Address</label>
                    <input className='address field' type='text' name='address' id='address' value={credentials.address} placeholder='Enter Clinic Address' onChange={onChange} autoComplete="on"/>
                    <button type="button" className="butn signup_btn" onClick={handleUseMyLocation} disabled={isFetchingLocation}>
                        {isFetchingLocation ? "Fetching Location..." : "Use My Location"}
                    </button>

                    <label htmlFor="mobileNo">Mobile No.</label>
                    <input className='mobileNo field' type='text' id='mobileNo' name='mobileNo' value={credentials.mobileNo} placeholder='Enter Clinic Mobile No.' onChange={onChange} autoComplete="on" />

                    <label htmlFor="email">Email</label>
                    <input className='email field' type='email' name='email' id='email' placeholder='Enter Clinic Email' value={credentials.email} onChange={onChange} autoComplete="on"  />

                    <label htmlFor="password">Password</label>
                    <input className='password field' type='password' name='password' id='password' placeholder='Enter Clinic Password' value={credentials.password} onChange={onChange} />

                    <label>Clinic Timing</label>
                    <div className='clinicTiming'>
                        <label htmlFor="from">From</label>
                        <input className='from field' type='time' id='from' name='from' value={credentials.clinicTimings.from} onChange={onChange} />
                        <label htmlFor="to">To</label>
                        <input className='to field' type='time' id='to' name='to' value={credentials.clinicTimings.to} onChange={onChange} />
                    </div>

                    <input type="submit" className="butn login_btn" value="Register Clinic" />
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
                <ToastContainer />
            </main>
            <div><Footer /></div>
        </>
    );
}
