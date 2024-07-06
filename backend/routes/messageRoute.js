import express from 'express';
import {addMessage,getMessage,updateReadMessage} from '../controllers/messageController.js'
const router = express.Router();

router.post("/", addMessage)
router.get("/:conversationId",getMessage)
router.put("/:conversationId",updateReadMessage)
 
export default router; 