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
