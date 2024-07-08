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
        const notification = await Notification.findById(req.params.notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        } 
        notification.isViewed = req.body.isViewed;
        await notification.save();
        res.status(200).json({ message: 'Notification Viewed updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating notification', error });
    }
}

export const getRenewalNotificationsForAdmin = async(req,res,next) => {
//     try {
// console.log(" IN getRenewalNotificationsForAdmin")
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching notification for Admin', error });
//     }


    try {
        const notifications = await Notification.find({ target: 'admin',isViewed:false })
            .populate({
                path: 'subscriptionId', 
                populate: {
                    path: 'userId', 
                    select: 'username' 
                }
            });

 console.log("notificationData")     
 console.log(notifications)
        if (!notifications) {
            return res.status(200).json({ notifications: [] });
        }

       
        const notificationData = notifications.map(notification => ({
            _id: notification._id,
            subscriptionId: notification.subscriptionId._id,
            username: notification.subscriptionId.userId.username,
            title: notification.title,
            message: notification.message,
            date: notification.date,
            isViewed: notification.isViewed
        }));

        // Send the prepared notification data as the response
        res.status(200).json({ notifications: notificationData });
    } catch (error) {
        // Handle any errors that occur during fetching and populating notifications
        res.status(500).json({ message: 'Error fetching notifications for Admin', error });
    }

}