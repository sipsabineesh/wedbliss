import express from 'express'
import { getAllDetails,getUser,getUsers,verifyUser,blockUnblockUser } from '../controllers/adminController.js';
import { getPlans,createPlan,editPlan,deletePlan } from '../controllers/planController.js'
import { getSubscriptions,approveSubscription } from '../controllers/subscriptionController.js';
import { getNotification,getRenewalNotificationsForAdmin } from '../controllers/notificationController.js'
import { getUserStats,getPlanSelectionStats,getSubscriptionStats,getUserGrowthStats,getPlanDistributionStats,getAgeStats,getCountryStats,getRegistrationVsSubscriptionStats,getRevenueStats} from '../controllers/analyticController.js'

const router = express.Router();

router.get('/dashboard',getAllDetails)
router.get('/userStats',getUserStats)
router.get('/planSelectionStats',getPlanSelectionStats);
router.get('/subscriptionStats', getSubscriptionStats);
router.get('/userGrowthStats', getUserGrowthStats);
router.get('/planDistributionStats', getPlanDistributionStats);
router.get('/ageStats', getAgeStats);
router.get('/countryStats', getCountryStats);
router.get('/registrationVsSubscriptionStats', getRegistrationVsSubscriptionStats);
router.get('/revenueTrends', getRevenueStats)


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