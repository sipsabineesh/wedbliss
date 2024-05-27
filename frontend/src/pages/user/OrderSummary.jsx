import React from 'react';
import Modal from 'react-modal';
import { useDispatch,useSelector } from 'react-redux'
import { setPlan } from '../../redux/user/userSlice';
import {loadStripe} from '@stripe/stripe-js'
Modal.setAppElement('#root');


const OrderSummary = ({ isOpen, closeModal, selectedPlan  }) => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch()
  console.log(currentUser)
  console.log("currentUser---------------------")


  const makePayment = async(selectedPlan,userId) => { 
    selectedPlan.userId = userId
    dispatch(setPlan(selectedPlan));
    
    const stripe = await loadStripe("pk_test_51P7BB4J1myCpgaSJHfkOMqHjwpMGlveAFJNoqLN6msEhwDdA36x2a79fGFiDLdtUxgPJGiIZUPhKfCC4uS1hYXXT00SlDlHENm")

    const body = {
        plan:selectedPlan
    }
    const header = {
        "Content-Type": "application/json"
    }
    const response = await fetch(`http://localhost:3000/api/user/createCheckoutSession`,{
        method : "POST",
        headers:header,
        body:JSON.stringify(body)
    })

    const session = await response.json()
    // selectedPlan.sessionId = session.id
    // dispatch(setPlan(selectedPlan));
    const result = stripe.redirectToCheckout({
        sessionId :session.id
    })
   
    if(await result.error){
        console.log(result.error)
    }

}

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Order Summary Modal"
      className="modal-dialog modal-dialog-centered modal-overlay modal-summary"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
      }}
    >
     <div className="modal-content p-5">
        <div className="modal-header">
        <button type="button" className="close modal-close" onClick={closeModal}>
            <span>&times;</span>
          </button>
          <h5 className="modal-title pb-3">Order Summary</h5>
        </div>
        <div className="modal-body">
          {selectedPlan && ( 
            <>
              <p className="text-black"><strong>Plan Name:</strong> {selectedPlan.planName}</p>
              <p className="text-black"><strong>Validity:</strong> {selectedPlan.planValidity}</p>
              <p className="text-black"><strong>Price:</strong> {selectedPlan.planPrice}</p>
              <p className="text-black"><strong>No.Of Contacts:</strong> {selectedPlan.noOfContacts}</p>
              <p className="text-black"><strong>No.Of Messages:</strong> {selectedPlan.noOfMessages}</p>
            </>
          )}
        </div>
        <div className="modal-footer">
          <button type="button" className="btns" onClick={() => makePayment(selectedPlan,currentUser._id)}>Proceed to Pay</button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderSummary;
