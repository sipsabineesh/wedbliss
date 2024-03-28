import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    otp:{
        type:Number,
    },
    isVerifiedByOTP:{
        type:Boolean,
    },
    isVerifiedByAdmin:{
        type:Boolean,
    }
}, {timestamp:true});

const User = mongoose.model('User',userSchema);

export default User;