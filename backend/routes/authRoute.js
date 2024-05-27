import express from 'express'
import { signup,google,login,logout, otpVerify,resendOTP } from '../controllers/authController.js';
const router = express.Router();
router.post('/signup',signup)
router.post('/google',google)
router.post('/otpVerify',otpVerify)
router.post('/resendotp',resendOTP)
router.post('/login',login)
router.get('/logout',logout)

export default router;
