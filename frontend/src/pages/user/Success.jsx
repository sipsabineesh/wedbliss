import React from 'react'

export default function Success() {
  return (
    <>
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
