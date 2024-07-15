import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { logout } from '../redux/user/userSlice';
import io from 'socket.io-client';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {currentUser} = useSelector(state => state.user)

    useEffect(() => {
        if (currentUser) {
            fetchNotifications();
        }
    }, [currentUser]);

    // useEffect(() => {
    //     const socket = io.connect('http://localhost:3000');
    // console.log(socket)
    //     socket.on('subscriptionRenewal', (notification) => {
    //         console.log("NEW NOTFY : ",notification)
    //         if (notification.userId === currentUser.id) {
    //             setNotifications(prevNotifications => [...prevNotifications, notification]);
    //             console.log('New Notification: ',notifications)
    //         }
    //     });
    
    //     return () => {
    //         socket.disconnect();
    //     };
    // }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
      setIsDropdownVisible(!isDropdownVisible);
    };

  
    const fetchNotifications = async () => {
        try {
            const res = await fetch(`/api/user/getRenewalNotification/${currentUser._id}`);
            const data = await res.json();
            if (res.ok) {
                setNotifications(data.notifications); 
                console.log("Fetched notifications:", notifications);
            } else {
                console.error("Error fetching notifications:", data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleNotificationClick = async (notificationId) => {
           try {
            const res = await axios.put(`/api/user/updateViewed/${notificationId}`, {
                isViewed: true
            })
            if (res.status === 200) {
                navigate(`/notifications/${notificationId}`)
            } else {
                console.error("Error updating notification:", res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout = async() => {
      try {
        const res = await fetch ('/api/auth/logout',{  
          method:'GET',
          headers:{
              'Content-Type':'application/json',
          }, 
      })
      dispatch(logout())
      } catch (error) {
        console.log(error)
      }
    }
   
  return  (
    <nav className="header navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
      <div className="logo">
      <Link className='nav-link' to={'/'}><a className="navbar-brand custom_logo"><span>WedBliss</span></a></Link>
      </div>
     
     <button className="navbar-toggler" type="button" onClick={toggleMenu}>
        <span className="fa fa-bars"></span>
      </button>
      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item ml-2"><Link className='nav-link' to={'/'}>Home</Link></li>
          {currentUser ? (
    <>
        <li className="nav-item ml-2">
            <Link className="nav-link" to={'/suggestions'}>Suggestions</Link>
        </li>
        <li className="nav-item ml-2">
            <Link className="nav-link" to={'/acceptedList'}>Accepted Interests</Link>
        </li>
        {/* {currentUser.isSubscribed && (
            <li className="nav-item ml-2">
                <Link className="nav-link" to={'/plans'}>My Package</Link>
            </li>
        )} */}
         {currentUser.isSubscribed && (
            <>
             <li className="nav-item ml-2">
                <Link className="nav-link" to={'/myPlan'}>My Plan</Link>
            </li>
            <li className="nav-item ml-2">
                <Link className="nav-link" to={'/messenger'}>Messenger</Link>
            </li>
            </>
        )}
    </>
) : (
    <li className="nav-item ml-2">
        <Link className='nav-link' to={'/'}>Search</Link>
    </li>
)}

          </ul>
          </div>
          {/* <li className="nav-item ml-2"><Link className='nav-link' to={'/'}>About Us</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/'}>Packages</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/'}>Contact Us</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/'}>Search</Link></li> */}
          {/* <li className="nav-item ml-2">{currentUser ?<div className="nav-item ml-2"> <Link className="nav-link" to={'/profile'}><i className="fa fa-user" aria-hidden="true"></i></Link> <Link className="nav-link" to={'/profile'}><i className="fa fa-sign-out" aria-hidden="true"></i></Link></div> : <Link className="nav-link" to={'/login'}><i className="fa fa-sign-in" aria-hidden="true"></i></Link> }</li>  */}
          <ul className="navbar-nav ml-auto">
                    {currentUser ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">
                                    <i className="C">{currentUser.username}</i>
                                </Link>
                            </li>
                            <div className="notification-wrapper">
                                <Link className="nav-link"  onClick={toggleDropdown}>
                                    <i className="fa fa-solid fa-bell"></i>
                                     {notifications.length > 0 && (
                                        <span className="notification-badge">{notifications.length}</span>
                                     )}
                                </Link>
                              
                                   {isDropdownVisible && (
                                    <div className="notification-dropdown">
                                        {/* <ul>
                                            {notifications.map((notification, index) => (
                                                <li className="text-black" key={index}>
                                                 <Link to={`/notifications/${notification._id}`}  className="remove-link">{notification.title}</Link>
                                                </li>
                                            ))}
                                        </ul> */}
                                         <ul>
                                            {notifications.map((notification, index) => (
                                                <li className="text-black" key={index}>
                                                    <span 
                                                        className="remove-link" 
                                                        onClick={() => handleNotificationClick(notification._id)}
                                                    >
                                                        {notification.title}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleLogout}>
                                    <i className="fa fa-sign-out mr-1"></i> 
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                <i className="fa fa-sign-in mr-1"></i> Login
                            </Link>
                        </li>
                    )}
                </ul>


       
      
    </div>
  </nav>
  )
}


 
// {currentUser ? (
  // <div className="nav-item ml-2 d-flex">
    

  //      <Link className="nav-link" to={'/profile'}>
  //         <i className="fa fa-user mr-2"></i>
  //     </Link>
  //     <Link className="nav-link" onClick={handleLogout}>
  //         <i  className="fa fa-sign-out"></i>Logout
  //     </Link>

  //     <div>
{/* <p className="mb-1 h5"><Link to='/suggestions'>{}</Link></p>
<p className="small text-muted mb-0"><Link className="text-black remove-link"></Link></p> */}
// </div>
//   </div>
// ) : (
  // <Link className="nav-link" to={'/login'}>
  //     <i className="fa fa-sign-in"></i>Login
  // </Link>
// )}



// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/user/userSlice';
// import io from 'socket.io-client';

// export default function Header() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [notifications, setNotifications] = useState([]);
//     const [isDropdownVisible, setIsDropdownVisible] = useState(false);

//     const dispatch = useDispatch();
//     const { currentUser } = useSelector(state => state.user);

//     useEffect(() => {
//         // Fetch notifications when the component mounts or when currentUser changes
//         if (currentUser) {
//             fetchNotifications();
//         }
//     }, [currentUser]);

//     useEffect(() => {
//         // Connect to Socket.IO server
//         const socket = io.connect('http://localhost:3000'); // Change URL to your server URL

//         // Listen for 'subscriptionRenewal' event
//         socket.on('subscriptionRenewal', (notification) => {
//             setNotifications(prevNotifications => [...prevNotifications, notification]);
//         });

//         return () => {
//             // Disconnect from Socket.IO server when component unmounts
//             socket.disconnect();
//         };
//     }, []);

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     const toggleDropdown = () => {
//         setIsDropdownVisible(!isDropdownVisible);
//     };

//     const handleLogout = async () => {
//         try {
//             const res = await fetch('/api/auth/logout', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             dispatch(logout());
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const fetchNotifications = async () => {
//         try {
//             // Fetch notifications for the current user
//             const res = await fetch(`/api/notifications/${currentUser.id}`);
//             const data = await res.json();
//             setNotifications(data.notifications);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <nav className="header navbar navbar-expand-lg navbar-dark fixed-top">
//             <div className="container">
//                 <div className="logo">
//                     <Link className='nav-link' to={'/'}>
//                         <a className="navbar-brand custom_logo"><span>WedBliss</span></a>
//                     </Link>
//                 </div>

//                 <button className="navbar-toggler" type="button" onClick={toggleMenu}>
//                     <span className="fa fa-bars"></span>
//                 </button>
//                 <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
//                     <ul className="navbar-nav ml-auto">
//                         {/* Navigation links */}
//                     </ul>
//                 </div>

//                 {/* Notification icon and dropdown */}
//                 <ul className="navbar-nav ml-auto">
//                     {currentUser && (
//                         <>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/profile">
//                                     <i className="fa fa-user mr-1">{currentUser.username}</i>
//                                 </Link>
//                             </li>
//                             <div className="notification-wrapper">
//                                 <Link className="nav-link" onClick={toggleDropdown}>
//                                     <i className="fa fa-solid fa-bell"></i>
//                                     <span className="notification-badge">{notifications.length}</span>
//                                 </Link>
//                                 {isDropdownVisible && (
//                                     <div className="notification-dropdown">
//                                         <ul>
//                                             {notifications.map((notification, index) => (
//                                                 <li className="text-black" key={index}>
//                                                     {notification.message}
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )}
//                             </div>
//                             <li className="nav-item">
//                                 <Link className="nav-link" onClick={handleLogout}>
//                                     <i className="fa fa-sign-out mr-1"></i>
//                                 </Link>
//                             </li>
//                         </>
//                     )}
//                 </ul>
//             </div>
//         </nav>
//     );
// }
