import express from 'express';

import { getUsers,
        sendChangePasswordLink,
        changePassword,
        sendChangeEmailOTP,
        changeEmailAddress,
        getUser,
        editUser,
        suggestionCount,
        suggestUsers,
        sendInterest,
        interestCount,
        getAllinterests,
        acceptinterests,
        acceptedInterestList,
        addPreference} from '../controllers/userController.js';
   import { getPlansForUser } from '../controllers/planController.js';
   import { getCheckOutSession,addSubscription } from '../controllers/subscriptionController.js';
   

import { verifyToken } from '../middleware/verifyUser.js';
import { verifyBlocked } from '../middleware/blockedUserMiddleware.js';
const router = express.Router();
  
router.get('/',getUsers)
router.post('/sendChangePasswordLink',sendChangePasswordLink)
router.post('/changePassword',changePassword)
router.post('/sendChangeEmailOTP',sendChangeEmailOTP)
router.post('/changeEmailAddress',changeEmailAddress)
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






export default router;