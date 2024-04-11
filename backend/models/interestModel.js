import mongoose from "mongoose";

const interestsSchema = new mongoose.Schema({
    interestedFrom: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    },
    interestedTo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    },
    sentTime:
    {
        type: Date,
        default: null,  
    },
    isViewed: {
        type: Boolean,
        default: false,
    },
    isAccepted: {
        type: Boolean,
        default: false,
    },
    acceptedTime: {
        type: Date,
        default: null, 
    },
}, { timestamps: true });

const Interests = mongoose.model('Interests', interestsSchema);

export default Interests;
