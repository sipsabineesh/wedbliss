import { useState,useEffect } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import {useGetPlansQuery } from '../../redux/user/userApiSlice';
import OrderSummary from './OrderSummary';
import Header from '../../components/Header';

export default function Plans() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null); 
   

  const openModal = (plan) => {
    setSelectedPlan(plan)
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

    const { data: planList, isLoading, isError, error } = useGetPlansQuery();
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
 
    
  return (
    <>
    <Header/>
              <section id="package" className="package section_padding">
            <div className="container">
              <div className="row">
                <div className="section_title text-center">
                <OrderSummary isOpen={isOpen} closeModal={closeModal} selectedPlan={selectedPlan} />

                  <p>What More Will You Get</p>
                  <h3>Packages</h3>
                </div>
                {planList.plan.map((plan) => (
                            <div key={plan._id} className="col-lg-4 col-md-6 col-sm-12 py-15">
                                <div className="package_box box">
                                    <div className="icon">
                                        <i className="fa fa-star-half-o"></i>
                                    </div>
                                    <div className="text">
                                        <h4 className="box_title mb-20">{plan.planName}</h4>
                                        <p>{plan.planValidity}</p>
                                        <p>Price: {plan.planPrice}</p>
                                       
                                    </div>
                                    <div className="col-md-12">
                                       <div className="control">
                                            <button type="submit" onClick={() => openModal(plan)} className="btns">Subscribe</button>
                                       </div>
                                    </div>
                                </div>
                            </div>
                            
                        ))}
               

              </div>
            </div>
          </section>
          </>
  )
}
