
import User from '../models/userModel.js'
import { sendEmail } from '../utils/email.js';
import { errorHandler } from '../utils/error.js';


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




export const getUser = async(req,res,next) => {
    const userId = req.params.id
   const  users =  await User.findOne({ _id: userId, isAdmin: false })
   .then(user => {
    //res.send(user) 
    res.json({user})
 })
  .catch(err => {
    next(errorHandler(500, 'Error occured while retrieving data'));
    // res.status(500).send({message:err.message||"Error occured while retrieving data"})
 })
  
 }
 

export const getUsers = async(req,res,next) => {
   
    const  users = await  User.find({isAdmin:false,isVerifiedByOTP:true}).sort({_id:-1})
    .then(user => {
     //res.send(user) 
     res.json({user})
 })
   .catch(err => {
     next(errorHandler(500, 'Error occured while retrieving data'));
     // res.status(500).send({message:err.message||"Error occured while retrieving data"})
 })
   
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

 
// export const blockUnblockUser = async(req,res) => {
//     try {
//         const { id ,isBlocked,reason } = req.body;
       
//         const updatedUser = await User.updateOne(
//             { _id: id },
//             {$set:{ isBlocked: !isBlocked ,reasonForBlocking:reason }},
//         );

//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
// if(!isBlocked){
//     const user = await User.findById(id);
//     const email = user.email;
//     const subject = 'Reason for blocking your account'
//     const message =  `You have been blocked by Admin due to the reason :  ${reason}`
//     sendEmail(email,subject,message)
// }
//         return res.status(200).json({ message: 'User blocked/unblocked successful', user: updatedUser });
//     } catch (error) {
//         console.error('Error blocking user:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
//  }

export const blockUnblockUser = async (req, res) => {
    try {
        const { id, isBlocked, reason } = req.body;
console.log(id, isBlocked, reason )
        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $set: { isBlocked: isBlocked, reasonForBlocking: reason } },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (isBlocked) {
            const email = updatedUser.email;
            const subject = 'Reason for blocking your account';
            const message = `You have been blocked by Admin due to the reason: ${reason}`;
            sendEmail(email, subject, message);
        }
console.log("USERSSSSSSSSSS-------------")
console.log(updatedUser)
        return res.status(200).json({ message: 'User blocked/unblocked successfully', user: updatedUser });
    } catch (error) {
        console.error('Error blocking user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const getAllDetails = async(req,res) => { console.log("GET ALL DETAILS CALLED")
    try {
        const statistics = {
          totalUsers: 1000,
          totalPlans: 50,
          totalSubscriptions: 300,
          pieChartData: [
            { name: 'Users', value: 1000 },
            { name: 'Plans', value: 50 },
            { name: 'Subscriptions', value: 300 },
          ],
        };
    console.log(statistics)
        const chartData = {
          lineChartData: [
            { name: 'January', value: 100 },
            { name: 'February', value: 200 },
            { name: 'March', value: 300 },
            { name: 'April', value: 400 },
          ],
        };
    
        res.json({ statistics, chartData });
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
}