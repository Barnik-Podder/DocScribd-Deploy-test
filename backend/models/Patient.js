const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const PatientSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    gender:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
},{
    versionKey: false
});

PatientSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

module.exports = mongoose.model('patient_data',PatientSchema);