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
    // isNotifiedToAdmin: {
    //     type: Boolean,
    //     default: false
    // },
    target: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }

}, {timestamps:true});

const Notification = mongoose.model('Notification',notificationSchema);

export default Notification;