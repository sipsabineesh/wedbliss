import express from 'express';

import { getUsers,
        getUserDetails,
        sendChangePasswordLink,
        changePassword,
        sendChangeEmailOTP,
        changeEmailAddress,
        getUser,
        addUser,
        editUser,
        suggestionCount,
        suggestUsers,
        sendInterest,
        interestCount,
        getAllinterests,
        acceptinterests,
        acceptedInterestList,
        addPreference,
        getContactDetails,
        blockMemberProfile,
        unblockMemberProfile,
        reportAbuse,
        viewUserPlanDetails,
        advancedSearch } from '../controllers/userController.js';
   import { getPlansForUser } from '../controllers/planController.js';
   import { getCheckOutSession,addSubscription } from '../controllers/subscriptionController.js';
   import { getRenewalNotification,getNotification,updateViewedNotification } from '../controllers/notificationController.js'
   

import { verifyToken } from '../middleware/verifyUser.js';
import { verifyBlocked } from '../middleware/blockedUserMiddleware.js';
const router = express.Router();
  
router.get('/',getUsers)
router.get('/userDetails', getUserDetails);
      
router.post('/sendChangePasswordLink',sendChangePasswordLink)
router.post('/changePassword',changePassword)
router.post('/sendChangeEmailOTP',sendChangeEmailOTP)
router.post('/changeEmailAddress',changeEmailAddress)  
router.post('/addProfile',addUser)
router.get('/getUser/:id',verifyBlocked,getUser)
router.put('/editProfile/:id',verifyBlocked,editUser)
router.get('/getSuggestionsCount/:id',verifyBlocked,suggestionCount)
router.get('/getSuggestions/:id',verifyBlocked,suggestUsers)
router.put('/sendInterest/:id',verifyBlocked,sendInterest)
router.get('/checkInterest/:id',verifyBlocked,interestCount)
router.get('/getInterests/:id',verifyBlocked,getAllinterests)
router.put('/acceptInterest/:id',verifyBlocked,acceptinterests)
router.get('/getAcceptList/:id',verifyBlocked,acceptedInterestList)
router.get('/getPlans',getPlansForUser)
router.post('/createCheckoutSession',getCheckOutSession)
router.post('/addSubscription',addSubscription)
router.post('/addPreference',addPreference)
router.post('/getContactDetails',getContactDetails)
router.get('/getRenewalNotification/:id',getRenewalNotification)
router.get('/getNotification/:notificationId',getNotification)
router.put('/updateViewed/:notificationId',updateViewedNotification)
router.put('/blockMemberProfile/:id',verifyBlocked,blockMemberProfile)
router.put('/unblockMemberProfile/:id',verifyBlocked,unblockMemberProfile)
router.post('/reportAbuse',reportAbuse)
router.get('/viewUserPlan/:id',viewUserPlanDetails)
router.get('/advancedSearch/:id', verifyBlocked,advancedSearch);



export default router;