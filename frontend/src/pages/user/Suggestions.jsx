
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, logout } from '../../redux/user/userSlice';
import { io } from 'socket.io-client';
import Header from '../../components/Header';
import { toast } from 'react-toastify';

const socket = io('http://localhost:3000');

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState({});
  const [interestsSent, setInterestsSent] = useState([]);
  const [acceptedInterests, setAcceptedInterests] = useState([]);
  const [newInterestUser, setNewInterestUser] = useState(null);
  const { currentUser, sentInterests } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser?._id) {
      socket.emit('joinRoom', currentUser._id);
    }

    return () => {
      socket.disconnect(); 
    };
  }, [currentUser]);

  useEffect(() => { 
    socket.on('newInterest', (userData) => {
      console.log('New interest received from:', userData);
      setNewInterestUser(userData);
      toast.success(`You have received a new interest from ${userData.username}`);
    },newInterestUser);

    return () => {
      socket.off('newInterest');
    };
  }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/getSuggestions/${currentUser?._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) { 
          console.log('Network response was not ok');
        }
        
        const data = await response.json();
        setSuggestions(data);
        
        if (data.success === false) {
          dispatch(loginFailure(data.message));
          dispatch(logout());
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchData();
  }, []);

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
      }
      console.log(await res.json());
    } catch (error) {
      console.error('Error handling interest:', error);
    }
  };

  const handleAccept =(async (id) => {
    try {
    alert(id)  
      const res = await fetch(`/api/user/acceptInterest/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
  console.log(res)
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
            <h2>New Interest Received</h2>
            <h4>Newly Received Interest</h4>
            <div className="card" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4">
                <div className="d-flex text-black mb-3">
                  <div className="flex-shrink-0">
                    <img
                      style={{ width: '180px', height: '180px', borderRadius: '10px', objectFit: 'cover' }}
                      src={newInterestUser.profilePhoto ? newInterestUser.profilePhoto : 'https://res.cloudinary.com/dcsdqiiwr/image/upload/v1717406174/ava_xlfouh.png'}
                      alt='Profile Photo'
                      className="img-fluid"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="card-title">{newInterestUser.username}</h5>
                    <p className="card-text">{newInterestUser.nativePlace || 'Unknown'}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-start rounded-3 p-2 mb-3"
                  style={{ backgroundColor: '#efefef' }}>
                  <div>
                    <p className="small text-muted mb-1">Age</p>
                    <p className="mb-0">{calculateAge(newInterestUser.dob)}</p>
                  </div>
                  <div className="px-3">
                    <p className="small text-muted mb-1">Height</p>
                    <p className="mb-0">{newInterestUser.height || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="small text-muted mb-1">Qualification</p>
                    <p className="mb-0">{newInterestUser.qualification || 'N/A'}</p>
                  </div>
                </div>
                 <div className="d-flex pt-1">
                <button className="btns" id={newInterestUser._id}  onClick={() => handleAccept(newInterestUser._id)}>Accept</button>
              </div>
              </div>
            </div>
          </div>
        )}
         
          <div className="row justify-content-center mt-5">
          <h4>Suggestions</h4>
            {Object.keys(suggestions).map(key => (
              suggestions[key].map(user => (
                <div className="col-md-6 col-lg-4 col-xl-3 mt-4" key={user._id}>
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
                          <p className="mb-0">{user.height? user.height+"cm" : 'N/A'}</p>
                        </div>
                        <div>
                          <p className="small text-muted mb-1">Qualification</p>
                          <p className="mb-0">{user.qualification || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="d-flex pt-1">
                        {/* <button className="btns me-2" id={user._id} onClick={() => handleInterest(user._id)}>Send Interest</button> */}
                        <button
                          className="btns me-2"
                          id={user._id}
                          onClick={() => handleInterest(user._id)}
                          disabled={interestsSent.includes(user._id) || acceptedInterests.some(interest => interest.interestId === user._id)}
                        >
                          {acceptedInterests.some(interest => interest.interestId === user._id) ? 'Interest Accepted' : interestsSent.includes(user._id) ? 'Interest Sent' : 'Send Interest'}
                        </button>
                        {/* <button className="btns">Message</button> */}
                        {/* {acceptedInterests.some(interest => interest.interestId === user._id) && (
                        <div className="alert alert-success mt-2" role="alert">
                          Interest Accepted
                        </div>
                      )} */}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ))}
          </div>
        </div>
    
      </div>
    </>
  );
}
