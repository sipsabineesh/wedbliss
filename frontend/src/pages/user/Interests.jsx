import {useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { loginFailure,logout} from '../../redux/user/userSlice';
import Header from '../../components/Header';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const socket = io('http://localhost:3000');

export default function Interests() {
  const [newInterestUser, setNewInterestUser] = useState(null);
  const [interests,setInterests] = useState({})
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => { 
    socket.on('newInterest', (userData) => {
      console.log('New interest received from:', userData);
      setNewInterestUser(userData);
      toast.success(`You have received a new interest from ${userData.username}`);
    });

    return () => {
      socket.off('newInterest');
    };
  },newInterestUser);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(currentUser);
        const response = await fetch(`/api/user/getInterests/${currentUser._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
       
        const data = await response.json();
          
        if(data.success === false){ 
          dispatch(loginFailure(data.message))
          dispatch(logout())
          navigate('/login')
        }
        setInterests(data);
        console.log("LIST:")
        console.log(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };
  
    fetchData();
  
  },[]);

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
      }
  
      console.log(await res.json()); // if you want to log the response data
    } catch (error) {
      console.error('Error handling interest:', error);
    }
  });
  return (
    <>
    <Header/>

      <div className="package vh-100 content">
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
                      src={newInterestUser.profilePhoto ? newInterestUser.profilePhoto : 'https://static-00.iconduck.com/assets.00/avatar-default-light-icon-512x512-6c79fqub.png'}
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
              </div>
            </div>
          </div>
        )}
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-7 col-xl-5 mt-5 w-100">

            {/* {Object.keys(interests).map(key => (
            interests[key].map(user => ( 

              <div className="card mt-2" style={{ borderRadius: '15px' }}>
                <div className="card-body p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      <img
                        style={{ width: '180px', borderRadius: '10px' }}
                        src={user.interestedFrom.profilePhoto?user.interestedFrom.profilePhoto:'https://via.placeholder.com/225'}
                        alt='Profile Photo'
                        className="img-fluid"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="card-title">{user.interestedFrom.username}</h5>
                      <p className="card-text">{user.interestedFrom.nativePlace}</p>
  
                      <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                        style={{ backgroundColor: '#efefef' }}>
                        <div>
                          <p className="small text-muted mb-1">Age</p>
                          <p className="mb-0">{calculateAge(user.interestedFrom.dob)}</p>
                        </div>
                        <div className="px-3">
                          <p className="small text-muted mb-1">Height</p>
                          <p className="mb-0">{user.interestedFrom.height}</p>
                        </div>
                        <div>
                          <p className="small text-muted mb-1">Qualification</p>
                          <p className="mb-0">{user.interestedFrom.qualification}</p>
                        </div>
                      </div>
                      <div className="d-flex pt-1">
                        <button className="btns" id={user.interestedFrom._id}  onClick={() => handleAccept(user._id)}>Accept</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
               ))))} */}
               {Object.keys(interests).length > 0 ? (
  Object.keys(interests).map(key => (
    interests[key].map(user => ( 
      <div className="card mt-2" style={{ borderRadius: '15px' }}>
        <div className="card-body p-4">
          <div className="d-flex text-black">
            <div className="flex-shrink-0">
              <img
                style={{ width: '180px', borderRadius: '10px' }}
                src={user.interestedFrom.profilePhoto ? user.interestedFrom.profilePhoto : 'https://via.placeholder.com/225'}
                alt='Profile Photo'
                className="img-fluid"
              />
            </div>
            <div className="flex-grow-1 ms-3">
              <h5 className="card-title">{user.interestedFrom.username}</h5>
              <p className="card-text">{user.interestedFrom.nativePlace}</p>

              <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                style={{ backgroundColor: '#efefef' }}>
                <div>
                  <p className="small text-muted mb-1">Age</p>
                  <p className="mb-0">{calculateAge(user.interestedFrom.dob)}</p>
                </div>
                <div className="px-3">
                  <p className="small text-muted mb-1">Height</p>
                  <p className="mb-0">{user.interestedFrom.height}</p>
                </div>
                <div>
                  <p className="small text-muted mb-1">Qualification</p>
                  <p className="mb-0">{user.interestedFrom.qualification}</p>
                </div>
              </div>
              <div className="d-flex pt-1">
                <button className="btns" id={user.interestedFrom._id}  onClick={() => handleAccept(user._id)}>Accept</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  ))
) : (
 <>
  <div className="card mt-2" style={{ borderRadius: '15px' }}>
    <div className="card-body p-4">
      <p className="text-center">No accepted interests found.</p>
    </div>
  </div>
  </>
)}
 

            </div>
          </div>
        </div>
      </div>
      </>
  )
}
