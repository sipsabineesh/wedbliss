import {useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { loginFailure,logout} from '../../redux/user/userSlice';
import Header from '../../components/Header';
import { toast } from 'react-toastify';

export default function Interests() {
  const [interests,setInterests] = useState({})
  const [acceptedInterests, setAcceptedInterests] = useState({});
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
        const initialAcceptedInterests = {};
        Object.keys(data).forEach(key => {
          data[key].forEach(user => {
            if (user.isAccepted) {
              initialAcceptedInterests[user._id] = true;
            }
          });
        });
        setAcceptedInterests(initialAcceptedInterests);
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
  console.log(res)
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      else{
        toast.success('Interest Accepted')
        setAcceptedInterests((prev) => ({ ...prev, [id]: true }));
        console.log("acceptedInterests")
        console.log(acceptedInterests)
      }
  
      console.log(await res.json()); 
    } catch (error) {
      console.error('Error handling interest:', error);
    }
  });
  return (
    <>
    <Header/>

      <div className="package vh-100 content">
        <div className="container">
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
                <button className="btns" id={user.interestedFrom._id}  onClick={() => handleAccept(user._id)}
                                 disabled={acceptedInterests[user._id]}>{acceptedInterests[user._id] ? 'Accepted' : 'Accept'}</button>
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
      <p className="text-center">No interests found.</p>
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
