import express from 'express'
import { getAllDetails,getUser,getUsers,verifyUser,blockUnblockUser } from '../controllers/adminController.js';
import { getPlans,createPlan,editPlan,deletePlan } from '../controllers/planController.js'
import { getSubscriptions,approveSubscription } from '../controllers/subscriptionController.js';
import { getNotification,getRenewalNotificationsForAdmin } from '../controllers/notificationController.js'

const router = express.Router();

router.get('/dashboard',getAllDetails)
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
router.get('/getNotification/:notificationId',getNotification)
router.get('/getRenewalNotifications',getRenewalNotificationsForAdmin)


export default router