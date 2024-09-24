
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../redux/user/userSlice';
import { toast } from 'react-toastify';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

export default function Header() {
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [newInterestUser, setNewInterestUser] = useState(null);
  const [acceptedInterests, setAcceptedInterests] = useState([]);
//   const [incomingCall, setIncomingCall] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    async function fetchSubscriptionStatus() {
        try {
            const response = await fetch(`/api/user/getUser/${currentUser._id}`);
            const data = await response.json();
            setUser(data.user);
        } catch (error) {
            console.error('Error fetching subscription status:', error);
        }
    }

    if (currentUser) {
        fetchSubscriptionStatus();
    }
  
}, []);

  const fetchNotifications = useCallback(async () => {
    if (currentUser?._id) {
      try {
        const res = await fetch(`/api/user/getRenewalNotification/${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setNotifications(data.notifications);
        } else {
          console.error('Error fetching notifications:', data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchNotifications();
      socket.emit('joinRoom', currentUser._id);
    }

    return () => {
      socket.disconnect();
    };
  }, [currentUser, fetchNotifications]);

  useEffect(() => {
    const handleNewInterest = (userData) => {
      setNewInterestUser(userData);
      toast.success(`You have received a new interest from ${userData.username}`);
      setNotifications(prev => [...prev, { title: `New interest from ${userData.username}`, _id: userData._id }]);
    };

    const handleInterestAccepted = ({ interestId, acceptedBy }) => {
      setAcceptedInterests(prev => [...prev, { interestId, acceptedBy }]);
      toast.success(`Your interest has been accepted by user ${acceptedBy}`);
      setNotifications(prev => [...prev, { title: `Interest accepted by ${acceptedBy}`, _id: interestId }]);
    }; 

    const handleCallNotification = ({ receiverId,callerId, message }) => {
    //   alert(`${message} from ${callerId}`);
    //   setIncomingCall({ callerId, message });
      setNotifications(prev => [...prev, { title: `Call from ${receiverId}`, _id: callerId }]);
      navigate('/videoCall', { state: { callerId } });

    };

    socket.on('newInterest', handleNewInterest);
    socket.on('interestAccepted', handleInterestAccepted);
    socket.on('callNotification', handleCallNotification);

    return () => {
      socket.off('newInterest', handleNewInterest);
      socket.off('interestAccepted', handleInterestAccepted);
      socket.off('callNotification', handleCallNotification);
    };
  }, []);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleNotificationClick = async (notificationId) => { 
    try {
      const res = await axios.put(`/api/user/updateViewed/${notificationId}`, {
        isViewed: true,
      });
    
      if (res.status === 200) {
        navigate(`/notifications/${notificationId}`);
      } else {
        console.error('Error updating notification:', res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
<>
<nav className="header navbar navbar-expand-lg navbar-dark fixed-top">
  <div className="container">
    <div className="logo">
      <Link className="nav-link" to="/">
        <a className="navbar-brand custom_logo"><span>WedBliss</span></a>
      </Link>
    </div>

    <button className="navbar-toggler" type="button" onClick={toggleMenu}>
      <span className="fa fa-bars"></span>
    </button>
    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item ml-2"><Link className="nav-link" to="/">Home</Link></li>
        {currentUser ? (
          <>
            {user.isSubscribed && (
              <>
                <li className="nav-item ml-2">
                  <Link className="nav-link" to="/myPlan">My Plan</Link>
                </li>
                <li className="nav-item ml-2">
                  <Link className="nav-link" to="/interests">Interest</Link>
                </li>
                <li className="nav-item ml-2">
                  <Link className="nav-link" to="/acceptedList">Accepted Interests</Link>
                </li>
                <li className="nav-item ml-2">
                  <Link className="nav-link" to="/messenger">Messenger</Link>
                </li>
              </>
            )}
          </>
        ) : (
          <li className="nav-item ml-2">
            <Link className="nav-link" to="/">Search</Link>
          </li>
        )}
      </ul>
    
    <ul className="navbar-nav ml-auto align-items-center" style={{ marginLeft: 'auto' }}>
      {currentUser ? (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              <i className="C">{currentUser.username}</i>
            </Link>
          </li>
          <div className="notification-wrapper">
            <Link className="nav-link" onClick={toggleDropdown}>
              <i className="fa fa-solid fa-bell"></i>
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </Link>
            {isDropdownVisible && notifications.length > 0 &&(
              <div className="notification-dropdown">
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
  </div>
</nav>   
</>
  );
}
