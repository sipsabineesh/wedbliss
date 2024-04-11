import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    planId:{
        type:String,
        required:true,
        unique:true,
    },
    planName:{
        type:String,
        required:true,
        unique:true,
    },
    planValidation:{
        type:String,
        required:true,
    },
    planPrice:{
        type:Number,
        required:true,
    },
    isValid:{
        type:Boolean,
        default:false,
    },
    

}, {timestamp:true});

const User = mongoose.model('User',userSchema);

export default User;     