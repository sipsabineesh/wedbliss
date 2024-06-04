import express from 'express'
import { getUser,getUsers,verifyUser,blockUnblockUser } from '../controllers/adminController.js';
import { getPlans,createPlan,editPlan,deletePlan } from '../controllers/planController.js'
import { getSubscriptions,approveSubscription } from '../controllers/subscriptionController.js';
const router = express.Router();

router.get('/viewUsers',getUsers)
router.put('/verifyUser',verifyUser)
router.put('/blockUnblockUser',blockUnblockUser)
router.get('/viewPlans',getPlans)
router.post('/createPlan',createPlan) 
router.put('/editPlan',editPlan)
router.put('/deletePlan',deletePlan);
router.get('/viewSubscription',getSubscriptions)
router.put('/approveSubscription',approveSubscription)
router.get('/getUser/:id',getUser)

export default router