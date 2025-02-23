const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const ClinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  clinicTimings: {
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

ClinicSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const Clinic = mongoose.model('clinic_data', ClinicSchema);

module.exports = Clinic;
