const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    registration: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    specialization: {
        type: String,
        required: true,
        trim: true
    },
    clinics: [{
        clinic: {
            type: String,
            required: true
        },
        availability: [{
            day: String,
            startTime: String,
            endTime: String
        }]
    }],
    fees:{
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Doctor = mongoose.model('doctor_data', doctorSchema);
module.exports = Doctor;
