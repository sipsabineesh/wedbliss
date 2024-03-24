import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const signup = async (req,res,next) => {
   try {
     const {username,email,password} = req.body
     if (!username || !email || !password){
          next(errorHandler(404, 'Please enter the fields'));
     }
     else{
          const userChk = await User.findOne({email})
         if(userChk){
          next(errorHandler(400, 'User already exists'));
         }
          const hashedPassword = bcryptjs.hashSync(password,10) 
          const newUser = new User( {username,email,password:hashedPassword})
          await newUser.save()
          res.json({status:201,message: 'Signup completed successfully'})
     }
        
   } catch (error) {
        next(errorHandler(300,"Something went wrong"))
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
         else{
               const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
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