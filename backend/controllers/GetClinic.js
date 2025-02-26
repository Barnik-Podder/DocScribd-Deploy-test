const Clinic = require("../models/Clinic");

module.exports.getAllClinics = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const clinic = await Clinic.findById(id);

      if (clinic) {
        res.json(clinic);
      } else {
        res.status(404).json({ message: "Clinic not found" });
      }
    } else {
      const clinics = await Clinic.find();
      res.json(clinics);
    }
  } catch (error) {
    console.error("Error fetching clinics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

