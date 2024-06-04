import { Mongoose } from 'mongoose';
import Interests from '../models/interestModel.js'
import User from '../models/userModel.js'
import { errorHandler } from "../utils/error.js"
import cloudinary from "cloudinary"
import bcryptjs from 'bcryptjs'
import { sendEmail } from '../utils/email.js'
import { generateOTP } from '../utils/otpGenerator.js';

export const getUsers = async(req,res,next) => {
   
   const  users = await  User.find({isAdmin:false}).sort({_id:-1})
   .then(user => {
    //res.send(user) 
    res.json({user})
})
  .catch(err => {
    next(errorHandler(500, 'Error occured while retrieving data'));
    // res.status(500).send({message:err.message||"Error occured while retrieving data"})
})
  
}


export const sendChangePasswordLink = async(req,res,next) => {
  console.log("sendChangePasswordLink")
  const email = req.body.email
  const link = 'http://localhost:5173/changePassword/'+email
  const subject = 'Link to change password'
  const message =  `You can change your password by clicking the link:  ${link}`
  sendEmail(email,subject,message)
}


export const changePassword = async(req,res,next) => {
  try {
  const { email,newPassword } = req.body.formData; 
  console.log(email)
  const hashedPassword = bcryptjs.hashSync(newPassword,10) 
  const updatedData =  {password:hashedPassword}
  const updatedUser = await User.findOneAndUpdate(
    { email },
    {
      $set:updatedData
    },
    { new: true }
  )
  console.log("updatedUser")
  console.log(updatedUser)

  res.status(200).json({success:true,message:"Password changed successfully"})
  } catch (error) { 
    console.log(error)
  }

}

export const sendChangeEmailOTP = async(req,res,next) => {
  console.log("sendChangeEmailOTP")
  const email = req.body.email
  const user = await User.findOne({email:req.body.email})
  if(!user) {
    const otp = generateOTP()
    const subject = 'Verification mail to change Email  Address'
    const message =  `Please enter the OTP to change your  email address :  ${otp}`
    await sendEmail(email,subject,message)
console.log("Emaill success")
res.status(200).json({success:true,message:"Please check your email"})

  }
  else {
    res.json({success:false,message:'Email Address already exists'})
  }
 }

export const changeEmailAddress = async(req,res,next) => {
  try {
  const { id,email } = req.body; 
// console.log("req.body")
// console.log(req.body)


  //check the existing email
  const user = await User.findOne({email:req.body.email})
// console.log(user)
  if(!user){ 
  //email verification
 
  const updatedData =  {email}

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      $set:updatedData
    },
    { new: true }
  )
  console.log("updatedUser")
  console.log(updatedUser)
  const {password, ...rest} = updatedUser._doc
  console.log("REST")
  console.log(rest)
  res.status(200).json(rest)
}
//  else {
//   res.json({success:false,message:"Email Address already exists"})
// }
  } catch (error) { 
    console.log(error)
  }

}


export const getUser = async(req,res,next) => {
   const userId = req.params.id
  const  users =  await User.findOne({ _id: userId, isAdmin: false })
  .then(user => {
  console.log("USER")

  console.log(user)
   res.json({user})
})
 .catch(err => {
   next(errorHandler(500, 'Error occured while retrieving data'));
   // res.status(500).send({message:err.message||"Error occured while retrieving data"})
})
 
}

export async function addUser(req, res, next) {   try{
  const userData = req.body
  console.log(req.body)
  try {
  
    if (userData.profilePhoto) {
console.log("userData.profilePhoto")
console.log(userData.profilePhoto)

      const image = userData.profilePhoto ?  userData.profilePhoto : 'https://res.cloudinary.com/dcsdqiiwr/image/upload/v1717406174/ava_xlfouh.png';
      const uploadResponse = await cloudinary.v2.uploader.upload(image);
      updatedData.profilePhoto= uploadResponse.url ? uploadResponse.url :'https://res.cloudinary.com/dcsdqiiwr/image/upload/v1717406174/ava_xlfouh.png';
    }
  } catch (error) {
    console.log(error)
  }

console.log("userData>>>>>>>>>>>:")
console.log(userData)
const newUser = new User(userData)
const addUser = await newUser.save()
  const {password, ...rest} = addUser._doc
  res.status(200).json(rest)
}
catch(error){
  next(error)
}
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
      console.log("PROFILE iMAGE ===========")
   console.log(updatedData.profilePhoto) 
   if (updatedData.profilePhoto && typeof updatedData.profilePhoto === 'string') {
    const uploadResponse = await cloudinary.v2.uploader.upload(updatedData.profilePhoto);
    updatedData.profilePhoto = uploadResponse.url;
  } else {
    updatedData.profilePhoto = 'https://res.cloudinary.com/dcsdqiiwr/image/upload/v1717406174/ava_xlfouh.png';
  }
    } catch (error) {
      console.log(error)
    }

