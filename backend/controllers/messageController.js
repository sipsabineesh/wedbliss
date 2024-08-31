import { Mongoose } from 'mongoose';
import Message from '../models/messageModel.js'
import Conversation from '../models/conversationModel.js'


export const addMessage= async(req,res,next) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    await Conversation.findByIdAndUpdate(req.body.conversationId, { updatedAt: Date.now() });
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getMessage= async(req,res,next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const updateReadMessage= async(req,res,next) => {
  try {
    const result = await Message.updateMany(
      { conversationId: req.params.conversationId },
      { $set: { read: true } }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
}

