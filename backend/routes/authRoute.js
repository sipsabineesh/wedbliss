import express from 'express'
import { signup,login,logout, otpVerify } from '../controllers/authController.js';
const router = express.Router();
router.post('/signup',signup)
router.post('/otpVerify',otpVerify)
router.post('/login',login)
router.get('/logout',logout)

export default router;