console.log("updatedData IIIIIIIIIIIIIIIIIIIMAGE>>>>>>>>>>>:")
console.log(updatedData.profilePhoto)
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      {
        $set:updatedData
      },
      { new: true }
    )
    console.log("updatedUser")
    console.log(updatedUser)
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
      User.aggregate([
        { $match: { 
          $and: [
            { isAdmin: false },
            { _id: { $ne: id } }
          ]
        }},
      
        
        {
          $lookup: {
            from: "interests",
            let: { userId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$interestedFrom", id] },
                      { $eq: ["$interestedTo", "$$userId"] }
                    ]
                  }
                }
              }
            ],
            as: "interests"
          }
        },
      
        { $match: { interests: { $eq: [] } } },
      
        { $sort: { createdAt:-1 } }
      ])
      .then(async(suggestedUsers) => {
        // console.log(suggestedUsers)
          res.json({suggestedUsers})
        })
  })



  //   const  profileUser = await  User.find({_id:id})
  //   .then(async(user) => {
  //   const gender = user.gender === 'male' ? 'female' : 'male'
  //     // const suggestions = await User.find({
  //     //   isVerifiedByOTP: true,
  //     //   isVerifiedByAdmin: true,
  //     //   isBlocked:false,
  //     //   isAdmin:false,
  //     //  // gender:gender,
  //     //   //motherTongue: user.motherTongue,
  //     //   religion:user.religion,
  //     //   caste : user.caste,
  //     //   _id: { $ne: id } 
  //     // })
  //     const suggestions = await User.find({
  //       isAdmin: false,
  //       $and: [
  //           {
  //               $or: [
  //                   { isVerifiedByOTP: true },
  //                   { isVerifiedByAdmin: true },
  //                   { isBlocked: false },
  //                   { isAdmin: false },
  //                   { gender: gender }, 
  //                   { motherTongue: user.motherTongue },
  //                   { religion: user.religion },
  //                   { caste: user.caste }
  //               ]
  //           },
  //           { _id: { $ne: id } },
            
  //         ]
  //       }).sort({ createdAt: 1 })
  // .then(async(suggestedUsers) => {
  //   res.json({suggestedUsers})
  // })
     
  // })
  //  .catch(err => {
  //    next(errorHandler(500, 'Error occured while retrieving data'));
  //    // res.status(500).send({message:err.message||"Error occured while retrieving data"})
  // })
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


export const addPreference = async(req,res,next) => {
console.log("adding Preference")
}


export const sendInterest = async(req,res,next) => {
  // console.log("sendInterest")
  try {
    
    const interestedFrom = req.params.id
    const interestedTo = req.body.requestedTo
   
    // console.log("FROM  : " +interestedFrom)
    // console.log("TO : " + interestedTo)
  
      const newInterest = new Interests({ interestedFrom, interestedTo });
      await newInterest.save();
      // console.log("just after query")
      const interestedFromUser = await User.findById(interestedFrom).select('-password');
      req.io.to(interestedTo).emit('newInterest', interestedFromUser);
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
    const updatedData = {isAccepted:true}
    const updatedUser = await Interests.findByIdAndUpdate(
      id, 
      {
        $set:updatedData
      },
      { new: true }
     )

    const interestedFromUser = await User.findById(updatedUser.interestedFrom).select('-password');

    req.io.to(updatedUser.interestedFrom).emit('interestAccepted', {
      interestId: updatedUser._id,
      acceptedBy: updatedUser.interestedTo
    });

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
