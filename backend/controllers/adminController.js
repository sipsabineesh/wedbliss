
import User from '../models/userModel.js'


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
     
        else{
              const token = jwt.sign({id:validUser._id,isAdmin:validUser.isAdmin},process.env.JWT_SECRET)
              const {password : hashedPassword,...rest} = validUser._doc
console.log(rest)               
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


export const verifyUser = async(req,res) => {
    try {
        const { id } = req.body; 
        const updatedUser = await User.updateOne(
            { _id: id },
            {$set:{isVerifiedByAdmin: true }},
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User verification successful', user: updatedUser });
    } catch (error) {
        console.error('Error verifying user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
 }

 
export const blockUnblockUser = async(req,res) => {
    try {
        const { id ,isBlocked } = req.body;
       
        const updatedUser = await User.updateOne(
            { _id: id },
            {$set:{ isBlocked: !isBlocked }},
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User blocked/unblocked successful', user: updatedUser });
    } catch (error) {
        console.error('Error blocking user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
 }

 