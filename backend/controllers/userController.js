import  Mongoose  from 'mongoose';
import Interests from '../models/interestModel.js'
import User from '../models/userModel.js'
import Subscription from '../models/subscriptionModel.js'
import Interest from '../models/interestModel.js'
import Notification from '../models/notificationModel.js'
import AbuseReport from '../models/reportAbuseModel.js'
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

export const getUserDetails = async(req,res,next) => {
console.log("getUserDetails")
  const userId = req.query.userId;
  console.log(userId)
  // const username = req.query.username;
  try {
    const user = await User.findById(userId)
    const { password,...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const sendChangePasswordLink = async(req,res,next) => {
  console.log("sendChangePasswordLink")
  const email = req.body.email
  const link = 'https://wedbliss.live/changePassword/'+email
  const subject = 'Link to change password'
  const message =  `You can change your password by clicking the link:  ${link}`
  sendEmail(email,subject,message)
  res.status(200).json({success:true,message:"Please check email to change the password"})
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
  // console.log("USER")

  // console.log(user)
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

// console.log("userData>>>>>>>>>>>:")
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

export const suggestUsers = async (req, res, next) => {
  const id = req.params.id;
  const { page = 1, limit = 10 } = req.query;
  try {
    const profileUser = await User.findById(id);
    const gender = profileUser.gender === 'male' ? 'female' : 'male';

    const suggestedUsers = await User.aggregate([
      { $match: {
         $and: [{ _id: { $ne: id } ,
                  isAdmin: false ,
                  gender:gender,
                  isBlocked:false,
                  isVerifiedByAdmin:true,
                  blockedProfiles: { $ne: new Mongoose.Types.ObjectId(id) },
                   _id: { $nin: profileUser.blockedProfiles } 
               }] 
        }
      },
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
      { $sort: { _id: -1 } },
      { $skip: (page - 1) * limit }, // Skip the documents for pagination
      { $limit: parseInt(limit) } // Limit the number of documents returned
    ]);
    const userInterests = await Interest.find({ interestedFrom: id });
    const interestedUserIds = userInterests.map(interest => interest.interestedTo.toString());

    const result = suggestedUsers.map(user => ({
      ...user,
      hasSentInterest: interestedUserIds.includes(user._id.toString())
    }));
    res.json({ suggestedUsers : result });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, 'Error occurred while retrieving data'));
  }
};

// export const suggestUsers = async(req,res,next) => {
//    const id = req.params.id 
//    try {

//     const  profileUser = await  User.find({_id:id})
//       .then(async(user) => {
//       const gender = user.gender === 'male' ? 'female' : 'male'
//       User.aggregate([
//         { $match: { 
//           $and: [
//             { isAdmin: false },
//             { _id: { $ne: id } }
//           ]
//         }},
      
        
//         {
//           $lookup: {
//             from: "interests",
//             let: { userId: "$_id" },
//             pipeline: [
//               {
//                 $match: {
//                   $expr: {
//                     $and: [
//                       { $eq: ["$interestedFrom", id] },
//                       { $eq: ["$interestedTo", "$$userId"] }
//                     ]
//                   }
//                 }
//               }
//             ],
//             as: "interests"
//           }
//         },
      
//         { $match: { interests: { $eq: [] } } },
      
//         { $sort: { createdAt:-1 } }
//       ])
//       .then(async(suggestedUsers) => {
//         // console.log(suggestedUsers)
//           res.json({suggestedUsers})
//         })
//   })



//   //   const  profileUser = await  User.find({_id:id})
//   //   .then(async(user) => {
//   //   const gender = user.gender === 'male' ? 'female' : 'male'
//   //     // const suggestions = await User.find({
//   //     //   isVerifiedByOTP: true,
//   //     //   isVerifiedByAdmin: true,
//   //     //   isBlocked:false,
//   //     //   isAdmin:false,
//   //     //  // gender:gender,
//   //     //   //motherTongue: user.motherTongue,
//   //     //   religion:user.religion,
//   //     //   caste : user.caste,
//   //     //   _id: { $ne: id } 
//   //     // })
//   //     const suggestions = await User.find({
//   //       isAdmin: false,
//   //       $and: [
//   //           {
//   //               $or: [
//   //                   { isVerifiedByOTP: true },
//   //                   { isVerifiedByAdmin: true },
//   //                   { isBlocked: false },
//   //                   { isAdmin: false },
//   //                   { gender: gender }, 
//   //                   { motherTongue: user.motherTongue },
//   //                   { religion: user.religion },
//   //                   { caste: user.caste }
//   //               ]
//   //           },
//   //           { _id: { $ne: id } },
            
//   //         ]
//   //       }).sort({ createdAt: 1 })
//   // .then(async(suggestedUsers) => {
//   //   res.json({suggestedUsers})
//   // })
     
//   // })
//   //  .catch(err => {
//   //    next(errorHandler(500, 'Error occured while retrieving data'));
//   //    // res.status(500).send({message:err.message||"Error occured while retrieving data"})
//   // })
//    } catch (error) {
//     console.log(error)
//    }
 
// } 

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

      const newNotification = new Notification({
        userId:interestedTo,
        subscriptionId: null,
        title: 'Received Interest',
        message: `User ${interestedFromUser.username} has sent an Interest`,
        target: 'user'
    });
    await newNotification.save();

      console.log("interestedFromUser USERNAME: "+ interestedFromUser.username)
      console.log("interestedTo: "+ interestedTo)
      console.log("interestedFrom: "+ interestedFrom)

      req.io.to(interestedTo).emit('newInterest', interestedFromUser);
         console.log(`Emitting newInterest to room ${interestedTo}`);

      //  console.log('Emitting newInterest to:', interestedTo);
      // req.io.to(interestedTo).emit('newInterest', interestedFromUser);
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
const interests = await Interests.find({ interestedTo : interestedTo })
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

    const interestToUser = await User.findById(updatedUser.interestedTo).select('-password');
    const username = interestToUser.username
    const newNotification = new Notification({
      userId:updatedUser.interestedFrom,
      subscriptionId: null,
      title: 'Accepted Interest',
      message: `User ${username} has accepted your Interest`,
      target: 'user'
  });
  await newNotification.save();
console.log(updatedUser.interestedFrom)
console.log(updatedUser.interestedTo)
    req.io.to(updatedUser.interestedFrom).emit('interestAccepted', {
      interestId: updatedUser._id,
      acceptedBy: updatedUser.interestedTo
    });
console.log("emiited acceptance socket")
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


export const getContactDetails = async(req,res,next) => {
  try {
    
console.log("GETTTTTT CONTACT DETAILS")
const {id,userId} = req.body
console.log(id)
    const plan = await Subscription.findOne({ userId: id });
console.log('USER PLAN')
console.log(plan)
    if (!plan) {
        return { success: false, message: 'Plan not found' };
    }

    if (plan.remainingContacts > 0) {
        const updatedPlan = await Subscription.updateOne({ userId: id }, { $inc: { remainingContacts: -1 }},   { new: true } );
        console.log('UPDATED PLANN:')
        console.log(updatedPlan)
    } else {
        return { success: false, message: 'No contacts left in the plan' };
    }

    const suggestedUser = await User.findById(userId);
console.log(suggestedUser)
    if (!suggestedUser) {
        return res.status(404).json({ error: 'User not found' });
    }
    else{
      const {password, ...rest} = suggestedUser._doc
      const updatedPlan = await Subscription.findOne({ userId: id });
      rest.remainingContacts = updatedPlan.remainingContacts
console.log("finallllllll")      

console.log(rest)      
      res.status(200).json(rest)
    }
  }
  catch(error){
    next(errorHandler(300, error.message));

  }
}


export const blockMemberProfile = async(req,res,next) => {
  const { blockUserId } = req.body;
  const userId = req.params.id
    try {
        if (!userId || !blockUserId) { 
            return res.status(400).json({ message: 'User ID and Block User ID are required' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { blockedProfiles: blockUserId } }, 
            { new: true } 
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User blocked successfully', user });
    } catch (error) {
        console.error('Error blocking profile:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
}


export const unblockMemberProfile = async(req,res,next) => {
  const { blockUserId } = req.body;
  const userId = req.params.id
    try {
        if (!userId || !blockUserId) { 
            return res.status(400).json({ message: 'User ID and Unblock User ID are required' });
        }

        const user = await User.findByIdAndUpdate(
          userId,
          { $pull: { blockedProfiles: blockUserId } },
          { new: true } 
      );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User unblocked successfully', user });
    } catch (error) {
        console.error('Error blocking profile:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
}

export const reportAbuse = async(req,res,next) => {
  let { reporterId, reportedUserId, proofImage, reason } = req.body;
  try {
      if (!reporterId || !reportedUserId || !reason) {
          return res.status(400).json({ message: 'Reporter ID, Reported User ID, and reason are required' });
      }
      if (proofImage && typeof proofImage === 'string') {
        const uploadResponse = await cloudinary.v2.uploader.upload(proofImage);
        proofImage = uploadResponse.url;
      }
      const newReport = new AbuseReport({
          reporterId,
          reportedUserId,
          proofImage,
          reason
      });

      await newReport.save();
      
      const newNotification = new Notification({
        userId: reporterId,
        subscriptionId: null,
        title: 'Abuse Report',
        message: `User ${reporterId} reported user ${reportedUserId} for: ${reason}`,
        target: 'admin'
    });
    await newNotification.save();

      res.status(200).json({ message: 'Abuse report submitted successfully', report: newReport });
  } catch (error) {
      console.error('Error reporting abuse:', error);
      res.status(500).json({ message: 'An error occurred', error });
  }
}

export const viewUserPlanDetails = async(req,res,next) => {
try {
  const userId = req.params.id; 
  console.log(userId)
  console.log("userId")

  const subscription = await Subscription.aggregate([
    {
      $match: { userId:new Mongoose.Types.ObjectId(userId)}
    },
    {
      $lookup: {
        from: 'plans',
        localField: 'planId',
        foreignField: '_id',
        as: 'planDetails'
      }
    },
    {
      $unwind: '$planDetails'
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        planId: 1,
        stripeSessionId: 1,
        validTill: 1,
        validity: 1,
        remainingContacts: 1,
        remainingMessages: 1,
        isPaid: 1,
        isApproved: 1,
        isDeleted: 1,
        planDetails: {
          planName: 1,
          planValidity: 1,
          planPrice: 1,
          noOfContacts: 1,
          noOfMessages: 1,
          isDeleted: 1
        }
      }
    }
  ]);
console.log("subscription")
console.log(subscription)

  if (!subscription.length) {
    return res.status(404).json({ message: 'Subscription not found' });
  }
  res.json(subscription[0]);
} catch (error) {
  res.status(500).json({ message: 'Server error' });
}
}

export const advancedSearch = async (req, res, next) => {
  console.log("IN ADVAAANCED SEARCH")
  const {
    page = 1,
    limit = 10,
    ageFrom,
    ageTo,
    maritalStatus,
    diet,
    religion,
    caste,
    motherTongue,
    nativePlace,
    height,
    weight,
    qualification,
    workingStatus,
    hobbies,
    countryLivingIn,
  } = req.query;

  try {
    const id = req.params.id; // Assuming you have user authentication in place
    const profileUser = await User.findById(id);
    // const preference = await Preference.findOne({ userId: id });

    if (!profileUser) {
      throw new Error('Profile user not found');
    }

    let matchConditions = [
      { isAdmin: false },
      { _id: { $ne: id } },
      { gender: profileUser.gender === 'male' ? 'female' : 'male' },
    ];

    const pushCondition = (field, value) => {
      if (value) {
        matchConditions.push({ [field]: value });
      }
    };

    const userSpecifications =  profileUser;

    // pushCondition('dob', {
    //   $gte: new Date(new Date().setFullYear(new Date().getFullYear() - (ageTo || userSpecifications.ageTo || 100))),
    //   $lte: new Date(new Date().setFullYear(new Date().getFullYear() - (ageFrom || userSpecifications.ageFrom || 18))),
    // });
    // pushCondition('maritalStatus', maritalStatus || userSpecifications.maritalStatus);
    // pushCondition('diet', diet || userSpecifications.diet);
    pushCondition('religion', religion || userSpecifications.religion);
    // pushCondition('caste', caste || userSpecifications.caste);
    pushCondition('motherTongue', motherTongue || userSpecifications.motherTongue);
    // pushCondition('nativePlace', nativePlace || userSpecifications.nativePlace);
    // pushCondition('height', { $gte: height || userSpecifications.height });
    // pushCondition('weight', { $lte: weight || userSpecifications.weight });
    // pushCondition('qualification', qualification || userSpecifications.qualification);
    // pushCondition('workingStatus', workingStatus || userSpecifications.workingStatus);
    // pushCondition('hobbies', { $in: (hobbies || userSpecifications.hobbies)?.split(', ') });
    // pushCondition('countryLivingIn', countryLivingIn || userSpecifications.countryLivingIn);

    matchConditions = matchConditions.filter(condition => Object.keys(condition).length !== 0);

    const suggestedUsers = await User.aggregate([
      { $match: { $and: matchConditions } },
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
      { $sort: { _id: -1 } },
      { $skip: (page - 1) * limit }, 
      { $limit: parseInt(limit) } 
    ]);
console.log(suggestedUsers.length)
    res.json({ suggestedUsers });
  } catch (error) {
    console.error('Error occurred during advanced search:', error);
    next(errorHandler(500, 'Error occurred while retrieving data'));
  }
};
