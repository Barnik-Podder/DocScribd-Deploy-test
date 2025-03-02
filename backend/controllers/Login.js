const User = require("../models/Patient");
const Clinic = require("../models/Clinic");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Login = async (req, res, next) => {
  try {
    const { role, email, password } = req.body;
    if (!role || !email || !password) {
      return res.json({ message: 'All fields are required' })
    }
    if(role === "Patient"){
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ message: 'Incorrect password or email' })
      }
      const auth = await bcrypt.compare(password, user.password)
      if (!auth) {
        return res.json({ message: 'Incorrect password or email' })
      }
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: true,
        secure:true,
        sameSite: "None",
        domain: "docscribd.vercel.app"
      });
      res.status(201).json({ message: "User logged in successfully", success: true});
      next()
    }
    if(role === "Clinic"){
      const clinic = await Clinic.findOne({ email });
      if (!clinic) {
        return res.json({ message: 'Incorrect password or email' })
      }
      const auth = await bcrypt.compare(password, clinic.password)
      if (!auth) {
        return res.json({ message: 'Incorrect password or email' })
      }
      const token = createSecretToken(clinic._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: true,
        secure:true,
        sameSite: "None",
        domain: "docscribd.vercel.app"
      });
      res.status(201).json({ message: "Clinic logged in successfully", success: true});
      next()
    }
    
  } catch (error) {
    console.error(error);
  }
}