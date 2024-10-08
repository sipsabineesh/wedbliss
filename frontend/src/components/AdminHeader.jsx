import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { logout } from '../redux/admin/adminSlice';
import axios from 'axios';
import { toast } from "react-toastify";
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000'); 

export default function AdminHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {adminUser} = useSelector(state => state.admin)
    const toggleMenu = () => {
      setIsOpen(!isOpen);
  };

    const toggleDropdown = () => {
      setIsDropdownVisible(!isDropdownVisible);
    };
    useEffect(() => {
      fetchNotifications();

      socket.on('planRenewal', (notification) => {
          setNotifications(prevNotifications => [...prevNotifications, notification]);
      });

    //   socket.on('abuseReported', (report) => {
    //     console.log('Abuse report  received:', report);
    //     toast.info('An abuse report has been submitted.');
    // });
    socket.on('abuseReported', (report) => {
      console.log('Abuse report received:', report);
      setNotifications(prevNotifications => [...prevNotifications, report]);
      toast.info('An abuse report has been submitted.');
      console.log("report after toast------------")
      console.log(report)

  });
    return () => {
        socket.off('planRenewal');
        socket.off('abuseReported');
        socket.disconnect();
    };
  }, []);

  
// useEffect(() => {
//   socket.on('abuseReported', (report) => {
//     console.log('Abuse report received:', report);
//     toast.info('An abuse report has been submitted.');
// });

// return () => {
//     socket.off('abuseReported');
// };
// }, []);
  const fetchNotifications = async () => {
      try {
          const res = await axios.get('/api/admin/getRenewalNotifications');
          setNotifications(res.data.notifications);
          console.log("FETCHED NOTIFICATIONNNSS")

          console.log(res)
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
                navigate(`/adminNotifications/${notificationId}`)
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
   
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top nav-scroll">
      <div className="container">
      <div className="logo">
      <Link className='nav-link' to={'/'}><a className="navbar-brand custom_logo"><span>WedBliss</span></a></Link>
      </div>
     
     <button className="navbar-toggler" type="button" onClick={toggleMenu}>
        <span className="fa fa-bars"></span>
      </button>
      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item ml-2"><Link className='nav-link' to={'/dashboard'}>Dashboard</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/userList'}>Users</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/planList'}>Packages</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/subscriptionlist'}>Subscriptions</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/abuseReportList'}>Reported Abuses</Link></li>

          {/* <li className="nav-item ml-2"><Link className='nav-link' to={'/dashboard'}>Search</Link></li> */}
          {/* <li className="nav-item ml-2">{currentUser ?<div className="nav-item ml-2"> <Link className="nav-link" to={'/profile'}><i className="fa fa-user" aria-hidden="true"></i></Link> <Link className="nav-link" to={'/profile'}><i className="fa fa-sign-out" aria-hidden="true"></i></Link></div> : <Link className="nav-link" to={'/login'}><i className="fa fa-sign-in" aria-hidden="true"></i></Link> }</li>  */}
          <li className="nav-item ml-2">
          {/* <div className="notification-wrapper"> */}
                                {/* <Link className="nav-link"   */}
                               {/* onClick={toggleDropdow } >  */} 
                                    {/* <i className="fa fa-solid fa-bell"></i> */}
                                     {/* {notifications.length > 0 && ( */}
                                        {/* <span className="notification-badge">{notifications.length}</span> */}
                                     {/* )} */}
                                {/* </Link> */}
                              
                                   {/* {isDropdownVisible && (
                                    <div className="notification-dropdown">
                                        <ul>
                                            {notifications.map((notification, index) => (
                                                <li className="text-black" key={index}>
                                                 <Link to={`/notifications/${notification._id}`}  className="remove-link">{notification.title}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )} */}
                            {/* </div> */}
          {adminUser ? (
                                <div className="nav-item ml-2 d-flex align-items-center">
                                     <div className="d-flex align-items-center">
                                     <div className="notification-wrapper">
                                <Link className="nav-link" onClick={toggleDropdown}>
                                    <i className="fa fa-solid fa-bell"></i>
                                    {notifications.length > 0 && (
                                        <span className="notification-badge">{notifications.length}</span>
                                    )}
                                </Link>
                                {isDropdownVisible && (
                                <div className="notification-dropdown">
                                    <ul>
                                        {notifications.map((notification, index) => (
                                            <li className="text-black" key={index}>
                                                <Link to={`/adminNotifications/${notification._id}`}
                                                   className="remove-link"
                                                   onClick={() => handleNotificationClick(notification._id)}>
                                                  {notification.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                  )}
                            </div>
                                    <Link className="nav-link" onClick={handleLogout}>
                                        <i  className="fa fa-sign-out" aria-hidden="true"></i>Logout
                                    </Link>
                                    </div>
                                </div>
                             ) : ( 
                                 <Link className="nav-link" to={'/adminLogin'}>
                                    <i className="fa fa-sign-in" aria-hidden="true"></i>Login
                                </Link> 
                            )}
                         
              </li>

        </ul>
      </div>
    </div>
  </nav>
  )
}
 