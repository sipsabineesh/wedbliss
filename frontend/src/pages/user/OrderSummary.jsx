// // // import React from 'react';
// // // import Modal from 'react-modal';
// // // import { useDispatch,useSelector } from 'react-redux'
// // // import { setPlan } from '../../redux/user/userSlice';
// // // import {loadStripe} from '@stripe/stripe-js'
// // // Modal.setAppElement('#root');


// // // const OrderSummary = ({ isOpen, closeModal, selectedPlan  }) => {
// // //   const { currentUser } = useSelector(state => state.user);
// // //   const dispatch = useDispatch()
// // //   console.log(currentUser)
// // //   console.log("currentUser---------------------")


// // //   const makePayment = async(selectedPlan,userId) => { 
// // //     selectedPlan.userId = userId
// // //     dispatch(setPlan(selectedPlan));
    
// // //     const stripe = await loadStripe("pk_test_51P7BB4J1myCpgaSJHfkOMqHjwpMGlveAFJNoqLN6msEhwDdA36x2a79fGFiDLdtUxgPJGiIZUPhKfCC4uS1hYXXT00SlDlHENm")

// // //     const body = {
// // //         plan:selectedPlan
// // //     }
// // //     const header = {
// // //         "Content-Type": "application/json"
// // //     }
// // //     const response = await fetch(`http://localhost:3000/api/user/createCheckoutSession`,{
// // //         method : "POST",
// // //         headers:header,
// // //         body:JSON.stringify(body)
// // //     })

// // //     const session = await response.json()
// // //     // selectedPlan.sessionId = session.id
// // //     // dispatch(setPlan(selectedPlan));
// // //     const result = stripe.redirectToCheckout({
// // //         sessionId :session.id
// // //     })
   
// // //     if(await result.error){
// // //         console.log(result.error)
// // //     }

// // // }

// // //   return (
// // //     <Modal
// // //       isOpen={isOpen}
// // //       onRequestClose={closeModal}
// // //       contentLabel="Order Summary Modal"
// // //       className="modal-dialog modal-dialog-centered modal-overlay modal-summary"
// // //       style={{
// // //         overlay: {
// // //           backgroundColor: 'rgba(0, 0, 0, 0.5)'
// // //         },
// // //       }}
// // //     >
// // //      <div className="modal-content p-5">
// // //         <div className="modal-header">
// // //         <button type="button" className="close modal-close" onClick={closeModal}>
// // //             <span>&times;</span>
// // //           </button>
// // //           <h5 className="modal-title pb-3">Order Summary</h5>
// // //         </div>
// // //         <div className="modal-body">
// // //           {selectedPlan && ( 
// // //             <>
// // //               <p className="text-black"><strong>Plan Name:</strong> {selectedPlan.planName}</p>
// // //               <p className="text-black"><strong>Validity:</strong> {selectedPlan.planValidity}</p>
// // //               <p className="text-black"><strong>Price:</strong> {selectedPlan.planPrice}</p>
// // //               <p className="text-black"><strong>No.Of Contacts:</strong> {selectedPlan.noOfContacts}</p>
// // //               <p className="text-black"><strong>No.Of Messages:</strong> {selectedPlan.noOfMessages}</p>
// // //             </>
// // //           )}
// // //         </div>
// // //         <div className="modal-footer">
// // //           <button type="button" className="btns" onClick={() => makePayment(selectedPlan,currentUser._id)}>Proceed to Pay</button>
// // //         </div>import React from 'react';
// // import Modal from 'react-modal';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { setPlan } from '../../redux/user/userSlice';
// // import { loadStripe } from '@stripe/stripe-js';

// // Modal.setAppElement('#root');

// // const OrderSummary = ({ isOpen, closeModal, selectedPlan }) => {
// //   const { currentUser } = useSelector(state => state.user);
// //   const dispatch = useDispatch();

// //   const makePayment = async (selectedPlan, userId) => {
// //     selectedPlan.userId = userId;
// //     dispatch(setPlan(selectedPlan));

// //     const stripe = await loadStripe("pk_test_51P7BB4J1myCpgaSJHfkOMqHjwpMGlveAFJNoqLN6msEhwDdA36x2a79fGFiDLdtUxgPJGiIZUPhKfCC4uS1hYXXT00SlDlHENm");

// //     const body = {
// //       plan: selectedPlan
// //     };

