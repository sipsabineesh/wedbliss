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
    validTill:{
        type:Date,
    },
    validity:{
        type: Number, 
    },
    remainingContacts:{
        type:Number,
        default: 0,
    },
    remainingMessages:{
        type:Number,
        default: 0,
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

const Subscription = mongoose.model('Subscription',subscriptionSchema);

export default Subscription;     