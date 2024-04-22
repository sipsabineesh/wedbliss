import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Plan', 
    },
    stripeSessionId:{
        type:String,
    },
    remainingValidity:{
        type: String, 
    },
    remainingContacts:{
        type:Number,
    },
    remainingMessages:{
        type:Number,
    },
     isPaid:{
        type:Boolean,
        default:false,
    },
    isApproved:{
        type:Boolean,
        default:false,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    

}, {timestamp:true});

const Plan = mongoose.model('Subscription',subscriptionSchema);

export default Plan;     