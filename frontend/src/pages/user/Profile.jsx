import React from 'react';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function Profile() {
  const [dob, setDOB] = useState('');
  const [age, setAge] = useState('');
  
  const [suggestionCount,setSuggestionCount] = useState(null)
  const [interestCount,setInterestCount] = useState(null)
  const { currentUser } = useSelector(state => state.user);
  useEffect(() => {
   
    setDOB(currentUser.dob)
    calculateAge()
    checkSuggestion()
    checkInterest()
console.log(currentUser)
  }, [currentUser,age,interestCount])

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
    <div className="gradient-custom-2 d-flex justify-content-center align-items-center min-vh-100">
      <div className="py-5 h-100">
        <div className="justify-content-center align-items-center h-100">
          <div className="col-lg-9 col-xl-7 w-100">
            <div className="card">
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <img src={currentUser.profilePhoto !== null ? currentUser.profilePhoto : 'https://via.placeholder.com/225'}
                     alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" style={{ width: '150px', zIndex: '1' }} /> 
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <h5>{currentUser.username}</h5>
                  <p>Lives in {currentUser.countryLivingIn}</p>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
              {/* <div className="social_icon text-center">      */}
                   <Link to="/editProfile" className="text-black"> <span><i className="fa fa-edit"></i></span></Link>
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
              
              <div className="card-body text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4 card-subbackground">
                    <p className="font-italic mb-1">{currentUser.about}</p>
                  </div>
                </div>
               

                <div className="row mb-5">
                    <p className="lead fw-normal mb-1">Personal Details</p>
                    <div className="col">
                    <div className="p-4 card-subbackground">
                      <p className="font-italic mb-1">Age : {age ? age : ''}</p>
                      <p className="font-italic mb-1">Weight : {currentUser.weight ? currentUser.weight : ''}Kg</p>
                      <p className="font-italic mb-0">Height : {currentUser.height ? currentUser.height: ''}cm</p>
                      <p className="font-italic mb-0">Marital Status : {currentUser.maritalStatus ? currentUser.maritalStatus : 'N/A'}</p>
                      <p className="font-italic mb-0">Diet : {currentUser.diet ? currentUser.diet : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="p-4 card-subbackground">
                      <p className="font-italic mb-1">Mother Tongue : {currentUser.motherTongue ? currentUser.motherTongue : ''}</p>
                      <p className="font-italic mb-1">Religion : {currentUser.religion ? currentUser.religion : ''}</p>
                      <p className="font-italic mb-0">Caste : {currentUser.caste ? currentUser.caste: ''}</p>
                      <p className="font-italic mb-0">Native Place : {currentUser.nativePlace ? currentUser.nativePlace : 'N/A'}</p>
                      <p className="font-italic mb-0">Hobbies : {currentUser.hobbies ? currentUser.hobbies : 'N/A'}</p>
                    </div>
                  </div>
                </div>

                 <div className="mb-5">
                  <p className="lead fw-normal mb-1">Education & Profession</p>
                  <div className="p-4 card-subbackground">
                    <p className="font-italic mb-1">Qualification : {currentUser.qualification ? currentUser.qualification : 'N/A'}</p>
                    <p className="font-italic mb-1">Working Status : {currentUser.workingStatus ? currentUser.workingStatus : 'N/A'}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="lead fw-normal mb-0">Recent photos</p>
                  {/* <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p> */}
                </div>
                <div className="row">
                  <div className="col mb-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </div>
                  <div className="col mb-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <section className="about">
  //     <div className="container">
  //       <div className="section_title text-center">
  //         {/* <p>Main Info</p>
  //         <h3>About Me</h3> */}
  //       </div>
  //       <div className="row">
  //         <div className="col-md-6 profile-about-img">
  //           <div className="img-box image-fluid inner-shadow">
  //             <img src="images/contact_img.jpg" className="outer-shadow image-fluid" alt="Profile" />
             
  //                <Link to='/editProfile'>Edit Profile</Link>
               
  //           </div>
  //         </div>
  //         <div className="col-md-6 profile-about-info">
  //           <p>Hi, I'm.... Your soulmate is waiting for you.</p>
  //           <div>
  //             <a href="#" className="btns">Contact Details</a>
  //             <a href="#" className="btns">More Photos</a>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="profile-details">
  //         <div className="profile-details-tabs">
  //           <div className="tab-items active" onClick={() => openTab('personal')} data-target=".personal_details">Personal Details</div>
  //           <div className="tab-items" onClick={() => openTab('education')} data-target=".education">Education</div>
  //           <div className="tab-items" onClick={() => openTab('profession')} data-target=".profession">Profession</div>
  //         </div>
  //         <div id="personal" className="personal personal-details-tab tab-content active">
  //           <div className="part_info">
  //             <div className="row">
  //               <div className="col-sm-6 info-block">
  //                 <h5>Name:</h5><h5>xxxx</h5>
  //               </div>
  //               <div className="col-sm-6 info-block">
  //                 <h5>Age:</h5><h5>xxxx</h5>
  //               </div>
  //               <div className="col-sm-6 info-block">
  //                 <h5>Height:</h5><h5>xxxx</h5>
  //               </div>
  //               <div className="col-sm-6 info-block">
  //                 <h5>Weight:</h5><h5>xxxx</h5>
  //               </div>
  //               <div className="col-sm-6 info-block">
  //                 <h5>Native Place:</h5><h5>xxxx</h5>
  //               </div>
  //               <div className="col-sm-6 info-block">
  //                 <h5>Country Living In:</h5><h5>xxxx</h5>
  //               </div>
  //               <div className="col-sm-6 info-block">
  //                 <h5>Mother Tongue:</h5><h5>xxxx</h5>
  //               </div>
  //               <div className="col-sm-6 info-block">
  //                 <h5>Hobbies:</h5><h5>xxxx</h5>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div id="education" className="education education-details-tab tab-content">
  //           <div className="part_info">
  //             <div className="row">
  //               <div className="col-sm-6 info-block">
  //                 <h5>Qualification:</h5><h5>xxxx</h5>
  //               </div>
  //               <div className="col-sm-6 info-block">
  //                 <h5>College:</h5><h5>xxxx</h5>
  //               </div>
  //               <div className="col-sm-6 info-block">
  //                 <h5>University:</h5><h5>xxxx</h5>
  //               </div>
  //               <div className="col-sm-6 info-block">
  //                 <h5>Place:</h5><h5>xxxx</h5>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div id="profession" className="profession profession-details-tab tab-content">
  //           <div className="part_info">
  //             <div className="row">
  //               <div className="col-sm-6 info-block">
  //                 <h5>Designation:</h5><h5>xxxx</h5>
  //               </div>
  //               <div className="col-sm-6 info-block">
  //                 <h5>Experience:</h5><h5>xxxx</h5>
  //               </div>
  //               <div className="col-sm-6 info-block">
  //                 <h5>Company Name:</h5><h5>xxxx</h5>
  //               </div>
  //               <div className="col-sm-6 info-block">
  //                 <h5>Place:</h5><h5>xxxx</h5>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
}
