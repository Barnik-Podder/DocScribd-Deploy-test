const { SignupPatient, SignupClinic } = require('../controllers/Signup');
const { Login } = require('../controllers/Login');
const { userVerification } = require('../middlewares/PatientAuth');
const { clinicVerification } = require('../middlewares/ClinicAuth');
const { getAllClinics } = require('../controllers/GetClinic');
const router = require('express').Router();

router.post('/signup', SignupPatient)
router.post('/clinic', SignupClinic)
router.post('/login', Login)
router.post('/authuser', userVerification)
router.post('/authclinic', clinicVerification)
router.get('/getclinic', getAllClinics)

module.exports = router