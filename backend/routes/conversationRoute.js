import express from 'express';
import {addConversation,getConversation,getUsersConversation,updateLastMessage} from '../controllers/conversationController.js'
const router = express.Router();

router.post("/",addConversation)
router.get("/:userId",getConversation)
router.get("/find/:firstUserId/:secondUserId",getUsersConversation )
router.put("/:conversationId",updateLastMessage )

export default router; 