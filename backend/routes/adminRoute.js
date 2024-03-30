import express from 'express'
import { getUsers } from '../controllers/userController.js'
import { verifyUser,blockUnblockUser } from '../controllers/adminController.js';
const router = express.Router();

router.get('/viewUsers',getUsers)
router.put('/verifyUser',verifyUser)
router.put('/blockUnblockUser',blockUnblockUser)
export default router