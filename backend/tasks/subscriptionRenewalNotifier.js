import cron from 'node-cron';
import Subscription from '../models/subscriptionModel.js'
import Notification from '../models/notificationModel.js';
import User from '../models/userModel.js';

export default function subscriptionRenewalNotifier(io) {
    cron.schedule('* * * * *', async () => {
        const now = new Date();
        const soonToExpireDate = new Date(now);
        soonToExpireDate.setDate(now.getDate() + 7); 
    
        try {
            // const subscriptions = await Subscription.find({ validTill: { $lte: soonToExpireDate } });
            const subscriptions = await Subscription.find({
                validTill: { $lte: soonToExpireDate },
            }).populate('userId');
            for (const subscription of subscriptions) {
                
                const existingNotification = await Notification.findOne({ subscriptionId: subscription._id });
                if (!existingNotification) {
                    const notification = new Notification({
                        userId : subscription.userId,
                        subscriptionId: subscription._id,
                        title: 'Your Validity Period is about to end',
                        message: `Your subscription is about to expire on ${subscription.validTill}. Please renew it soon.`,
                        date: new Date(),
                        read: false,
                        target: 'user',
                    });
                    await notification.save();
                    const adminNotification = new Notification({
                        subscriptionId: subscription._id,
                        title: 'User Subscription Renewal Due',
                        message: `User ${subscription.userId.username}'s subscription will expire on ${subscription.validTill.toLocaleDateString()}.`,
                        target: 'admin',
                    });
                    await adminNotification.save();
                    console.log("Notification saved in cron job:", notification);
                    
                    io.to(subscription.userId.toString()).emit('subscriptionRenewal', {
                        message: notification.message,
                        date: notification.date, 
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        }
    });
}
