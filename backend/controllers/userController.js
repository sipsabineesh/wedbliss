import { Mongoose } from 'mongoose';
import Interests from '../models/InterestsModel.js';
import User from '../models/userModel.js'
import { errorHandler } from "../utils/error.js"
import cloudinary from "cloudinary";

export const getUsers = async(req,res,next) => {
   
   const  users = await  User.find({isAdmin:false}).sort({_id:-1}).limit(5)
   .then(user => {
    //res.send(user) 
    res.json({user})
})
  .catch(err => {
    next(errorHandler(500, 'Error occured while retrieving data'));
    // res.status(500).send({message:err.message||"Error occured while retrieving data"})
})
  
}


export const editUser = async(req,res,next) => {
  // console.log(req.user +  "" + req.params._id)
  // if(req.user._id !== req.params.id){
  //   return next(errorHandler(403,'You are not allowed to update this user'))
  // }
  try{
    const id = req.params.id
    const updatedData = req.body
    try {
    
      if (updatedData.profilePhoto) {
        const image = updatedData.profilePhoto;
        const uploadResponse = await cloudinary.v2.uploader.upload(image);
        updatedData.profilePhoto= uploadResponse.url;
      }
    } catch (error) {
      console.log(error)
    }

console.log("updatedData:")
console.log(updatedData.profilePhoto)
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      {
        $set:updatedData
      },
      { new: true }
    )
    const {password, ...rest} = updatedUser._doc
    res.status(200).json(rest)
  }
  catch(error){
    next(error)
  }
}

export const suggestUsers = async(req,res,next) => {
   const id = req.params.id 
   try {
    const  profileUser = await  User.find({_id:id})
    .then(async(user) => {
    const gender = user.gender === 'male' ? 'female' : 'male'
      // const suggestions = await User.find({
      //   isVerifiedByOTP: true,
      //   isVerifiedByAdmin: true,
      //   isBlocked:false,
      //   isAdmin:false,
      //  // gender:gender,
      //   //motherTongue: user.motherTongue,
      //   religion:user.religion,
      //   caste : user.caste,
      //   _id: { $ne: id } 
      // })
      const suggestions = await User.find({
        isAdmin: false,
        $and: [
            {
                $or: [
                    { isVerifiedByOTP: true },
                    { isVerifiedByAdmin: true },
                    { isBlocked: false },
                    { isAdmin: false },
                    { gender: gender }, 
                    { motherTongue: user.motherTongue },
                    { religion: user.religion },
                    { caste: user.caste }
                ]
            },
            { _id: { $ne: id } },
            
          ]
        }).sort({ createdAt: 1 })
  .then(async(suggestedUsers) => {
    res.json({suggestedUsers})
  })
     
  })
   .catch(err => {
     next(errorHandler(500, 'Error occured while retrieving data'));
     // res.status(500).send({message:err.message||"Error occured while retrieving data"})
  })
   } catch (error) {
    console.log(error)
   }
 
}

export const suggestionCount = async(req,res,next) => {const id = req.params.id;

  try {
      const profileUser = await User.findById(id);
  
      if (!profileUser) {
          return res.status(404).json({ error: 'User not found' });
      }
  
      const suggestions = await User.find({
          isVerifiedByOTP: true,
          isVerifiedByAdmin: true,
          isBlocked: false,
          religion: profileUser.religion,
          caste: profileUser.caste,
          _id: { $ne: id }
      });
  
      const suggestionsCount = suggestions.length;
  
      res.json({ suggestedUsers: suggestions, suggestionsCount });
  } catch (error) {
      console.error('Error fetching suggestions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}




export const sendInterest = async(req,res,next) => {
  console.log("sendInterest")
  try {
    
    const interestedFrom = req.params.id
    const interestedTo = req.body.requestedTo
   
    console.log("FROM  : " +interestedFrom)
    console.log("TO : " + interestedTo)
  
      const newInterest = new Interests({ interestedFrom, interestedTo });
      await newInterest.save();
      console.log("just after query")
      res.json({ status: 201, message: 'Interests saved' });
    } catch (error) {
      console.log(error)
      next(errorHandler(300, "Something went wrong"));
    }
}


export const interestCount = async(req,res,next) => {
 
try {
  const interestedTo = req.params.id;
console.log(interestedTo)
const numRequests = await Interests.countDocuments({ interestedTo: interestedTo , isAccepted : false});

res.json({ numRequests });
} catch (error) {
  console.log(error)
}

}

export const getAllinterests = async(req,res,next) => {
 
 console.log(req.params.id)
try {
  const interestedTo = req.params.id
//   Interests.aggregate([
//     { $match: { interestedTo:new Mongoose.Types.ObjectId(interestedTo) } }, 
//     {
//         $lookup: {
//             from: "users", 
//             localField: "interestedFrom",
//             foreignField: "_id", 
//             as: "senderDetails" 
//         }
//     },
  
// ])
const interests = await Interests.find({ interestedTo : interestedTo, isAccepted : false })
    .populate({
        path: 'interestedFrom',
        model: 'User',
        select: 'username height dob qualification profilePhoto' 
    })
    .exec().then(async(interestedUsers) => {
  console.log(interestedUsers)
res.json({interestedUsers})
})
} catch (error) {
console.log(error)
}
}

  // await Interests.aggregate([
  //     { $match: { interestedTo:interestedTo} },
  //     {
  //         $lookup: {
  //             from: "User", 
  //             localField: "interestedFrom",
  //             foreignField: "username", 
  //             as: "senderDetails" 
  //         }
  //     },
  //     { $unwind: "$senderDetails" },
  //     {
  //         $project: {
  //             _id: "$senderDetails._id",
  //             username: "$senderDetails.username",
  //             email: "$senderDetails.email",
  //             dob: "$senderDetails.dob",
  //             height: "$senderDetails.height",
  //             qualification: "$senderDetails.qualification",
  //         }
  //     }
  // ])  
  

  
  
export const acceptinterests = async(req,res,next) => {
  
  try {
    const id = req.body.id
    console.log("ACCCCCEPTTTTTTINGGGGGGGGGGGGGGGGGG")
    console.log(id)
    const updatedData = {isAccepted:true}
    const updatedUser = await Interests.findByIdAndUpdate(
      id, 
      {
        $set:updatedData
      },
      { new: true }
     )
     res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    next(errorHandler(300, "Something went wrong"));
  }
 
}


 
export const acceptedInterestList = async(req,res,next) => {
 
  try {
    const id = req.params.id
    console.log("ACCEPTED LIST PAGE :ID")
    console.log(id)
    const updatedData = {}
    const userList = await Interests.find(
      {
        interestedFrom:id, isAccepted:true
      }
     )
     .populate({
      path: 'interestedTo',
      model: 'User',
      select: 'username height dob qualification profilePhoto' 
  })
  .exec().then(async(interestedUsers) => {
console.log(interestedUsers)
res.json({interestedUsers})})
    
  } catch (error) {
    console.log(error)
    next(errorHandler(300, "Something went wrong"));
  }
 
}
