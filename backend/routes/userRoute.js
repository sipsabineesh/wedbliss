import express from 'express';
import { getUsers,
        editUser,
        suggestionCount,
        suggestUsers,
        sendInterest,
        interestCount,
        getAllinterests,
        acceptinterests,
        acceptedInterestList } from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyUser.js';
import { verifyBlocked } from '../middleware/blockedUserMiddleware.js';
const router = express.Router();

router.get('/',getUsers)
router.put('/editProfile/:id',verifyBlocked,editUser)
router.get('/getSuggestionsCount/:id',verifyBlocked,suggestionCount)
router.get('/getSuggestions/:id',verifyBlocked,suggestUsers)
router.put('/sendInterest/:id',verifyBlocked,sendInterest)
router.get('/checkInterest/:id',verifyBlocked,interestCount)
router.get('/getInterests/:id',verifyBlocked,getAllinterests)
router.put('/acceptInterest/:id',verifyBlocked,acceptinterests)
router.get('/getAcceptList/:id',verifyBlocked,acceptedInterestList)


export default router;