const { SignupPatient, SignupClinic } = require('../controllers/Signup');
const { Login } = require('../controllers/Login');
const { userVerification } = require('../middlewares/Auth');
const { getAllClinics } = require('../controllers/GetClinic');
const { getUser } = require('../controllers/GetPatient');
const { addDoctor } = require('../controllers/AddDoc');
const { getDoctor, getDoctorsByClinic } = require('../controllers/GetDoc');
const router = require('express').Router();

router.post('/signup', SignupPatient)
router.post('/clinic', SignupClinic)
router.post('/login', Login)
router.post('/authuser', userVerification)
router.post('/adddoctor', addDoctor)
router.get('/getclinic', getAllClinics)
router.get('/getdoctor', getDoctor)
router.get('/getdoctorclinic', getDoctorsByClinic)
router.get('/getuser', getUser)

module.exports = router