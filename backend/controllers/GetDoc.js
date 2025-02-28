const Doctor = require("../models/Doctor");

module.exports.getDoctor = async (req, res) => {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "Doctor ID is required" });

    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) return res.status(404).json({ error: "Doctor not found" });

        res.json(doctor);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getDoctorsByClinic = async (req, res) => {
    try {
        const { clinicId } = req.query;
        if (!clinicId) {
            return res.status(400).json({ error: "Clinic ID is required" });
        }

        // Find doctors who are associated with the given clinicId
        const doctors = await Doctor.find({ "clinics.clinic": clinicId });

        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctors by clinic:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
