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
    },
    gender:{
        type:String,
    },
    dob:{
        type:Date,
    },
    profilePhoto:{
        type:String,
        default:"https://static-00.iconduck.com/assets.00/avatar-default-light-icon-512x512-6c79fqub.png"
    },
    maritalStatus:{
        type:String,
    },
    diet:{
        type:String,
    },
    religion:{
        type:String,
    },
    caste:{
        type:String,
    },
    motherTongue:
    {
        type:String,
    },
    nativePlace:{
        type:String,
    },
    height:{
        type:Number,
    },
    weight:{
        type:Number,
    },
    qualification:{
        type:String,
    },
    workingStatus:{
        type:String,
    },
    hobbies:{
        type:String, 
    },
    countryLivingIn:{
        type:String,
    }, 
    about:{
        type:String,
    }, 
    isSubscribed:{
        type:Boolean,
        default:false,
    },
    reasonForBlocking: {
        type:String,
    },
    // hasDetails:{
    //     type:Boolean,
    //     default:false,
    // },
    // hasPreference:{
    //     type:Boolean,
    //     default:false,
    // }                
}, {timestamp:true});

const User = mongoose.model('User',userSchema);

export default User;