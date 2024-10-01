import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'  
import twilio from 'twilio'
import { sendEmail } from '../utils/email.js'
import { generateOTP } from '../utils/otpGenerator.js'
import Preference from "../models/preferenceModel.js"

export const signup = async (req,res,next) => {
   try {
     const {username,email,phoneNumber,password} = req.body
     if (!username || !email || !phoneNumber || !password){
          next(errorHandler(404, 'Please enter the fields'));
     }
     else{
          const userChk = await User.findOne({email})
         if(userChk){
          next(errorHandler(400, 'User already exists'));
         }
         const client = new twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)
         const otp = generateOTP()
         const subject = 'OTP Verification'
         const message =  `Your OTP is ${otp}`
         sendEmail(email,subject,message)
     //     client.messages.create({
     //      body: `Your OTP is ${otp}`,
     //      from:"+916282276137",
     //      to:"+916282276137"
     //     })
     //     .then(() => {
     //      res.send({success:true,otp:otp})
     //     })
     //     .catch(err =>{
     //      console.log(err)
     //      res.status(500).send({success:false,message:'failed to send OTP'})
     //     })
          const hashedPassword = bcryptjs.hashSync(password,10) 
          const newUser = new User( {username,email,phoneNumber,password:hashedPassword,otp})
          const userData = await newUser.save()
     
          const userId = userData._id
          if(req.body.preference){
               const { gender, ageFrom, ageTo, religion, motherTongue } = req.body.preference;
               const newUserPreference = new Preference( {userId,gender,ageFrom,ageTo,religion,motherTongue})
               await newUserPreference.save()
          }
          res.json({status:201,message: 'Preliminary data saved successfully', userId: userId})
     }
        
   } catch (error) {
        next(errorHandler(300,error.message))
   }
   
}

    export const otpVerify = async (req,res,next) =>{
     try {
     const {otp} = req.body
     if (!otp){
          next(errorHandler(404, 'Please enter the OTP'));
         }
      else {
         const validUser = await User.findOne({otp})
        
         if(!validUser)  next(errorHandler(404,'OTP not matching'))
         else{
          User.updateOne({_id:validUser._id},{$set:{isVerifiedByOTP:true}})
          .then(data =>{
             if(!data){
                 res.status(404).send({message:`Cannot update  with ${id}.May be user not found`})
             }
             else{
               res.status(200).json({userId:validUser._id})
             }
          })
          }
     }
    } catch (error) {
          next(error)
    }
  
}

export const google = async(req,res,next) => {
     try {
        
          const user = await User.findOne({email:req.body.email})
          if(user){ 
               const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
               res
               .cookie('access_token',token,{httpOnly:true})
               .status(200)
               .json(user._doc)
          }
          else{  
               const generatedPassword = Math.random().toString(36).slice(-8)
               const hashedPassword = bcryptjs.hashSync(generatedPassword,10)
               const newUser = new User({username:req.body.username,email:req.body.email,password:hashedPassword,profilePhoto:req.body.profilePhoto})
               await newUser.save()
               const token = jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.JWT_SECRET)
               res
               .cookie('access_token',token,{httpOnly:true})
               .status(200)
               .json(newUser._doc)
          }
     } catch (error) {
          next(error)
     }
}
export const login = async (req,res,next) =>{
     try {
     const {email,password} = req.body
     if (!email && !password){
          next(errorHandler(404, 'Please enter the credential'));
         }
      else if (!email){
         next(errorHandler(404, 'Please enter the email'));
      } 
      else if(!password) {
         next(errorHandler(404, 'Please enter the password'));
      }else {
         const validUser = await User.findOne({email})
         if(!validUser)  next(errorHandler(404,'User not Found'))
         const validPassword = bcryptjs.compareSync(password,validUser.password)
         if(!validPassword)  next(errorHandler(401,'Wrong Credentials'))
         if(!validUser.isVerifiedByOTP && !validUser.isAdmin)  next(errorHandler(401,'OTP Verification not completed'))
         if(!validUser.isVerifiedByAdmin && !validUser.isAdmin)  next(errorHandler(401,'Not verified by the Admin'))
         if(validUser.isBlocked === true && !validUser.isAdmin)  next(errorHandler(401,'You have been blocked by the Admin.Please contact the admin'))
         else{
               const token = jwt.sign({id:validUser._id,isAdmin:validUser.isAdmin},process.env.JWT_SECRET)
               const {password : hashedPassword,...rest} = validUser._doc
               const expiryDate = new Date(Date.now() + 3600000)
               res
               .cookie('access_token',token,{httpOnly:true,expires:expiryDate})
               .status(200)
               .json(rest)
          }
     }
    } catch (error) {
          next(error)
    }
  
}

export const resendOTP = async(req,res,next) => {
     const {_id} = req.body
     sendOTP(_id)
}

 const sendOTP = async(id,email) => {
     const userEmail = email ? email : await User.findOne({ _id: id }, { email: 1 })
     const otp = generateOTP()
     const subject = 'OTP Verification'
     const message =  `Your OTP is ${otp}`
     sendEmail(userEmail,subject,message)
     const updatedData = {"otp":otp}
     const updatedUser = await User.findByIdAndUpdate(
          id, 
          {
            $set:updatedData
          },
          { new: true }
        )
        const {password, ...rest} = updatedUser._doc
       return rest
    }
 



export const logout = async (req,res,next) =>{
     res.clearCookie('access_token').status(200).json('Signout Success')
}
