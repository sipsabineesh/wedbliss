import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getPlanList } from '../../redux/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader';
import { useDeletePlanMutation } from '../../redux/admin/adminApiSlice';

export default function AdminPlanList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deletePlan, { isLoading }] = useDeletePlanMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/admin/viewPlans`);
        dispatch(getPlanList(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Do you really want to delete?");
    if (confirmation) {
      try {
        await deletePlan({ id }).unwrap();
        dispatch(getPlanList(plans.plan.filter(plan => plan._id !== id)));
        navigate('/planList')
      } catch (error) {
        console.log(error);
      }
    }
  }

  const plans = useSelector(state => state.admin.plans);

  if (!plans.plan) {
    return <p>Loading...</p>;
  }

  const indexOfLastPlan = currentPage * itemsPerPage;
  const indexOfFirstPlan = indexOfLastPlan - itemsPerPage;
  const currentPlans = plans.plan.slice(indexOfFirstPlan, indexOfLastPlan);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(plans.plan.length / itemsPerPage);

  return (
    <>
      <AdminHeader />
      <section id="home" className="cover-bg">
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="col-12 caption text-center">
              <div className="button col-lg-6 col-md-6 col-sm-12">
                <main id="site-main">
                  <h4>Plan Management</h4>
                  <div className="container">
                    <div className="add-button-container">
                      <Link to='/createPlan' className='btns'>
                        Add +
                      </Link>
                    </div>
                    <form id="product-list">
                      {plans.plan.length === 0 ? (
                        <p>No plans available</p>
                      ) : (
                        <>
                          <table className="table">
                            <thead className="thead-dark">
                              <tr>
                                <th>Plan Name</th>
                                <th>Validation</th>
                                <th>Price</th>
                                <th>No. of Contacts</th>
                                <th>No. of Messages</th>
                                <th colSpan="2">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentPlans.map(plan => (
                                <tr key={plan._id}>
                                  <td>{plan.planName}</td>
                                  <td>{plan.planValidity}</td>
                                  <td>{plan.planPrice}</td>
                                  <td>{plan.noOfContacts}</td>
                                  <td>{plan.noOfMessages}</td>
                                  <td>
                                    <Link to={`/editPlan/${plan._id}`} className="btns">Edit</Link>
                                  </td>
                                  <td>
                                    <div className="control">
                                      <button
                                        type="button"
                                        className="btns"
                                        onClick={() => handleDelete(plan._id)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
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
                        </>
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


// import { useEffect } from 'react';
// import axios from 'axios'
// import { getPlanList } from '../../redux/admin/adminSlice';
// import { useDispatch,useSelector } from 'react-redux';
// import AdminHeader from '../../components/AdminHeader';
// import { Link } from 'react-router-dom';
// import { useDeletePlanMutation } from '../../redux/admin/adminApiSlice';

// export default function AdminPlanList() {
    
//  const dispatch = useDispatch();
//  const [deletePlan,{isLoading}] = useDeletePlanMutation();
  
//   useEffect(() => {
//     const fetchData = async() =>{
//       try {
//         const response = await axios.get(`/api/admin/viewPlans`)
//         console.log(response.data)
//         dispatch(getPlanList(response.data))
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     fetchData();
    
//   },[])
//   const handleDelete = async (id) => {    
//    const confirmation = confirm("Do you really want to delete?")
//    if(confirmation){
//      try {
//        const res = await deletePlan({id}).unwrap()
//        window.location.reload(false);
//      } catch (error) {
//        console.log(error)
//      }
//    }
//   }
 
//   const plans = useSelector(state => state.admin.plans);
//   return (
//     <>
//     <AdminHeader/>
//       <section id="home" className="cover-bg">
//         <div className="container h-100">
//           <div className="row align-items-center h-100">
//             <div className="col-12 caption text-center">
//               <div className="button col-lg-6 col-md-6 col-sm-12">
//               <main id="site-main">
//                 <h4>Plan Management</h4> 
//         <div className="container">
        
//         <div className="add-button-container">
//          <Link to='/createPlan' className='btns' >
//           Add +
//          </Link>
//          </div>
//             <form id="product-list">
          
//        {plans.plan.length === 0 ? (
//               <p>No plans available</p>
//             ) : (
//             <table className="table">
//                     <thead className="thead-dark">
//       <tr>
//         <th>Plan Name</th>
//         <th>Validation</th>
//         <th>Price</th>
//         <th>No. of Contacts</th>
//         <th>No. of Messages</th>

//         <th colSpan="2">Actions</th>
//       </tr>
//     </thead>
//     <tbody>
                      
//     {Object.keys(plans).map(key => (
//         plans[key].map(plan => ( 
//           <tr key={plan._id}>
//               <td>{plan.planName}</td>
//               <td>{plan.planValidity}</td>
//               <td>{plan.planPrice}</td>
//               <td>{plan.noOfContacts}</td>
//               <td>{plan.noOfMessages}</td>
//               <td> 
//                  <Link to={`/editPlan/${plan._id}`}  className="btns" >Edit</Link>
//               </td> 
//               <td> 
//                 <div className="control">
//                     <button 
//                       type="submit" 
//                       className="btns" onClick={() => handleDelete(plan._id)} >
//                        Delete
//                     </button>
//                 </div> 
//               </td> 
//           </tr>
//         ))
//       ))}


//     </tbody>
//   </table>
//             )}
//             </form>
//         </div>

//     </main>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//  </>
//   )
// }


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { getPlanList } from '../../redux/admin/adminSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import AdminHeader from '../../components/AdminHeader';
// import { Link } from 'react-router-dom';
// import { useDeletePlanMutation } from '../../redux/admin/adminApiSlice';

// export default function AdminPlanList() {
    
//   const dispatch = useDispatch();
//   const [deletePlan, { isLoading }] = useDeletePlanMutation();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   useEffect(async() => {
//     // const fetchData = async () => {
//       try {
//         const response = await axios.get(`/api/admin/viewPlans`);
//         dispatch(getPlanList(response.data));
//       } catch (err) {
//         console.log(err);
//       }
//     // };
//     // fetchData();
//   }, [dispatch]);

//   const handleDelete = async (id) => {
//     const confirmation = window.confirm("Do you really want to delete?");
//     if (confirmation) {
//       try {
//         const res = await deletePlan({ id }).unwrap();
//         window.location.reload(false); 
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }

//   const plans = useSelector(state => state.admin.plans);

//   const indexOfLastPlan = currentPage * itemsPerPage;
//   const indexOfFirstPlan = indexOfLastPlan - itemsPerPage;
//   const currentPlans = plans.plan.slice(indexOfFirstPlan, indexOfLastPlan);

//   const paginate = pageNumber => setCurrentPage(pageNumber);

//   const totalPages = Math.ceil(plans.plan.length / itemsPerPage);

//   return (
//     <>
//       <AdminHeader />
//       <section id="home" className="cover-bg">
//         <div className="container h-100">
//           <div className="row align-items-center h-100">
//             <div className="col-12 caption text-center">
//               <div className="button col-lg-6 col-md-6 col-sm-12">
//                 <main id="site-main">
//                   <h4>Plan Management</h4>
//                   <div className="container">
//                     <div className="add-button-container">
//                       <Link to='/createPlan' className='btns'>
//                         Add +
//                       </Link>
//                     </div>
//                     <form id="product-list">
//                       {plans.plan.length === 0 ? (
//                         <p>No plans available</p>
//                       ) : (
//                           <>
//                             <table className="table">
//                               <thead className="thead-dark">
//                                 <tr>
//                                   <th>Plan Name</th>
//                                   <th>Validation</th>
//                                   <th>Price</th>
//                                   <th>No. of Contacts</th>
//                                   <th>No. of Messages</th>
//                                   <th colSpan="2">Actions</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {currentPlans.map(plan => (
//                                   <tr key={plan._id}>
//                                     <td>{plan.planName}</td>
//                                     <td>{plan.planValidity}</td>
//                                     <td>{plan.planPrice}</td>
//                                     <td>{plan.noOfContacts}</td>
//                                     <td>{plan.noOfMessages}</td>
//                                     <td>
//                                       <Link to={`/editPlan/${plan._id}`} className="btns">Edit</Link>
//                                     </td>
//                                     <td>
//                                       <div className="control">
//                                         <button
//                                           type="submit"
//                                           className="btns"
//                                           onClick={() => handleDelete(plan._id)} >
//                                           Delete
//                                         </button>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                             <nav>
//                               <ul className="pagination">
//                                 {[...Array(totalPages).keys()].map(number => (
//                                   <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
//                                     <a onClick={() => paginate(number + 1)} className="page-link" href="#">
//                                       {number + 1}
//                                     </a>
//                                   </li>
//                                 ))}
//                               </ul>
//                             </nav>
//                           </>
//                         )}
//                     </form>
//                   </div>
//                 </main>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }
