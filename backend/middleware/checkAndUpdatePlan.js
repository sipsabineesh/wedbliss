
import Subscription from '../models/subscriptionModel.js';
import Conversation from '../models/conversationModel.js';

export const checkAndUpdatePlan = async (req, res, next) => {
  const { sender, recipientId } = req.body;
  
  try {
    const existingConversation = await Conversation.findOne({
      members: { $all: [sender, recipientId] }
    });

    if (!existingConversation) {
      const plan = await Subscription.findOne({ sender });
      console.log("Subscriped Plan for the sender  before updating no.of messages :" ,plan)
      if (!plan) {
        return res.status(404).json({ message: 'No subscription plan found for user.' });
      }

      if (plan.remainingMessages <= 0) {
        return res.status(403).json({ message: 'No remaining messages in your plan.' });
      }

      await Subscription.updateOne({ sender }, { $inc: { remainingMessages: -1 } });

      req.plan = plan;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
