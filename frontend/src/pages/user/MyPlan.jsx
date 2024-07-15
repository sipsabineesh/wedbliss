
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../../components/Header';

export default function MyPlan() {
  const [planDetails, setPlanDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);


  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await axios.get(`/api/user/viewUserPlan/${currentUser._id}`);
        setPlanDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        setLoading(false);
      }
    };

    fetchPlanDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const { planDetails: plan, validTill, remainingContacts, remainingMessages } = planDetails;
  const { planName, planValidity, planPrice, noOfContacts, noOfMessages } = plan;

  return (
    <>
    <Header/>
    {/* <div className="my-plan">
      <h3>My Plan Details</h3>
      <div className="plan-info">
        <h2>{planName}</h2>
        <p><strong>Validity:</strong> {planValidity}</p>
        <p><strong>Price:</strong> ₹ {planPrice}</p>
        <p><strong>Contacts Allowed:</strong> {noOfContacts}</p>
        <p><strong>Messages Allowed:</strong> {noOfMessages}</p>
      </div>
      <div className="subscription-info">
        <p><strong>Valid Till:</strong> {new Date(validTill).toLocaleDateString()}</p>
        <p><strong>Remaining Contacts:</strong> {remainingContacts}</p>
        <p><strong>Remaining Messages:</strong> {remainingMessages}</p>
      </div>
    </div> */
    }
    <div className="my-plan-container">
      <h3>My Plan</h3>
      <div className="my-plan">
        <div className="plan-info">
          <h4>{planName}</h4>
          <div className="plan-details">
            <p><strong>Validity:</strong> {planValidity}</p>
            <p><strong>Price:</strong> ₹ {planPrice}</p>
            <p><strong>Contacts Allowed:</strong> {noOfContacts}</p>
            <p><strong>Messages Allowed:</strong> {noOfMessages}</p>
          </div>
        </div>
        <div className="subscription-info">
          <h4>Subscription Details</h4>
          <p><strong>Valid Till:</strong> {new Date(validTill).toLocaleDateString()}</p>
          <p><strong>Remaining Contacts:</strong> {remainingContacts}</p>
          <p><strong>Remaining Messages:</strong> {remainingMessages}</p>
        </div>
      </div>
    </div>
    </>
  );
};

