import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    lastMessage:{
      type:String,
    },
    // subscriptionId:{
    //   type: mongoose.Schema.Types.ObjectId,  
    //   ref: 'Subscription', 
    // }
  },
  { timestamps: true }
);

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;