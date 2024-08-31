import { Mongoose } from 'mongoose';
import Message from '../models/messageModel.js'
import User from '../models/userModel.js'
import Conversation from '../models/conversationModel.js'
import Subscription from '../models/subscriptionModel.js'

export const addConversation = async(req,res,next) => {
let userId = req.body.senderId
  let conversation = await Conversation.findOne({
    members: { $all: [req.body.senderId, req.body.receiverId] }
  });
 
  if (!conversation) {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (!user.isSubscribed) {
      return res.status(403).json({ message: 'User is not subscribed.' });
    }
    try {
      const plan = await Subscription.findOne({ userId });
      if (!plan) {
        return res.status(404).json({ message: 'No subscription plan found.' }); 
      }
  
      if (plan.remainingMessages <= 0) {
        return res.status(403).json({ message: 'No remaining messages in your plan.' });
      }
  
      
    await Subscription.updateOne({ userId }, { $inc: { remainingMessages: -1 } });

      const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
      });
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } 
catch (err) {
      res.status(500).json(err);
    }
  }else {
    res.status(200).json(conversation);
  }
  }

  export const getConversation = async(req,res,next) => {
    try {
       const userId = req.params.userId
      const conversation = await Conversation.find({
        members: { $in: [userId] },
      });

      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  }  

  export const getUsersConversation = async(req,res,next) => {
 
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
  export const updateLastMessage = async(req,res,next) => {
    try {
      const conversationId = req.params.conversationId;
     const lastMessage = req.body;
      const result = await Conversation.updateOne(
        { _id: conversationId },
        { $set: { lastMessage: req.body.text } },
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }