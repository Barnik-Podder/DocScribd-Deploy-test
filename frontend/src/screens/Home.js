import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ClinicCard from "../components/ClinicCard";
import axios from "axios";
import "./Home.css";

export default function Home() {
  const [clinics, setClinics] = useState([]);
  const [filteredClinics, setFilteredClinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getclinic`);
        setClinics(response.data);
        setFilteredClinics(response.data);
        const uniqueLocations = [...new Set(response.data.map((clinic) => clinic.address))];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    };

    fetchClinics();
  }, []);

  // Real-time Filtering Logic
  useEffect(() => {
      const filtered = clinics.filter((clinic) => {
      const matchesName = clinic.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = locationFilter ? clinic.address === locationFilter : true;
      return matchesName && matchesLocation;
    });
    setFilteredClinics(filtered);
  }, [searchTerm, locationFilter, clinics]);

  // Get User's Current Location
  const handleNearMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // setUserLocation({ latitude, longitude });

          // Filter clinics within 10 km
          const nearbyClinics = clinics.filter((clinic) => {
            if (clinic.latitude && clinic.longitude) {
              const distance = calculateDistance(
                latitude,
                longitude,
                clinic.latitude,
                clinic.longitude
              );
              return distance <= 10; // Clinics within 10 km
            }
            return false;
          });

          setFilteredClinics(nearbyClinics);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to access your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Calculate Distance Between Two Coordinates (Haversine Formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  return (
    <div>
      <Navbar />

      {/* Search, Location Dropdown & Near Me Button */}
      <div className="search">
        <input
          style={{ width: "35%" }}
          type="search"
          className="field"
          placeholder="Search clinics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          style={{ width: "25%", marginLeft: "10px" }}
          className="field"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="butn signup_btn"
          style={{ marginLeft: "10px" }}
          onClick={handleNearMe}
        >
          Near Me
        </button>
      </div>

      {/* Clinics Section */}
      <section className="clinics">
        {filteredClinics.length > 0 ? (
          filteredClinics.map((clinic) => (
            <ClinicCard key={clinic._id} clinic={clinic} />
          ))
        ) : (
          <p>No clinics found.</p>
        )}
      </section>
      <main>
        <div className="image">
          <img src="./images/doctor.png" alt="doctor_image" className="doctor_img"
            srcSet="https://png.pngtree.com/png-vector/20230929/ourmid/pngtree-indian-doctors-isolated-png-image_10130117.png"
            draggable="false" />
        </div>
        <div className="text">
          <p className="bold_poetsen" >LET'S MAKE</p>
          <p className="tagline">Healthcare <em>Paperless</em> <br />Keep better track of <em>patients' case
            history.</em><br />Now only with <b>DocScribd!!</b></p>
        </div>
      </main>
      <div><Footer /></div>
    </div>
  )
}