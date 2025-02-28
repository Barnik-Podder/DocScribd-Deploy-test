const Doctor = require('../models/Doctor');

module.exports.addDoctor = async (req, res) => {
  try {
    const { registration, name, email, specialization, clinics, fees } = req.body;

    // Validate required fields
    if (!registration || !name || !email || !specialization || !clinics || !fees || !Array.isArray(clinics)) {
      return res.status(400).json({ message: "All fields are required, and clinics must be an array." });
    }

    let doctor = await Doctor.findOne({ registration });

    if (doctor) {
      clinics.forEach(({ clinic, availability }) => {
        const clinicIndex = doctor.clinics.findIndex(c => c.clinic.toString() === clinic);
        
        if (clinicIndex !== -1) {
          // Ensure no duplicate availability is added
          availability.forEach(newSlot => {
            if (!doctor.clinics[clinicIndex].availability.some(existingSlot =>
              existingSlot.day === newSlot.day &&
              existingSlot.startTime === newSlot.startTime &&
              existingSlot.endTime === newSlot.endTime
            )) {
              doctor.clinics[clinicIndex].availability.push(newSlot);
            }
          });
        } else {
          // Add a new clinic entry with availability
          doctor.clinics.push({ clinic, availability });
        }
      });
    } else {
      // Create a new doctor entry
      doctor = new Doctor({ registration, name, email, specialization, clinics, fees });
    }

    await doctor.save();
    res.status(201).json({ message: "Doctor added successfully!", doctor });

  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
