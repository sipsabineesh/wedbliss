import {useState,useEffect } from 'react'
import Header from '../../components/Header'
import { useDispatch,useSelector } from 'react-redux';
import { selectPlan,clearPlan } from '../../redux/user/userSlice';
import { useAddSubscriptionMutation } from '../../redux/user/userApiSlice';
import { toast } from 'react-toastify'

export default function Success() {
  const selectedPlan = useSelector(selectPlan);
  const dispatch = useDispatch()
  
  const [addSubscription, { isLoading, isError, error }] = useAddSubscriptionMutation();

  const handleAddSubscription = async () => {
     try {
        const response = await addSubscription({selectedPlan});
        console.log(response)
        toast.success("Subscription added successfully!");
        dispatch(clearPlan());
    } catch (error) {
  //     console.error("Error occurred while adding subscription:", error);
      toast.error("An error occurred while adding subscription.");
    }
  };

  useEffect(() => {
    handleAddSubscription();
  }, []); 
  return (
    <>
     <Header/>
     <div className="payment-success-container">
      <div className="payment-success-card">
        <div className="payment-success-header">
          <h1 className="payment-success-title">Payment Successful!</h1>
        </div>
        <div className="payment-success-content">
          <p>Thank you for your payment.</p>
          <p>Your order has been successfully processed.</p>
        </div>
        <div className="payment-strips">
          <div className="payment-strip"></div>
          <div className="payment-strip"></div>
          <div className="payment-strip"></div>
          <div className="payment-strip"></div>
          <div className="payment-strip"></div>
        </div>
      </div>
    </div>
    </>
   
  )
}
