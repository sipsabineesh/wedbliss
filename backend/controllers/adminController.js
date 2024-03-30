
import User from '../models/userModel.js'

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

        return res.status(200).json({ message: 'User verification successful', user: updatedUser });
    } catch (error) {
        console.error('Error verifying user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
 }

 