// import { Mongoose } from 'mongoose';
// import Message from '../models/messageModel.js'
// import Chat from '../models/chatModel.js'

    
// export const getChats = async(req,res,next) => {
//     try {
//         const userId = req.body.userId;
        
//         const users = await Chat.find({ users: userId }).sort({ _id: -1 });
    
//         res.status(200).json({ users });
//       } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Failed to get Chats" });
//       }
// }

// export const getChat = async(req,res,next) => {
//     try {
//         const { chatId, userId } = req.body;
    
//         if (!chatId || !userId) {
//           return res.status(400).json({ message: "chatId and userId are required" });
//         }
    
//         const chat = await Chat.findOne({ _id: chatId, users: { $elemMatch: { $eq: userId } } })
//                                .populate({
//                                  path: 'message',
//                                  options: { sort: { createdAt: 1 } } 
//                                });
    
//         if (!chat) {
//           return res.status(404).json({ message: "Chat not found or user not part of this chat" });
//         }
     
//         res.status(200).json({ updatedChat });
//       } catch (err) {
//         console.log(err)
//         res.status(500).json({message:"Failed to get Chats"});
//       } 
// }

 
// export const addChat = async(req,res,next) => {
//     try {
//         const { userId, receiverId } = req.body;

//     if (!userId || !receiverId) {
//       return res.status(400).json({ message: "userId and receiverId are required" });
//     } 
//     const newChat = new Chat({ users: [userId, receiverId] });

//     await newChat.save();  
//     res.status(200).json({ newChat });
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({message:"Failed to add Chat"});
//       } 
// }

// export const readChat = async(req,res,next) => {
//     try {
//         const chatId = req.params.chatId;
//         const updatedChat = await Chat.findByIdAndUpdate(
//             chatId, 
//             { isViewed: true }, 
//             { new: true } 
//           );
      
//         res.status(200).json({users})
//       } catch (err) {
//         console.log(err)
//         res.status(500).json({message:"Failed to get Chats"});
//       } 
// }

