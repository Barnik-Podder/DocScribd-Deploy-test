import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './ClinicDetails.css'

const ClinicDetails = () => {
    const { id } = useParams();
    const [clinic, setClinic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClinic = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getclinic?id=${id}`);
                setClinic(response.data);
            } catch (err) {
                setError("Failed to fetch clinic details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClinic();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <div><Navbar /></div>
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
            <div><Footer /></div>
        </>

    );
};

export default ClinicDetails;
