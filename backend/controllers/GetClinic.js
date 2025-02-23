const Clinic = require("../models/Clinic");

module.exports.getAllClinics = async (req, res) => {
    try {
      const clinics = await Clinic.find();
      res.status(200).json(clinics);
    } catch (error) {
      console.error("Error fetching clinics:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  