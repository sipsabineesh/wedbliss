import { useEffect } from 'react';
import axios from 'axios';
import { getSubscriptionList } from '../../redux/admin/adminSlice';
import { useDispatch,useSelector } from 'react-redux';
import AdminHeader from '../../components/AdminHeader';
import { Link } from 'react-router-dom';
import {useApproveSubscriptionMutation} from '../../redux/admin/adminApiSlice';


export default function AdminSubscriptionList() {
     
 const dispatch = useDispatch();
 const [approveSubscription,{isLoading}] = useApproveSubscriptionMutation();

// const [deleteUser,{isLoading}] = useDeletePlanMutation();

 useEffect(() => {
     const fetchData = async() =>{
       try {
        const response = await axios.get(`/api/admin/viewSubscription`)
        console.log("^^^^^^^^^^^^^^^^")
        console.log(response.data)
         dispatch(getSubscriptionList(response.data))
       } catch (err) {
        console.log(err)
       }
     }
     fetchData();
  },[])
   const subscriptions = useSelector(state => state.admin.subscriptions);
   console.log("subscriptions--------------------")
 console.log(subscriptions)

 const handleApprove = async (id) => { 
 
    try {
      const res = await approveSubscription({id}).unwrap()
      window.location.reload(false);
    } catch (error) {
      console.log(error)
    }
  
 }

  return (
    <>
    <AdminHeader/>
      <section id="home" className="banner cover-bg">
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="col-12 caption text-center">
              <div className="button col-lg-6 col-md-6 col-sm-12">
              <main id="site-main">
        <div className="container">
      
            <form id="product-list">
          
       {subscriptions.length === 0 ? (
              <p>No Subscriptions available</p>
            ) : (
            <table className="table">
                    <thead className="thead-dark">
      <tr>
        <th>User Name</th>
        <th>Plan Name</th>
        <th>Price</th>
        <th>Validation</th>
        <th>No. of Contacts</th>
        <th>No. of Messages</th>

        <th>Action</th>
      </tr>
    </thead>
    <tbody>
  {subscriptions.subscriptions.map(subscription => (
    <tr key={subscription._id}>
      <td>{subscription.user.username}</td>
      <td>{subscription.plan.planName}</td>
      <td>{subscription.plan.planPrice}</td>
      <td>{subscription.remainingValidity}</td>
      <td>{subscription.remainingContacts}</td>
      <td>{subscription.remainingMessages}</td>
      <td> 
      {!subscription.isApproved && (
        <div className="control">
          <button 
            type="submit" 
            className="btns" 
            onClick={() => handleApprove(subscription._id)} >
            Approve
          </button>
        </div>
      )}
    </td>
    </tr>
  ))}
</tbody>


  </table>
            )}
            </form>
        </div>

    </main>
              </div>
            </div>
          </div>
        </div>
      </section>
 </>
  )
}


