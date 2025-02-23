const Clinic = require("../models/Clinic");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.clinicVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const clinic = await Clinic.findById(data.id)
      if (clinic) return res.json({ status: true, clinic: clinic.name})
      else return res.json({ status: false })
    }
  })
}