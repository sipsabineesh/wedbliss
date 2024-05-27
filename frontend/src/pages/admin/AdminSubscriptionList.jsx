// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { getSubscriptionList } from '../../redux/admin/adminSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import AdminHeader from '../../components/AdminHeader';
// import { useApproveSubscriptionMutation } from '../../redux/admin/adminApiSlice';

// export default function AdminSubscriptionList() {
//   const dispatch = useDispatch();
//   const [approveSubscription, { isLoading }] = useApproveSubscriptionMutation();
//   const subscriptions = useSelector(state => state.admin.subscriptions);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`/api/admin/viewSubscription`);
//         dispatch(getSubscriptionList(response.data));
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, [dispatch]);

//   const handleApprove = async (id) => {
//     try {
//       const res = await approveSubscription({ id }).unwrap();
   
//       if (res.status === 'success') {
//         const updatedSubscriptions = subscriptions.subscriptions.map(subscription => {
//           if (subscription._id === id) {
//             return { ...subscription, isApproved: true }; 
//           }
//           return subscription;
//         });
//         dispatch(getSubscriptionList(updatedSubscriptions)); // Update the state
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <AdminHeader />
//       <section id="home" className="admin-banner banner cover-bg">
//         <div className="container h-100">
//           <div className="row align-items-center h-100">
//             <div className="col-12 caption text-center">
//               <div className="button col-lg-6 col-md-6 col-sm-12">
//                 <main id="site-main">
//                   <h4>Subscription Management</h4>
//                   <div className="container">
//                     <form id="product-list">
//                       {subscriptions.length === 0 ? (
//                         <p>No Subscriptions available</p>
//                       ) : (
//                         <table className="table">
//                           <thead className="thead-dark">
//                             <tr>
//                               <th>User Name</th>
//                               <th>Plan Name</th>
//                               <th>Price</th>
//                               <th>Validation</th>
//                               <th>No. of Contacts</th>
//                               <th>No. of Messages</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {subscriptions.subscriptions.map(subscription => (
//                               <tr key={subscription._id}>
//                                 <td>{subscription.user.username}</td>
//                                 <td>{subscription.plan.planName}</td>
//                                 <td>{subscription.plan.planPrice}</td>
//                                 <td>{subscription.remainingValidity} Days</td>
//                                 <td>{subscription.remainingContacts}</td>
//                                 <td>{subscription.remainingMessages}</td>
//                                 <td>
//                                   {!subscription.isApproved && (
//                                     <div className="control">
//                                       <button
//                                         type="button" // Change type to button to prevent form submission
//                                         className="btns"
//                                         onClick={() => handleApprove(subscription._id)} >
//                                         Approve
//                                       </button>
//                                     </div>
//                                   )}
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       )}
//                     </form>
//                   </div>
//                 </main>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }


// // import { useEffect } from 'react';
// // import axios from 'axios';
// // import { getSubscriptionList } from '../../redux/admin/adminSlice';
// // import { useDispatch,useSelector } from 'react-redux';
// // import AdminHeader from '../../components/AdminHeader';
// // import { Link } from 'react-router-dom';
// // import {useApproveSubscriptionMutation} from '../../redux/admin/adminApiSlice';


// // export default function AdminSubscriptionList() {
     
// //  const dispatch = useDispatch();
// //  const [approveSubscription,{isLoading}] = useApproveSubscriptionMutation();

// // // const [deleteUser,{isLoading}] = useDeletePlanMutation();

// //  useEffect(() => {
// //      const fetchData = async() =>{
// //        try {
// //         const response = await axios.get(`/api/admin/viewSubscription`)
// //         console.log("^^^^^^^^^^^^^^^^")
// //         console.log(response.data)
// //          dispatch(getSubscriptionList(response.data))
// //        } catch (err) {
// //         console.log(err)
// //        }
// //      }
// //      fetchData();
// //   },[])
// //    const subscriptions = useSelector(state => state.admin.subscriptions);
// //    console.log("subscriptions--------------------")
// //  console.log(subscriptions)

// //  const handleApprove = async (id,event) => { 
// //   event.preventDefault();
// //     try {
// //       const res = await approveSubscription({id}).unwrap()
// //     } catch (error) {
// //       console.log(error)
// //     }
  
// //  }

