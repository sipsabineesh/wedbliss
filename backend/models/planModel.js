import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    planName:{
        type:String,
        required:true,
        unique:true,
    },
    planValidity:{
        type:String,
        required:true,
    },
    planPrice:{
        type:Number,
        required:true,
    },
    noOfContacts:{
        type:Number,
        default:0,
    },
    noOfMessages:{
        type:Number,
        default:0,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    

}, {timestamp:true});

const Plan = mongoose.model('Plan',planSchema);

export default Plan;     