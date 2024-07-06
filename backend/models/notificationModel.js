import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription'
    },
    isViewed:{
        type:Boolean,
        default:false,
    },
    title:{
        type:String,
    },
    message:{
        type:String,
    },
}, {timestamp:true});

const Notification = mongoose.model('Notification',notificationSchema);

export default Notification;