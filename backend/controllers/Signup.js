const User = require("../models/Patient");
const Clinic = require("../models/Clinic");

module.exports.SignupPatient = async (req, res, next) => {
    try {
        const { name, gender, dateOfBirth, email, password } = req.body;

        // Check if all required fields are provided
        if (!name || !gender || !dateOfBirth || !email || !password) {
            return res.json({ message: "All fields are required" });
        }

        // Check if email is valid
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.json({ message: "Invalid email format" });
        }

        // Check if password is at least 6 characters long
        if (password.length < 6) {
            return res.json({ message: "Password must be at least 6 characters long" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }

        // Create a new user
        await User.create({
            name,
            gender,
            dateOfBirth,
            email,
            password
        });

        // Send response
        res.status(201).json({ message: "Signed up, login now", success: true });
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports.SignupClinic = async (req, res, next) => {
    try {
        const { name, address, mobileNo, email, password, clinicTimings, latitude, longitude } = req.body;

        // Check if all required fields are provided
        if (!name || !address || !mobileNo || !email || !password || !clinicTimings) {
            return res.json({ message: "All fields are required" });
        }

        // Check if email is valid
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.json({ message: "Invalid email format" });
        }

        // Check if password is at least 6 characters long
        if (password.length < 6) {
            return res.json({ message: "Password must be at least 6 characters long" });
        }

        // Check if the email already exists
        const existingEmail = await Clinic.findOne({ email });
        if (existingEmail) {
            return res.json({ message: "Email is already registered" });
        }

        // Check if the mobile number already exists
        const existingMobile = await Clinic.findOne({ mobileNo });
        if (existingMobile) {
            return res.json({ message: "Mobile number is already registered" });
        }

        // Create a new clinic entry
        await Clinic.create({
            name,
            address,
            mobileNo,
            email,
            password,
            clinicTimings,
            latitude,
            longitude
        });

        // Send response
        res.status(201).json({ message: "Signed up, login now", success: true });
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

