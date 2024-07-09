import Notification from '../models/notificationModel.js';

export const handleNotificationEvents = (socket, io) => {
    socket.on('reportAbuse', async (data) => {
        try {
            const { reporterId, reportedUserId, reason } = data;
            const notification = new Notification({
                userId: reporterId,
                title: 'Abuse Report',
                message: `User ${reportedUserId} has been reported for: ${reason}`,
                target: 'admin'
            });

            await notification.save();

            // Notify admin
            io.emit('adminNotification', {
                message: `User ${reportedUserId} has been reported for: ${reason}`
            });
        } catch (error) {
            console.error('Error handling report abuse event:', error);
        }
    });
};
