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
    isAdmin:{
        type:Boolean,
        default:false,
    },
    otp:{
        type:Number,
    },
    isVerifiedByOTP:{
        type:Boolean,
        default:false,
    },
    isVerifiedByAdmin:{
        type:Boolean,
        default:false,
    },
    isBlocked:{
        type:Boolean,
        default:false,
    }
}, {timestamp:true});

const User = mongoose.model('User',userSchema);

export default User;