// //   return (
// //     <>
// //     <AdminHeader/>
// //       <section id="home" className="banner cover-bg">
// //         <div className="container h-100">
// //           <div className="row align-items-center h-100">
// //             <div className="col-12 caption text-center">
// //               <div className="button col-lg-6 col-md-6 col-sm-12">
// //               <main id="site-main">
// //               <h4>Subscription Management</h4>
// //         <div className="container">
      
// //             <form id="product-list">
          
// //        {subscriptions.length === 0 ? (
// //               <p>No Subscriptions available</p>
// //             ) : (
// //             <table className="table">
// //                     <thead className="thead-dark">
// //       <tr>
// //         <th>User Name</th>
// //         <th>Plan Name</th>
// //         <th>Price</th>
// //         <th>Validation</th>
// //         <th>No. of Contacts</th>
// //         <th>No. of Messages</th>

// //         <th>Action</th>
// //       </tr>
// //     </thead>
// //     <tbody>
// //   {subscriptions.subscriptions.map(subscription => (
// //     <tr key={subscription._id}>
// //       <td>{subscription.user.username}</td>
// //       <td>{subscription.plan.planName}</td>
// //       <td>{subscription.plan.planPrice}</td>
// //       <td>{subscription.remainingValidity}</td>
// //       <td>{subscription.remainingContacts}</td>
// //       <td>{subscription.remainingMessages}</td>
// //       <td> 
// //       {!subscription.isApproved && (
// //         <div className="control">
// //           <button 
// //             type="submit" 
// //             className="btns" 
// //             onClick={(event) => handleApprove(subscription._id,event)} >
// //             Approve
// //           </button>
// //         </div>
// //       )}
// //     </td>
// //     </tr>
// //   ))}
// // </tbody>


// //   </table>
// //             )}
// //             </form>
// //         </div>

// //     </main>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //  </>
// //   )
// // }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getSubscriptionList } from '../../redux/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import AdminHeader from '../../components/AdminHeader';
import { useApproveSubscriptionMutation } from '../../redux/admin/adminApiSlice';

export default function AdminSubscriptionList() {
  const dispatch = useDispatch();
  const [approveSubscription, { isLoading }] = useApproveSubscriptionMutation();
  const subscriptions = useSelector(state => state.admin.subscriptions);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items to display per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/admin/viewSubscription`);
        dispatch(getSubscriptionList(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);

  // const handleApprove = async (id) => {
  //   try {
  //     const res = await approveSubscription({ id }).unwrap();
   
  //     if (res.status === 'success') {
  //       const updatedSubscriptions = subscriptions.subscriptions.map(subscription => {
  //         if (subscription._id === id) {
  //           return { ...subscription, isApproved: true }; 
  //         }
  //         return subscription;
  //       });
  //       dispatch(getSubscriptionList(updatedSubscriptions)); 
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleApprove = async (id,event) => { 
      event.preventDefault();
        try {
          const res = await approveSubscription({id}).unwrap()
        } catch (error) {
          console.log(error)
        }
      
     }

  const indexOfLastSubscription = currentPage * itemsPerPage;
  const indexOfFirstSubscription = indexOfLastSubscription - itemsPerPage;
  const currentSubscriptions = subscriptions.subscriptions.slice(indexOfFirstSubscription, indexOfLastSubscription);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(subscriptions.subscriptions.length / itemsPerPage);

  return (
    <>
      <AdminHeader />
      <section id="home" className="cover-bg">
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="col-12 caption text-center">
              <div className="button col-lg-6 col-md-6 col-sm-12">
                <main id="site-main">
                  <h4>Subscription Management</h4>
                  <div className="container">
                    <form id="product-list">
                      {subscriptions.subscriptions.length === 0 ? (
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
                            {currentSubscriptions.map(subscription => (
                              <tr key={subscription._id}>
                                <td>{subscription.user.username}</td>
                                <td>{subscription.plan.planName}</td>
                                <td>{subscription.plan.planPrice}</td>
                                <td>{subscription.remainingValidity} Days</td>
                                <td>{subscription.remainingContacts}</td>
                                <td>{subscription.remainingMessages}</td>
                                <td>
                                  {!subscription.isApproved && (
                                    <div className="control">
                                      <button
                                        type="button" // Change type to button to prevent form submission
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
                    <nav>
                      <ul className="pagination">
                        {[...Array(totalPages).keys()].map(number => (
                          <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                            <a onClick={() => paginate(number + 1)} className="page-link" href="#">
                              {number + 1}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