// //     const header = {
// //       "Content-Type": "application/json"
// //     };

// //     const response = await fetch(`http://localhost:3000/api/user/createCheckoutSession`, {
// //       method: "POST",
// //       headers: header,
// //       body: JSON.stringify(body)
// //     });

// //     const session = await response.json();

// //     const result = stripe.redirectToCheckout({
// //       sessionId: session.id
// //     });

// //     if (result.error) {
// //       console.log(result.error);
// //     }
// //   };

// //   return (
// //     <Modal
// //       isOpen={isOpen}
// //       onRequestClose={closeModal}
// //       contentLabel="Order Summary Modal"
// //       className="modal-dialog modal-dialog-centered modal-overlay modal-summary"
// //       style={{
// //         overlay: {
// //           backgroundColor: 'rgba(0, 0, 0, 0.5)'
// //         }
// //       }}
// //     >
// //       <div className="modal-content p-5">
// //         <div className="modal-header">
// //           <button type="button" className="close modal-close" onClick={closeModal}>
// //             <span>&times;</span>
// //           </button>
// //           <h5 className="modal-title pb-3">Order Summary</h5>
// //         </div>
// //         <div className="modal-body">
// //           {selectedPlan && (
// //             <>
// //               <p className="text-black"><strong>Plan Name:</strong> {selectedPlan.planName}</p>
// //               <p className="text-black"><strong>Validity:</strong> {selectedPlan.planValidity}</p>
// //               <p className="text-black"><strong>Price:</strong> {selectedPlan.planPrice}</p>
// //               <p className="text-black"><strong>No. Of Contacts:</strong> {selectedPlan.noOfContacts}</p>
// //               <p className="text-black"><strong>No. Of Messages:</strong> {selectedPlan.noOfMessages}</p>
// //             </>
// //           )}
// //         </div>
// //         <div className="modal-footer">
// //           <button type="button" className="btns" onClick={() => makePayment(selectedPlan, currentUser._id)}>Proceed to Pay</button>
// //         </div>
// //       </div>
// //     </Modal>
// //   );
// // };

// // export default OrderSummary;

// // //       </div>
// // //     </Modal>
// // //   );
// // // };

// // // export default OrderSummary;


// import React from 'react';
// import Modal from 'react-modal';
// import { useDispatch, useSelector } from 'react-redux';
// import { setPlan } from '../../redux/user/userSlice';
// import { loadStripe } from '@stripe/stripe-js';
// import styled from 'styled-components';

// Modal.setAppElement('#root');

// const StyledModal = styled(Modal)`
//   .modal-content {
//     padding: 20px;
//     border-radius: 8px;
//     background: #fff;
//     max-width: 500px;
//     margin-top: 100px;
//     margin-left:32%
//   }

//   .modal-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     border-bottom: 1px solid #dee2e6;
//     padding-bottom: 10px;
//     margin-bottom: 20px;
//   }

//   .modal-title {
//     font-size: 1.5rem;
//     color: #333;
//   }

//   .modal-close {
//     background: none;
//     border: none;
//     font-size: 1.5rem;
//     color: #aaa;
//     cursor: pointer;
//   }

//   .modal-body {
//     font-size: 1rem;
//     color: #555;
//   }

//   .modal-footer {
//     display: flex;
//     justify-content: flex-end;
//     border-top: 1px solid #dee2e6;
//     padding-top: 10px;
//     margin-top: 20px;
//   }

//   .btn {
//     background-color: #007bff;
//     color: #fff;
//     border: none;
//     padding: 10px 20px;
//     border-radius: 4px;
//     cursor: pointer;
//     font-size: 1rem;
//   }

//   .btn:hover {
//     background-color: #0056b3;
//   }
// `;

// const OrderSummary = ({ isOpen, closeModal, selectedPlan }) => {
//   const { currentUser } = useSelector(state => state.user);
//   const dispatch = useDispatch();

//   const makePayment = async (selectedPlan, userId) => {
//     selectedPlan.userId = userId;
//     dispatch(setPlan(selectedPlan));

//     const stripe = await loadStripe("pk_test_51P7BB4J1myCpgaSJHfkOMqHjwpMGlveAFJNoqLN6msEhwDdA36x2a79fGFiDLdtUxgPJGiIZUPhKfCC4uS1hYXXT00SlDlHENm");

//     const body = { plan: selectedPlan };

//     const header = {
//       "Content-Type": "application/json"
//     };

