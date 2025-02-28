import React, { useState, useContext } from 'react';
import axios from 'axios';
import './AddDoctorPopup.css';
import { AuthContext } from '../context/AuthContext';
import { FaTimes } from 'react-icons/fa';

const AddDoctorPopup = ({ onClose }) => {
    const { id } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        registration: '',
        name: '',
        email: '',
        specialization: '',
        clinics: [{
            clinic: id,
            availability: [{ day: '', startTime: '', endTime: '' }]
        }],
        fees: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAvailabilityChange = (index, field, value) => {
        const updatedClinics = [...formData.clinics];
        updatedClinics[0].availability[index][field] = value;
        setFormData(prevState => ({ ...prevState, clinics: updatedClinics }));
    };

    const addAvailability = () => {
        setFormData(prevState => ({
            ...prevState,
            clinics: [{
                ...prevState.clinics[0],
                availability: [...prevState.clinics[0].availability, { day: '', startTime: '', endTime: '' }]
            }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting data:", formData); // Debugging

            const response = await axios.post('http://localhost:5000/adddoctor', formData);
            alert(response.data.message);
            onClose();
        } catch (error) {
            console.error('Error adding doctor:', error.response?.data || error.message);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="doc-top">
                    <h2>Add Doctor</h2>
                    <button onClick={onClose} className="close"><FaTimes /></button>
                </div>
                <form onSubmit={handleSubmit}>

                    <input type="text" name="registration" placeholder="Registration Number" value={formData.registration} onChange={handleChange} required />
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="text" name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} required />
                    <input type="number" name="fees" placeholder="Fees" value={formData.fees} onChange={handleChange} required />

                    {formData.clinics[0].availability.map((slot, index) => (
                        <div key={index}>
                            <select value={slot.day} onChange={(e) => handleAvailabilityChange(index, 'day', e.target.value)} required>
                                <option value="">--Select a day--</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                            <input type="time" value={slot.startTime} onChange={(e) => handleAvailabilityChange(index, 'startTime', e.target.value)} required />
                            <input type="time" value={slot.endTime} onChange={(e) => handleAvailabilityChange(index, 'endTime', e.target.value)} required />
                        </div>
                    ))}

                    <button type="button" onClick={addAvailability}>Add Availability</button>
                    <button type="submit">Add Doctor</button>
                </form>
            </div>
        </div>
    );
};

export default AddDoctorPopup;
