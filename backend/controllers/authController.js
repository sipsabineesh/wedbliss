import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"

export const signup = async (req,res,next) => {
   const {username,email,password} = req.body
   const hashedPassword = bcryptjs.hashSync(password,10) 
   const newUser = new User( {username,email,password:hashedPassword})

   try {
        await newUser.save()
        res.json({status:201,message: 'Signup completed successfully'})
   } catch (error) {
        next(errorHandler(300,"Something went wrong"))
   }
   
}