import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'
import twilio from 'twilio'
import { sendEmail } from '../utils/email.js'
import { generateOTP } from '../utils/otpGenerator.js'

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
         const message =  `Your OTP is ${otp}`
         sendEmail(email,message)
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
          await newUser.save()
          res.json({status:201,message: 'Preliminary data saved successfully'})
     }
        
   } catch (error) {
        next(errorHandler(300,"Something went wrong"))
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
               res.status(200).json(data)
             }
          })
          }
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
         console.log(validUser)
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
export const logout = async (req,res,next) =>{
     res.clearCookie('access_token').status(200).json('Signout Success')
}
