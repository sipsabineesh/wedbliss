import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
    },
    ageFrom:{
        type:Number,
    },
    ageTo:{
        type:Number,
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
                 
}, {timestamp:true});

const Preference = mongoose.model('Preference',preferenceSchema);

export default Preference;