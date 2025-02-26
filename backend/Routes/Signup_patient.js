const { SignupPatient, SignupClinic } = require('../controllers/Signup');
const { Login } = require('../controllers/Login');
const { userVerification } = require('../middlewares/Auth');
const { getAllClinics } = require('../controllers/GetClinic');
const { getUser } = require('../controllers/GetPatient');
const router = require('express').Router();

router.post('/signup', SignupPatient)
router.post('/clinic', SignupClinic)
router.post('/login', Login)
router.post('/authuser', userVerification)
router.get('/getclinic', getAllClinics)
router.get('/getuser', getUser)

module.exports = router