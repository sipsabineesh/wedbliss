import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'

export const signup = async (req,res) => {
   const {username,email,password} = req.body
   const hashedPassword = bcryptjs.hashSync(password,10) 
   const newUser = new User( {username,email,password:hashedPassword})

   try {
        await newUser.save()
        res.json({status:201,message: 'Signup completed successfully'})
   } catch (error) {
        res.json({status:500,message: error.message})
   }
   
}