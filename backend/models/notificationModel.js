import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    notificationFrom: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    },
    notificationTo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    },
    isViewed:{
        type:Boolean,
        default:false,
    },
    message:{
        type:String,
    },
}, {timestamp:true});

const NotificationUser = mongoose.model('Notification',notificationSchema);

export default Notification;