import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
     conversationId: {
       type: String,
     },
     sender: {
       type: String,
     },
     text: {
       type: String,
     },
     read: {
      type: Boolean,
      default: false,
    },

   },
   { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;
