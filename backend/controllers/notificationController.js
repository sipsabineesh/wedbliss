import { Mongoose } from 'mongoose';
import Notification from '../models/notificationModel.js'


export const getRenewalNotification = async(req,res,next) => {
    try {
        const now = new Date();
        const soonToExpireDate = new Date(now);
        soonToExpireDate.setDate(now.getDate() + 7); 
        const userId = req.params.id;
        const notifications = await Notification.find({ userId:userId,isViewed:false });
       
        console.log(notifications)
        res.status(200).json({notifications})
    } catch (error) {
        
    }
}


export const getNotification = async(req,res,next) => {
    try {
        const notificationId = req.params.notificationId;
        const notification = await Notification.findById(notificationId);
        res.status(200).json({ notification });
    } catch (error) {
        
    }
}



export const updateViewedNotification = async(req,res,next) => {
    try {
        console.log('VIEWED UPDATION------------------------')
        const notification = await Notification.findById(req.params.notificationId);
    console.log("notification",notification)
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        } 
        notification.isViewed = req.body.isViewed;
        await notification.save();
        console.log('Notification updated successfully')
        res.status(200).json({ message: 'Notification Viewed updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating notification', error });
    }
}
