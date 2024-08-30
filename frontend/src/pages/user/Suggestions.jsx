
import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, logout, setUserIdForContact } from '../../redux/user/userSlice';
import { io } from 'socket.io-client';
import Header from '../../components/Header';
import { toast } from 'react-toastify';
import axios from 'axios';
import Messenger from './Messenger';


const socket = io('http://localhost:3000');

export default function Suggestions() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState({});
  const [interestsSent, setInterestsSent] = useState([]);
  const [acceptedInterests, setAcceptedInterests] = useState([]);
  const [newInterestUser, setNewInterestUser] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasMoreSuggestions, setHasMoreSuggestions] = useState(true);
  const { currentUser, sentInterests } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSubscriptionStatus() {
        try {
            const response = await fetch(`/api/user/getUser/${currentUser._id}`);
            const data = await response.json();
            setUser(data.user);
        } catch (error) {
            console.error('Error fetching subscription status:', error);
        } finally {
            setLoading(false); 
        }
    }

    if (currentUser) {
        fetchSubscriptionStatus();
    } else {
        setLoading(false); 
    }
}, [currentUser]);

useEffect(() => {
  if (currentUser?._id) {
      socket.emit('joinRoom', currentUser._id);
      console.log('Joined room:', currentUser._id); 
  }

  return () => {
      socket.disconnect();
      console.log('Socket disconnected'); 
  };
}, [currentUser]);

  // useEffect(() => {
  //   if (currentUser?._id) {
  //     socket.emit('joinRoom', currentUser._id);     
  //     // alert("emitted joinRoom with "+currentUser._id)
  //   }

  //   return () => {
  //     socket.disconnect(); 
  //   };
  // }, [currentUser]);
  
  // useEffect(() => { 
  //   socket.on('newInterest', (userData) => { 
  //     console.log('New interest received from:', userData);
  //     setNewInterestUser(userData);
  //     toast.success(`You have received a new interest from ${userData.username}`);
  //   },newInterestUser);

  //   return () => {
  //     socket.off('newInterest');
  //   };
  // }, []);

  useEffect(() => {
    socket.on('interestAccepted', ({ interestId, acceptedBy }) => { 
      console.log('Interest accepted:', interestId, 'by', acceptedBy);
      setAcceptedInterests(prev => [...prev, { interestId, acceptedBy }]);
      toast.success(`Your interest has been accepted by user ${acceptedBy}`);
    });

    return () => {
      socket.off('interestAccepted');
    };
  }, []);

  const fetchSuggestions = async (page) => {
    try {
      const response = await fetch(`/api/user/getSuggestions/${currentUser?._id}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
     
      if (data.suggestedUsers.length < limit) {
        setHasMoreSuggestions(false);
      } else {
        setHasMoreSuggestions(true);
      }
      setSuggestions(data.suggestedUsers);
      const sentInterests = data.suggestedUsers
        .filter(user => user.hasSentInterest)
        .map(user => user._id);
      setInterestsSent(sentInterests);

      if (data.success === false) {
        dispatch(loginFailure(data.message));
        dispatch(logout());
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  
  useEffect(() => {
    if (currentUser?._id) {
      fetchSuggestions(page);
    }
  }, [currentUser, page]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`/api/user/getSuggestions/${currentUser?._id}`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       if (!response.ok) { 
  //         console.log('Network response was not ok');
  //       }
        
  //       const data = await response.json();
  //       setSuggestions(data);
        
  //       if (data.success === false) {
  //         dispatch(loginFailure(data.message));
  //         dispatch(logout());
  //         navigate('/login');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching suggestions:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const currentDate = new Date();
    const birthDate = new Date(dob);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const handleInterest = async (id) => {
    try {
      const res = await fetch(`/api/user/sendInterest/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestedTo: id }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      } else {
        toast.success("Interest Sent");
        setInterestsSent(prev => [...prev, id]);
        setSuggestions(prev => 
          prev.map(user => 
            user._id === id ? { ...user, hasSentInterest: true } : user
          )
        );
      }
      console.log(await res.json());
    } catch (error) {
      console.error('Error handling interest:', error);
    }
  };
  const handleShowContact = async(id) => {
    try {
      if(user.isSubscribed){
        dispatch(setUserIdForContact(id))
        navigate('/showContact')
      }
      else{
        toast.error("You are not subscribed to show contact details")
        navigate('/plans')
      }
      
    } catch (error) {
     console.log(error) 
    }
  }

  
  // const handleMessage =(async (id) => {
  //   try {
  //     console.log(user.isSubscribed)
  //     if(user.isSubscribed){
  //       dispatch(setUserIdForContact(id))
  //       navigate('/messenger', { state: { selectedUserId: id } });
  //     }
  //     else{
  //       toast.error("Please subscribe to any plan to send message")
  //       navigate('/plans')
  //     }
      
  //   } catch (error) {
  //    console.log(error) 
  //   }
  // })
  const handleMessage = async (id) => { 
    try {
      // if (currentUser.isSubscribed) {
        const res = await axios.post('api/conversations/', {
          senderId: currentUser._id,
          receiverId: id,
        });
      
        // if (!res.ok) {
        //   throw new Error('Network response was not ok');
        // }
        if (res.status === 200) {
          const conversation = res.data;
          navigate('/messenger', { state: { selectedUserId: id, conversation } });
        } else {
          handleErrorResponse(res.status);
        }
       
      // } else {
        // toast.error('Please subscribe to any plan to send a message');
        // navigate('/plans');
      // }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };
  const handleVideoCall = async (id) => { 
    try {
       try {
        socket.on('your-id', id => {
          console.log('Your ID:', id);
          // alert(`Your ID is: ${id}`);
        });
        
        // alert('SOCKETID : '+socket.id)
        // socket.emit('incomingCall', { callerId: socket.id, receiverId: id });
        // navigate('/videoCall', { state: { id } });
        if (socket.connected) {
          socket.emit('incomingCall', { callerId: socket.id, receiverId: id });
          navigate('/videoCall', { state: { id } });
      } else {
          toast.error('Unable to connect to the socket. Please try again.');
          console.error('Socket not connected'); 
      }
      } catch (error) {
        console.error('Error initiating video call:', error);
        toast.error('An error occurred. Please try again.');
      }
      //  navigate('/videoCall')
      // const response = await axios.post(`/api/videoCall/initiate`, {
      //   callerId: currentUser._id,
      //   receiverId: id,
      // });

      // if (response.status === 200) {
        // navigate('/videoCall', { state: { callData: response.data } });
      // } else {
      //   toast.error('Failed to initiate video call');
      // }
    } catch (error) {
      console.error('Error initiating video call:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleErrorResponse = (status) => {
    switch (status) {
      case 403:
        toast.error('No remaining messages in your plan or user is not subscribed.');
        navigate('/plans');
        break;
      case 404:
        toast.error('Subscription plan not found.');
        navigate('/plans');
        break;
      default:
        toast.error('Something went wrong. Please try again.');
        break;
    }
  };
  const handleAccept =(async (id) => {
    try {
  
      const res = await fetch(`/api/user/acceptInterest/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
  
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      else{
        toast.success('Interest Accepted')
        setAcceptedInterests(prev => [...prev, { interestId: id, acceptedBy: currentUser._id }]);
      }
  
      console.log(await res.json()); 
    } catch (error) {
      console.error('Error handling interest:', error);
    }
  });
  return (
    <>
      <Header />
      <div className="vh-100 content">
        <div className="container">
          {newInterestUser && (
            <div className="new-interest">
              {/* ... existing code ... */}
            </div>
          )}
          <div className="row justify-content-center mt-5">
            <h4>Suggestions</h4>
            {suggestions.length > 0 ? (
              suggestions.map(user => (
                <div className="col-md-6 col-lg-4 col-xl-3 mt-4" key={user._id}>
                  <Link to={`/memberProfile/${user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="card" style={{ borderRadius: '15px', height: '100%' }}>
                      <div className="card-body p-4 d-flex flex-column" style={{ height: '100%' }}>
                        <div className="d-flex text-black mb-3">
                          <div className="flex-shrink-0">
                            <img
                              style={{ width: '180px', height: '180px', borderRadius: '10px', objectFit: 'cover' }}
                              src={user.profilePhoto ? user.profilePhoto : 'https://static-00.iconduck.com/assets.00/avatar-default-light-icon-512x512-6c79fqub.png'}
                              alt='Profile Photo'
                              className="img-fluid"
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h5 className="card-title">{user.username}</h5>
                            <p className="card-text">{user.nativePlace || 'Unknown'}</p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-start rounded-3 p-2 mb-3 flex-grow-1"
                          style={{ backgroundColor: '#efefef' }}>
                          <div>
                            <p className="small text-muted mb-1">Age</p>
                            <p className="mb-0">{calculateAge(user.dob)}</p>
                          </div>
                          <div className="px-3">
                            <p className="small text-muted mb-1">Height</p>
                            <p className="mb-0">{user.height ? user.height + "cm" : 'N/A'}</p>
                          </div>
                          <div>
                            <p className="small text-muted mb-1">Qualification</p>
                            <p className="mb-0">{user.qualification || 'N/A'}</p>
                          </div>
                        </div>
                        <div className="d-flex pt-1">
                          {/* <button
                            className="btns me-2"
                            id={user._id}
                            onClick={(e) => {
                              e.preventDefault();
                              handleInterest(user._id);
                            }}
                            disabled={interestsSent.includes(user._id) || acceptedInterests.some(interest => interest.interestId === user._id)}
                          >
                            {acceptedInterests.some(interest => interest.interestId === user._id) ? 'Interest Accepted' : interestsSent.includes(user._id) ? 'Interest Sent' : 'Send Interest'}
                          </button> */}
                          {/* <button className="btns me-2" id={user._id} onClick={(e) => {
                            e.preventDefault();
                            handleShowContact(user._id);
                          }}>Show Contact</button> */}
                          {/* <button className="btns me-2" id={user._id} onClick={(e) => {
                            e.preventDefault();
                            handleMessage(user._id);
                          }}>Message</button> */}
                        </div>
                        
                        <div className="d-flex pt-1 button-container">
                            {/* <button
                              className="btns me-2 custom-button"
                              id={user._id}
                              onClick={(e) => {
                                e.preventDefault();
                                handleInterest(user._id);
                              }}
                              disabled={interestsSent.includes(user._id) || acceptedInterests.some(interest => interest.interestId === user._id)}
                              title={acceptedInterests.some(interest => interest.interestId === user._id) ? 'Interest Accepted' : interestsSent.includes(user._id) ? 'Interest Sent' : 'Send Interest'}
                            >
                              {acceptedInterests.some(interest => interest.interestId === user._id) ? (
                                <i className="fa fa-check-circle icon"></i>
                              ) : interestsSent.includes(user._id) ? (
                                <i className="fa fa-paper-plane icon"></i>
                              ) : (
                                <i className="fa fa-heart icon"></i>
                              )}
                              <span className="visually-hidden">{acceptedInterests.some(interest => interest.interestId === user._id) ? 'Interest Accepted' : interestsSent.includes(user._id) ? 'Interest Sent' : 'Send Interest'}</span>
                            </button> */}
                             <button
                                    className="btns me-2 custom-button"
                                    id={user._id}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleInterest(user._id);
                                    }}
                                    disabled={user.hasSentInterest}
                                    title={user.hasSentInterest ? 'Interest Sent' : 'Send Interest'}
                                  >
                                    {user.hasSentInterest ? (
                                      <i className="fa fa-paper-plane icon"></i>
                                    ) : (
                                      <i className="fa fa-heart icon"></i>
                                    )}
                                    <span className="visually-hidden">{user.hasSentInterest ? 'Interest Sent' : 'Send Interest'}</span>
                          </button>
                            <button
                              className="btns me-2 custom-button"
                              id={user._id}
                              onClick={(e) => {
                                e.preventDefault();
                                handleMessage(user._id);
                              }}
                              title="Message"
                            >
                              <i className="fa fa-comment icon"></i>
                              <span className="visually-hidden">Message</span>
                            </button>
                             
                            <button
                              className="btns me-2 custom-button"
                              id={user._id}
                              onClick={(e) => {
                                e.preventDefault();
                                 handleVideoCall(user._id);
                              }}
                              title="Message"
                            >
                              <i className="fa fa-video-camera"></i>
                              <span className="visually-hidden">Video Call</span>
                            </button>

                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            // ) : page === 1 ? (
            //   <p>No suggestions available.</p>
            ) : null}
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btns"
              onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
                className="btns"
                onClick={() => setPage(prevPage => prevPage + 1)}
                disabled={!hasMoreSuggestions}
              >
                Next
              </button>
          </div>
        </div>
      </div>
    </>
  );
  
  // return (
  //   <>
  //   <Header />
  //   <div className="vh-100 content">
  //     <div className="container">
  //       {newInterestUser && (
  //         <div className="new-interest">
  //           <h2>New Interest Received</h2>
  //           <h4>Newly Received Interest</h4>
  //           <div className="card" style={{ borderRadius: '15px' }}>
  //             <div className="card-body p-4">
  //               <div className="d-flex text-black mb-3">
  //                 <div className="flex-shrink-0">
  //                   <img
  //                     style={{ width: '180px', height: '180px', borderRadius: '10px', objectFit: 'cover' }}
  //                     src={newInterestUser.profilePhoto ? newInterestUser.profilePhoto : 'https://res.cloudinary.com/dcsdqiiwr/image/upload/v1717406174/ava_xlfouh.png'}
  //                     alt='Profile Photo'
  //                     className="img-fluid"
  //                   />
  //                 </div>
  //                 <div className="flex-grow-1 ms-3">
  //                   <h5 className="card-title">{newInterestUser.username}</h5>
  //                   <p className="card-text">{newInterestUser.nativePlace || 'Unknown'}</p>
  //                 </div>
  //               </div>
  //               <div className="d-flex justify-content-start rounded-3 p-2 mb-3"
  //                 style={{ backgroundColor: '#efefef' }}>
  //                 <div>
  //                   <p className="small text-muted mb-1">Age</p>
  //                   <p className="mb-0">{calculateAge(newInterestUser.dob)}</p>
  //                 </div>
  //                 <div className="px-3">
  //                   <p className="small text-muted mb-1">Height</p>
  //                   <p className="mb-0">{newInterestUser.height || 'N/A'}</p>
  //                 </div>
  //                 <div>
  //                   <p className="small text-muted mb-1">Qualification</p>
  //                   <p className="mb-0">{newInterestUser.qualification || 'N/A'}</p>
  //                 </div>
  //               </div>
  //               <div className="d-flex pt-1">
  //                 <button className="btns" id={newInterestUser._id} onClick={() => handleAccept(newInterestUser._id)}>Accept</button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       )}

  //       <div className="row justify-content-center mt-5">
  //         <h4>Suggestions</h4>
  //         {Object.keys(suggestions).map(key => (
  //           suggestions[key].map(user => (
  //             <div className="col-md-6 col-lg-4 col-xl-3 mt-4" key={user._id}>
  //               <Link to={`/memberProfile/${user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
  //                 <div className="card" style={{ borderRadius: '15px' }}>
  //                   <div className="card-body p-4 d-flex flex-column" style={{ height: '100%' }}>
  //                     <div className="d-flex text-black mb-3">
  //                       <div className="flex-shrink-0">
  //                         <img
  //                           style={{ width: '180px', height: '180px', borderRadius: '10px', objectFit: 'cover' }}
  //                           src={user.profilePhoto ? user.profilePhoto : 'https://static-00.iconduck.com/assets.00/avatar-default-light-icon-512x512-6c79fqub.png'}
  //                           alt='Profile Photo'
  //                           className="img-fluid"
  //                         />
  //                       </div>
  //                       <div className="flex-grow-1 ms-3">
  //                         <h5 className="card-title">{user.username}</h5>
  //                         <p className="card-text">{user.nativePlace || 'Unknown'}</p>
  //                       </div>
  //                     </div>
  //                     <div className="d-flex justify-content-start rounded-3 p-2 mb-3 flex-grow-1"
  //                       style={{ backgroundColor: '#efefef' }}>
  //                       <div>
  //                         <p className="small text-muted mb-1">Age</p>
  //                         <p className="mb-0">{calculateAge(user.dob)}</p>
  //                       </div>
  //                       <div className="px-3">
  //                         <p className="small text-muted mb-1">Height</p>
  //                         <p className="mb-0">{user.height ? user.height + "cm" : 'N/A'}</p>
  //                       </div>
  //                       <div>
  //                         <p className="small text-muted mb-1">Qualification</p>
  //                         <p className="mb-0">{user.qualification || 'N/A'}</p>
  //                       </div>
  //                     </div>
  //                     <div className="d-flex pt-1">
  //                       <button
  //                         className="btns me-2"
  //                         id={user._id}
  //                         onClick={(e) => {
  //                           e.preventDefault();
  //                           handleInterest(user._id);
  //                         }}
  //                         disabled={interestsSent.includes(user._id) || acceptedInterests.some(interest => interest.interestId === user._id)}
  //                       >
  //                         {acceptedInterests.some(interest => interest.interestId === user._id) ? 'Interest Accepted' : interestsSent.includes(user._id) ? 'Interest Sent' : 'Send Interest'}
  //                       </button>
  //                     </div>
  //                     <div className="d-flex pt-1">
  //                       <button className="btns me-2" id={user._id} onClick={(e) => {
  //                         e.preventDefault();
  //                         handleShowContact(user._id);
  //                       }}>Show Contact</button>
  //                     </div>
  //                     <div className="d-flex pt-1">
  //                       <button className="btns me-2" id={user._id} onClick={(e) => {
  //                         e.preventDefault();
  //                         handleMessage(user._id);
  //                       }}>Message</button>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </Link>
  //             </div>
  //           ))
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // </>
  //   // <>
  //   //   <Header />
  //   //   <div className="vh-100 content">
  //   //     <div className="container">    
  //   //     {newInterestUser && (
  //   //       <div className="new-interest">
  //   //         <h2>New Interest Received</h2>
  //   //         <h4>Newly Received Interest</h4>
  //   //         <div className="card" style={{ borderRadius: '15px' }}>
  //   //           <div className="card-body p-4">
  //   //             <div className="d-flex text-black mb-3">
  //   //               <div className="flex-shrink-0">
  //   //                 <img
  //   //                   style={{ width: '180px', height: '180px', borderRadius: '10px', objectFit: 'cover' }}
  //   //                   src={newInterestUser.profilePhoto ? newInterestUser.profilePhoto : 'https://res.cloudinary.com/dcsdqiiwr/image/upload/v1717406174/ava_xlfouh.png'}
  //   //                   alt='Profile Photo'
  //   //                   className="img-fluid"
  //   //                 />
  //   //               </div>
  //   //               <div className="flex-grow-1 ms-3">
  //   //                 <h5 className="card-title">{newInterestUser.username}</h5>
  //   //                 <p className="card-text">{newInterestUser.nativePlace || 'Unknown'}</p>
  //   //               </div>
  //   //             </div>
  //   //             <div className="d-flex justify-content-start rounded-3 p-2 mb-3"
  //   //               style={{ backgroundColor: '#efefef' }}>
  //   //               <div>
  //   //                 <p className="small text-muted mb-1">Age</p>
  //   //                 <p className="mb-0">{calculateAge(newInterestUser.dob)}</p>
  //   //               </div>
  //   //               <div className="px-3">
  //   //                 <p className="small text-muted mb-1">Height</p>
  //   //                 <p className="mb-0">{newInterestUser.height || 'N/A'}</p>
  //   //               </div>
  //   //               <div>
  //   //                 <p className="small text-muted mb-1">Qualification</p>
  //   //                 <p className="mb-0">{newInterestUser.qualification || 'N/A'}</p>
  //   //               </div>
  //   //             </div>
  //   //              <div className="d-flex pt-1">
  //   //             <button className="btns" id={newInterestUser._id}  onClick={() => handleAccept(newInterestUser._id)}>Accept</button>
  //   //           </div>
  //   //           </div>
  //   //         </div>
  //   //       </div>
  //   //     )}
         
  //   //       <div className="row justify-content-center mt-5">
  //   //       <h4>Suggestions</h4>
  //   //         {Object.keys(suggestions).map(key => (
  //   //           suggestions[key].map(user => (
  //   //             <div className="col-md-6 col-lg-4 col-xl-3 mt-4" key={user._id}>
  //   //              <Link to={`/memberProfile/${user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
  //   //               <div className="card" style={{ borderRadius: '15px', height: '100%' }}>
  //   //                 <div className="card-body p-4 d-flex flex-column" style={{ height: '100%' }}>
  //   //                   <div className="d-flex text-black mb-3">
  //   //                     <div className="flex-shrink-0">
  //   //                       <img
  //   //                         style={{ width: '180px', height: '180px', borderRadius: '10px', objectFit: 'cover' }}
  //   //                         src={user.profilePhoto ? user.profilePhoto : 'https://static-00.iconduck.com/assets.00/avatar-default-light-icon-512x512-6c79fqub.png'}
  //   //                         alt='Profile Photo'
  //   //                         className="img-fluid"
  //   //                       />
  //   //                     </div>
  //   //                     <div className="flex-grow-1 ms-3">
  //   //                       <h5 className="card-title">{user.username}</h5>
  //   //                       <p className="card-text">{user.nativePlace || 'Unknown'}</p>
  //   //                     </div>
  //   //                   </div>
  //   //                   <div className="d-flex justify-content-start rounded-3 p-2 mb-3 flex-grow-1"
  //   //                     style={{ backgroundColor: '#efefef' }}>
  //   //                     <div>
  //   //                       <p className="small text-muted mb-1">Age</p>
  //   //                       <p className="mb-0">{calculateAge(user.dob)}</p>
  //   //                     </div>
  //   //                     <div className="px-3">
  //   //                       <p className="small text-muted mb-1">Height</p>
  //   //                       <p className="mb-0">{user.height? user.height+"cm" : 'N/A'}</p>
  //   //                     </div>
  //   //                     <div>
  //   //                       <p className="small text-muted mb-1">Qualification</p>
  //   //                       <p className="mb-0">{user.qualification || 'N/A'}</p>
  //   //                     </div>
  //   //                   </div>
  //   //                   <div className="d-flex pt-1">
  //   //                     <button
  //   //                       className="btns me-2"
  //   //                       id={user._id}
  //   //                       onClick={(e) => {
  //   //                         e.preventDefault();
  //   //                         handleInterest(user._id);
  //   //                       }}
  //   //                       disabled={interestsSent.includes(user._id) || acceptedInterests.some(interest => interest.interestId === user._id)}
  //   //                     >
  //   //                       {acceptedInterests.some(interest => interest.interestId === user._id) ? 'Interest Accepted' : interestsSent.includes(user._id) ? 'Interest Sent' : 'Send Interest'}
  //   //                     </button>
  //   //                     {/* <button className="btns">Message</button> */}
  //   //                     {/* {acceptedInterests.some(interest => interest.interestId === user._id) && (
  //   //                     <div className="alert alert-success mt-2" role="alert">
  //   //                       Interest Accepted
  //   //                     </div>
  //   //                   )} */}
  //   //                   </div>
  //   //                   <div className="d-flex pt-1">
  //   //                     <button className="btns me-2" id={user._id}     onClick={(e) => {
  //   //                           e.preventDefault(); 
  //   //                           handleShowContact(user._id);
  //   //                         }}>Show Contact</button>
  //   //                   </div>
  //   //                   <div className="d-flex pt-1">
  //   //                     <button className="btns me-2" id={user._id}     onClick={(e) => {
  //   //                           e.preventDefault(); 
  //   //                           handleMessage(user._id);
  //   //                         }}>Message</button>
  //   //                   </div>
  //   //                 </div>
  //   //               </div>
  //   //               </Link>
  //   //             </div>
  //   //           ))
  //   //         ))}
  //   //       </div>
  //   //     </div>
  //   //     {selectedUser && (
  //   //       <>
  //   //         <Messenger selectedUser={selectedUser} />
  //   //       </>
  //   //     )}
  //   //   </div>
  //   // </>
  // );
}