//     const response = await fetch(`http://localhost:3000/api/user/createCheckoutSession`, {
//       method: "POST",
//       headers: header,
//       body: JSON.stringify(body)
//     });

//     const session = await response.json();

//     const result = stripe.redirectToCheckout({ sessionId: session.id });

//     if (result.error) {
//       console.log(result.error);
//     }
//   };

//   return (
//     <StyledModal
//       isOpen={isOpen}
//       onRequestClose={closeModal}
//       contentLabel="Order Summary Modal"
//       style={{
//         overlay: {
//           backgroundColor: 'rgba(0, 0, 0, 0.5)'
//         }
//       }}
//     >
//       <div className="modal-content">
//         <div className="modal-header">
//           <h5 className="modal-title">Order Summary</h5>
//           <button type="button" className="modal-close" onClick={closeModal}>
//             &times;
//           </button>
//         </div>
//         <div className="modal-body">
//           {selectedPlan && (
//             <>
//               <p><strong>Plan Name:</strong> {selectedPlan.planName} <strong>Validity:</strong> {selectedPlan.planValidity}</p>
//               <p></p>
//               <p><strong>Price:</strong> {selectedPlan.planPrice}<strong>No. Of Contacts:</strong> {selectedPlan.noOfContacts}</p>
//               <p></p>
//               <p><strong>No. Of Messages:</strong> {selectedPlan.noOfMessages}</p>
//             </>
//           )}
//         </div>
//         <div className="modal-footer">
//           <button type="button" className="btns" onClick={() => makePayment(selectedPlan, currentUser._id)}>
//             Proceed to Pay
//           </button>
//         </div>
//       </div>
//     </StyledModal>
//   );
// };

// export default OrderSummary;
import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { setPlan } from '../../redux/user/userSlice';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';

Modal.setAppElement('#root');

const StyledModal = styled(Modal)`
  .modal-content {
    padding: 20px;
    border-radius: 8px;
    background: #fff;
    max-width: 500px;
    margin-top: 100px;
    margin-left:32%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }

  .modal-title {
    font-size: 1.5rem;
    color: #333;
  }

  .modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #aaa;
    cursor: pointer;
  }

  .modal-body {
    font-size: 1rem;
    color: #555;
  }

  .plan-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .plan-detail {
    display: flex;
    justify-content: space-between;
  }

  .plan-label {
    font-weight: bold;
    color: #333;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #dee2e6;
    padding-top: 10px;
    margin-top: 20px;
  }

  .btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  .btn:hover {
    background-color: #0056b3;
  }
`;

const OrderSummary = ({ isOpen, closeModal, selectedPlan }) => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const makePayment = async (selectedPlan, userId) => { 
    
    const planWithUserId = { ...selectedPlan, userId };  
    dispatch(setPlan(planWithUserId));

    const stripe = await loadStripe("pk_test_51P7BB4J1myCpgaSJHfkOMqHjwpMGlveAFJNoqLN6msEhwDdA36x2a79fGFiDLdtUxgPJGiIZUPhKfCC4uS1hYXXT00SlDlHENm");

    const body = { plan: selectedPlan };

    const header = {
      "Content-Type": "application/json"
    };

    const response = await fetch(`http://localhost:3000/api/user/createCheckoutSession`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Order Summary Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
      }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Order Summary</h5>
          <button type="button" className="modal-close" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {selectedPlan && (
            <div className="plan-details">
              <div className="plan-detail">
                <span className="plan-label">Plan Name:</span>
                <span>{selectedPlan.planName}</span>
              </div>
              <div className="plan-detail">
                <span className="plan-label">Validity:</span>
                <span>{selectedPlan.planValidity}</span>
              </div>
              <div className="plan-detail">
                <span className="plan-label">Price:</span>
                <span>{selectedPlan.planPrice}</span>
              </div>
              <div className="plan-detail">
                <span className="plan-label">No. Of Contacts:</span>
                <span>{selectedPlan.noOfContacts}</span>
              </div>
              <div className="plan-detail">
                <span className="plan-label">No. Of Messages:</span>
                <span>{selectedPlan.noOfMessages}</span>
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button type="button" className="btns" onClick={() => makePayment(selectedPlan, currentUser._id)}>
            Proceed to Pay
          </button>
        </div>
      </div>
    </StyledModal>
  );
};

export default OrderSummary;
