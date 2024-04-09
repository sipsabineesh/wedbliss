import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Suggestions() {
  const [suggestions,setSuggestions] = useState({})
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(currentUser);
        const response = await fetch(`/api/user/getSuggestions/${currentUser._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSuggestions(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };
  
    fetchData();
  
  }, [currentUser]);

  
  const calculateAge = (dob) => {
    const currentDate = new Date();
    const birthDate = new Date(dob);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const handleInterest =(async (id) => {
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
      }
  
      console.log(await res.json()); // if you want to log the response data
    } catch (error) {
      console.error('Error handling interest:', error);
    }
  });
 
  return (
    <>
      <div className="vh-100 content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-7 col-xl-5 mt-5 w-100">

            {Object.keys(suggestions).map(key => (
            suggestions[key].map(user => ( 

              <div className="card mt-2" style={{ borderRadius: '15px' }}>
                <div className="card-body p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      <img
                        style={{ width: '180px', borderRadius: '10px' }}
                        src={user.profilePhoto?user.profilePhoto:'https://via.placeholder.com/225'}
                        alt='Profile Photo'
                        className="img-fluid"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="card-title">{user.username}</h5>
                      <p className="card-text">{user.nativePlace}</p>
  
                      <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                        style={{ backgroundColor: '#efefef' }}>
                        <div>
                          <p className="small text-muted mb-1">Age</p>
                          <p className="mb-0">{calculateAge(user.dob)}</p>
                        </div>
                        <div className="px-3">
                          <p className="small text-muted mb-1">Height</p>
                          <p className="mb-0">{user.height}</p>
                        </div>
                        <div>
                          <p className="small text-muted mb-1">Qualification</p>
                          <p className="mb-0">{user.qualification}</p>
                        </div>
                      </div>
                      <div className="d-flex pt-1">
                        <button className="btns me-2" id={user._id}  onClick={() => handleInterest(user._id)}>Send Interest</button>
                        <button className="btns">Message</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
               ))))}
            </div>
          </div>
        </div>
      </div>
      </>
  )
}
