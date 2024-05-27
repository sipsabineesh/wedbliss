import React from 'react';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

export default function Profile() {
  const [dob, setDOB] = useState('');
  const [age, setAge] = useState('');
  
  const [suggestionCount,setSuggestionCount] = useState(null)
  const [interestCount,setInterestCount] = useState(null)
  const navigate = useNavigate()
  const { currentUser } = useSelector(state => state.user);
  useEffect(() => {
   
    setDOB(currentUser.dob)
    calculateAge()
    checkSuggestion()
    checkInterest()
console.log(currentUser)
  }, [currentUser,age,interestCount])

  const handleEditProfile = async() => {
    navigate(`/editProfile`)
  }
  const handleChangeEmail = async() => {
   
    // navigate(`/changeEmailAddress/${currentUser._id}`)
    navigate('/changeEmailAddress', { state: { id: currentUser._id } });
  }
  const handleChangePassword = async() => {
    navigate(`/changeProfilePassword`, { state: { email:currentUser.email }})
  }

  const calculateAge = () => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const ageDifference = currentDate.getFullYear() - birthDate.getFullYear();
    if (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
      setAge(ageDifference - 1);
    } else {
      setAge(ageDifference);
    }
  }


  const checkSuggestion = async() => { 
    try {
      const response = await fetch(`/api/user/getSuggestionsCount/${currentUser._id}`); 
      const data = await response.json();
      setSuggestionCount(data.numRequests); 
      console.log(suggestionCount)
  } catch (error) {
      console.error('Error fetching user data:', error);
  }
  }

  const checkInterest = async() => { 
    try {
      const response = await fetch(`/api/user/checkInterest/${currentUser._id}`); 
      const data = await response.json();
      setInterestCount(data.numRequests); 
      console.log(interestCount)
  } catch (error) {
      console.error('Error fetching user data:', error);
  }
  }

  return (
    <>
    <Header/> 
    <div className="gradient-custom-2 d-flex justify-content-center align-items-center min-vh-100">
      <div className="py-5 h-100 profile-width">
        <div className="justify-content-center align-items-center h-100">
          <div className="col-lg-9 col-xl-7 w-100">
            <div className="card">
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px'}}>
                  <img src={currentUser.profilePhoto !== null ? currentUser.profilePhoto : 'https://static-00.iconduck.com/assets.00/avatar-default-light-icon-512x512-6c79fqub.png'}
                     alt="Profile Picture" className="mt-4 mb-2 img-thumbnail" style={{ width: '150px', height: '150px', zIndex: '1' }} /> 
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <h5>{currentUser.username}</h5>
                  <p>Lives in {currentUser.countryLivingIn}</p>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
              {/* <div className="social_icon text-center">      */}


              <div className="row mb-5">
                   {/* <Link to="/editProfile" className="text-black"> <span><i className="fa fa-edit"></i></span></Link> */}
                   <div className="col-md-4 ml-5">
                      <div className="control">
                      <button type="submit" onClick={() => handleEditProfile()} className="btns profile-button">Edit Profile
                      {/* <Link to="/editProfile" className="remove-link "> </Link>*/}
                      </button> 
                      </div>
                  </div>
                  <div className="col-md-4">
                      <div className="control">
                      <button type="button" onClick={() => handleChangeEmail()} className="btns profile-button">Change Email Address</button>
                      </div>
                  </div>
                  <div className="col-md-4">
                      <div className="control">
                      <button type="button"  onClick={() => handleChangePassword()} className="btns profile-button">Change Password</button>
                      </div>
                  </div>
                  </div>
                  <div className="row mb-5">
                  {/* </div> */}
                <div className="d-flex justify-content-end text-center py-1">
                
                  {interestCount > 0 ? <div>
                    <p className="mb-1 h5"><Link to='/interests' className="text-black remove-link">{interestCount}</Link></p>
                    <p className="small text-muted mb-0">Interests</p>
                  </div>:""}
                  {/* <div className="px-3">
                    <p className="mb-1 h5">10</p>
                    <p className="small text-muted mb-0">Notification</p>
                  </div> */}
                 </div>
                 {/* <div>
                    <p className="mb-1 h5"><Link to='/suggestions'>{}</Link></p>
                    <p className="small text-muted mb-0"><Link to='/suggestions' className="text-black remove-link">Suggestions</Link></p>
                 </div> */}
              </div>
              </div>
              <div className="card-body text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1 text-black text-capitalize">About</p>
                  <div className="p-4 card-subbackground">
                    <p className="font-italic mb-1 text-black text-capitalize">{currentUser.about}</p>
                  </div>
                </div>
               

                <div className="row mb-5">
                    <p className="lead fw-normal mb-1 text-black text-capitalize">Personal Details</p>
                    <div className="col">
                    <div className="p-4 card-subbackground">
                      <p className="font-italic mb-1 text-black text-capitalize">Age : {age ? age : ''}</p>
                      <p className="font-italic mb-1 text-black text-capitalize">Weight : {currentUser.weight ? currentUser.weight : ''}Kg</p>
                      <p className="font-italic mb-0 text-black text-capitalize">Height : {currentUser.height ? currentUser.height: ''}cm</p>
                      <p className="font-italic mb-0 text-black text-capitalize">Marital Status : {currentUser.maritalStatus ? currentUser.maritalStatus : 'N/A'}</p>
                      <p className="font-italic mb-0 text-black text-capitalize">Diet : {currentUser.diet ? currentUser.diet : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="p-4 card-subbackground">
                      <p className="font-italic mb-1 text-black text-capitalize">Mother Tongue : {currentUser.motherTongue ? currentUser.motherTongue : ''}</p>
                      <p className="font-italic mb-1 text-black text-capitalize ">Religion : {currentUser.religion ? currentUser.religion : ''}</p>
                      <p className="font-italic mb-0 text-black text-capitalize">Caste : {currentUser.caste ? currentUser.caste: ''}</p>
                      <p className="font-italic mb-0 text-black text-capitalize">Native Place : {currentUser.nativePlace ? currentUser.nativePlace : 'N/A'}</p>
                      <p className="font-italic mb-0 text-black text-capitalize">Hobbies : {currentUser.hobbies ? currentUser.hobbies : 'N/A'}</p>
                    </div>
                  </div>
                </div>

                 <div className="mb-5">
                  <p className="lead fw-normal mb-1 text-black text-capitalize">Education & Profession</p>
                  <div className="p-4 card-subbackground">
                    <p className="font-italic mb-1 text-black text-capitalize">Qualification : {currentUser.qualification ? currentUser.qualification : 'N/A'}</p>
                    <p className="font-italic mb-1 text-black text-capitalize">Working Status : {currentUser.workingStatus ? currentUser.workingStatus : 'N/A'}</p>
                  </div>
                </div>
                {/* <div className="d-flex justify-content-between align-items-center mb-4"> */}
                  {/* <p className="lead fw-normal mb-0">Recent photos</p> */}
                  {/* <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p> */}
                {/* </div> */}
                {/* <div className="row">
                  <div className="col mb-2">
                    <img src=""
                      alt="image 1" className="w-100 rounded-3" />
                  </div>
                  <div className="col mb-2">
                    <img src=""
                      alt="image 1" className="w-100 rounded-3" />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
