import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DoctorCard from "../components/DoctorCard"; // Import DoctorCard component
import './ClinicDetails.css';
import { ToastContainer } from "react-toastify";

const ClinicDetails = () => {
    const { id } = useParams();
    const [clinic, setClinic] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDay, setSelectedDay] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClinic = async () => {
            try {
                const clinicResponse = await axios.get(`${process.env.REACT_APP_API_URI}/getclinic?id=${id}`);
                setClinic(clinicResponse.data);

                const doctorResponse = await axios.get(`${process.env.REACT_APP_API_URI}/getdoctorclinic?clinicId=${id}`);
                
                    setDoctors(doctorResponse.data);
                    setFilteredDoctors(doctorResponse.data);
                

            } catch (err) {
                setError("Failed to fetch clinic details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClinic();
    }, [id]);

    // Function to filter doctors based on search input
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchTerm(query);
        filterDoctors(query, selectedDay);
    };

    // Function to filter doctors based on selected day
    const handleDayFilter = (event) => {
        const day = event.target.value;
        setSelectedDay(day);
        filterDoctors(searchTerm, day);
    };

    // Filter doctors based on name and selected day
    const filterDoctors = (query, day) => {
        let filtered = doctors;

        if (query) {
            filtered = filtered.filter(doctor =>
                doctor.name.toLowerCase().includes(query) ||
                doctor.specialization.toLowerCase().includes(query)
            );
        }

        if (day) {
            filtered = filtered.filter(doctor =>
                doctor.clinics.find(c => c.clinic === id)?.availability.some(slot => slot.day === day)
            );
        }

        setFilteredDoctors(filtered);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <div><Navbar /></div>
            <ToastContainer />
            <div className="details">
                <div className="alignleft">
                    <h1>{clinic.name}</h1>
                    <p className="clinicDetails">Address: {clinic.address}</p>
                    <p className="clinicDetails">Contact: <Link to={'tel:' + clinic.mobileNo}>{clinic.mobileNo}</Link></p>
                    <p className="clinicDetails">Email: <Link to={'mailto:' + clinic.email}>{clinic.email}</Link></p>
                    <p className="clinicDetails">Timing: {clinic.clinicTimings.from} - {clinic.clinicTimings.to}</p>
                </div>

                <iframe title="address" src={"https://www.google.com/maps?q=" + clinic.address + "&output=embed"}></iframe>
            </div>

            {/* Search and Filter Section */}
            <div className="search-filter">
                <input
                    type="text"
                    placeholder="Search doctor by name or specialization..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="field"
                />
                <select onChange={handleDayFilter} className="field">
                    <option value="">Filter by Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>
            </div>

            {/* Doctors Section */}
            <section className="doctorcard">
                <h2>Doctors</h2>
                {filteredDoctors.length > 0 ? (
                    <ul>
                        {filteredDoctors.map(doctor => (
                            <DoctorCard key={doctor._id} doctor={doctor} clinicId={id} />
                        ))}
                    </ul>
                ) : (
                    <p>No doctors available.</p>
                )}
            </section>

            <div><Footer /></div>
        </>
    );
};

export default ClinicDetails;
