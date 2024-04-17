import express from 'express'
import { getUsers } from '../controllers/userController.js'
import { verifyUser,blockUnblockUser } from '../controllers/adminController.js';
import { getPlans,createPlan,editPlan,deletePlan } from '../controllers/planController.js'

const router = express.Router();

router.get('/viewUsers',getUsers)
router.put('/verifyUser',verifyUser)
router.put('/blockUnblockUser',blockUnblockUser)
router.get('/viewPlans',getPlans)
router.post('/createPlan',createPlan)
router.put('/editPlan',editPlan)
router.put('/deletePlan',deletePlan);

export default router