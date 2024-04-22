import stripe from 'stripe';
import User from '../models/userModel.js'
import Subscription from '../models/subscriptionModel.js'
const stripeIntegration = stripe('sk_test_51P7BB4J1myCpgaSJBfMBwYeeIBXi2nhMs22smIYQTxqDnuMHEV0NrQvfUtr3fzkgwm1Awl0t2cDSOS4IxKOS887n00sjBVtaa7');

export const getCheckOutSession = async(req,res,next) => {
    const {plan} = req.body
    console.log(plan)
   try {
    
    const items = {
         price_data:{
            currency:"inr",
            product_data:{
                name:plan.planName,
            },
            unit_amount:plan.planPrice*100,
         },
         quantity:1
    }
    const session = await stripeIntegration.checkout.sessions.create({
        payment_method_types : ["card"],
        line_items:[items],
        mode:"payment",
        success_url:"http://localhost:5173/success",
        cancel_url:"http://localhost:5173/cancel"
    })
    if(session.id) {
        
       const updatedData = {"isSubscribed" : true}
       const id = plan.userId
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            {
              $set:updatedData
            },
            { new: true }
          )
          const {_id,planName,planValidity,planPrice,noOfContacts,noOfMessages,userId}  = plan
          const sessionId = session.id
          const newSubscription = new Subscription(
                 {
                    userId,
                    "planId":_id,
                    "remainingValidity":planValidity,
                    "stripeSessionId":sessionId,
                    "remainingContacts":noOfContacts,
                    "remainingMessages":noOfMessages,
                    "isPaid":true
                })
               await newSubscription.save()
            //   res.json({status:201,message: 'Subscription data saved successfully'})
    }
    res.json({id:session.id})
   } catch (error) {
    console.log(error)
   } 
}

const listSubscriptionsWithDetails = async () => {
    try {
      const subscriptions = await Subscription.aggregate([
        {
          $lookup: {
            from: 'plans',
            localField: 'planId',
            foreignField: '_id',
            as: 'plan',
          },
        },
        
        { $unwind: '$plan' },
       
        {
          $lookup: {
            from: 'users', 
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
       
        { $unwind: '$user' },
      
        {
          $project: {
            _id: 1,
            stripeSessionId: 1,
            remainingValidity: 1,
            remainingContacts: 1,
            remainingMessages: 1,
            isPaid: 1,
            isDeleted: 1,
            isApproved:1,
            'plan.planName': 1,
            'plan.planPrice': 1,
            'user.username': 1,
          },
        },
      ]);
  
      return subscriptions;
    } catch (error) {
      console.error('Error listing subscriptions with details:', error);
      throw error;
    }
  };

export const getSubscriptions = async(req,res,next) => {

 listSubscriptionsWithDetails()
  .then((subscriptions) => {
    res.json({subscriptions})
   // console.log('Subscriptions with details:', subscriptions);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


}

export const approveSubscription = async(req,res,next) => {
console.log("approveSubscription")
try {
    const subscription = await Subscription.findById(req.body.id);
    if(subscription){
        subscription.isApproved = true;
        const approved =await subscription.save();
        res.status(200).json({
            _id: approved._id,
            success: true,
            message: 'Subscription Approved Successfully',
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
    
  } catch (error) {
    console.log(error.message);
  }
 
}
  
