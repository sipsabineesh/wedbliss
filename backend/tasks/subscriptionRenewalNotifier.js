import cron from 'node-cron';
import Subscription from '../models/subscriptionModel.js'
import Notification from '../models/notificationModel.js';

export default function subscriptionRenewalNotifier(io) {
    cron.schedule('* * * * *', async () => {
        const now = new Date();
        const soonToExpireDate = new Date(now);
        soonToExpireDate.setDate(now.getDate() + 7); 
    
        try {
            const subscriptions = await Subscription.find({ validTill: { $lte: soonToExpireDate } });
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
                    });
                    await notification.save();
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
