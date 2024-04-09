import { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { editUserSuccess,logout } from '../../redux/user/userSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useRef } from 'react';


export default function EditProfile() {
  const [email,setEmail] = useState('')
  const [imageFile,setImageFile] = useState(null)
  const [imageFileURL,setImageFileURL] = useState(null)
  const filePickerRef = useRef()

  const [formData,setFormData] = useState({})
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const [dob,setDOB] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useSelector(state => state.user);
  useEffect(() => {
    // console.log("current user in edit")
    // console.log(currentUser)
    if(imageFile){
      uploadImage(imageFileURL)
    }
    setEmail(currentUser.email);
    function convertDateFormat(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    }
    
    const originalDate = currentUser.dob
    const formattedDate = convertDateFormat(originalDate);
    setDOB(formattedDate)
  }, [currentUser,imageFileURL]);
  
  const uploadImage = (base6Encode) => {
    console.log('uplodingggggggggggg')
    console.log(base6Encode)
    try {
      
    } catch (error) {
      console.log(error)
    }
    
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if(file){
       setImageFile(file)
       const reader = new FileReader()
       reader.readAsDataURL(file)
       reader.onloadend = () => {
        setImageFileURL(reader.result)
       }
       setFormData({ ...formData, [e.target.id]: imageFileURL });
      //  setImageFileURL(URL.createObjectURL(file))
    }
   
  }

const handleChange = (e) => {
  let value = e.target.value;

  if (e.target.type === 'date') {
    const selectedDate = new Date(e.target.value);
    value = selectedDate.toISOString();
  }

  setFormData({ ...formData, [e.target.id]: value });
}

const handleSubmit = async(e) => {
  e.preventDefault();
  try {
    //  if(!formData.motherTongue){
    //       setLoading(false);
    //       setError('Please enter the Mother Tongue');
    //       return; 
    //   }else if(!formData.nativePlace){
    //       setLoading(false);
    //       setError('Please enter the nativePlace');
    //       return; 
    //   }   
    if(imageFile){
      uploadImage()
    }
      setLoading(true)
      setError('')
      console.log("FORMDATA")
      console.log(formData)
      const res = await fetch (`/api/user/editProfile/${currentUser._id}`,{
      method:'PUT',
      headers:{
          'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
  })
    const data = await res.json()
   
    if(data.success === false)
    {
      dispatch(logout())
      navigate('/login')
    }else{
      setLoading(false)
      setError('')
      dispatch(editUserSuccess(data))
      toast.success('Profile updated')
      navigate('/profile')
     }
  
    setLoading(false)
  } catch (error) {
      setLoading(false)
      setError(error)
  }
}

  return (
    <>
    <section id="contact" className="signup contact section_padding cover-bg">
      <div className="container">
        <div className="row">
          <div className="section_title text-center">
            <p>Enhance Your Profile</p>
            <h3>Edit Profile</h3>
          </div>

          <div className="col-md-12">
            <div className="signup-form">
              <form onSubmit={handleSubmit} >
                <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                      <input type="file" accept="image/*" id="profilePhoto" onChange={handleImageChange} ref={filePickerRef} hidden/>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                    <div className="rounded-image-container" onClick={() => filePickerRef.current.click()}>
                      <img
                        src={imageFileURL || currentUser.profilePhoto}
                        alt="Profile Picture"
                        className="rounded-image"
                      />
                    </div>
                    </div>
                  </div>


                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" id="name" placeholder="Name" defaultValue={currentUser.username} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="email" id="email" placeholder="Email" defaultValue={email}  onChange={handleChange}/>
                    </div>
                 </div>
                  <div className="col-md-3 gender-row">
                    <div className="form-group">
                      <span className="gender-title">Gender</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <input type="radio" id="gender" className="gender-details" name="gender" value="male" 
                        defaultChecked={currentUser.gender === 'male'} onChange={handleChange}/>
                      <label htmlFor="male" className="gender-label">Male</label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <input type="radio" id="gender" className="gender-details"  name="gender" value="female"
                       defaultChecked={currentUser.gender === 'female' } onChange={handleChange}   />
                      <label htmlFor="female" className="gender-label">Female</label>
                    </div>
                  </div> 
                  <div className="col-md-6">
                    <div className="form-group">
                       <input type="date" placeholder="Date of Birth" id="dob"  defaultValue={dob} onChange={handleChange}  />
                    </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-group">
                    <input type="text" id="phoneNumber"  defaultValue={currentUser.phoneNumber}  onChange={handleChange} />
                  </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                      <div className="select-box">
                      <select id="religion"  defaultValue={currentUser.religion} onChange={handleChange}>
                        <option disabled selected hidden>Religion</option>
                          <option value="hindu">Hindu</option>
                          <option value="christain">Christain</option>
                          <option value="muslim">Muslim</option>
                      </select>
                      </div>
                    </div>
                  </div>
                   
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="select-box">
                      <select id="caste"  defaultValue={currentUser.caste} onChange={handleChange}>
                          <option disabled selected hidden>Caste</option>
                          <option value="hindu">Hindu</option>
                          <option value="christain">Christain</option>
                          <option value="muslim">Muslim</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                 <div className="col-md-6">
                    <div className="form-group">
                      <div className="select-box">
                        <select id="maritalStatus"  defaultValue={currentUser.maritalStatus} onChange={handleChange}>
                        <option disabled selected hidden>Marital Status</option>
                          <option value="single">Single</option>
                          <option value="divorced">Divorced</option>
                        </select>
                      </div>
                    </div>
                  </div>
                   <div className="col-md-6">
                    <div className="form-group">
                      <div className="select-box">
                        <select id="diet"  defaultValue={currentUser.diet} onChange={handleChange}>
                        <option disabled selected hidden>Diet</option>
                          <option value="Vegetarian">Vegetarian</option>
                          <option value="Non-Veg">Non-Veg</option>
                          <option value="Vegan">Vegan</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" id="motherTongue" placeholder="Mother Tongue" defaultValue={currentUser.motherTongue} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" id="nativePlace" placeholder="Native Place"  defaultValue={currentUser.nativePlace} onChange={handleChange}/>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" id="weight" placeholder="Weight"  defaultValue={currentUser.weight} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" id="height" placeholder="Height"  defaultValue={currentUser.height} onChange={handleChange}/>
                    </div>
                  </div>
                       
                   <div className="col-md-6">
                    <div className="form-group">
                      <div className="select-box">
                        <select id="qualification"  defaultValue={currentUser.qualification} onChange={handleChange}>
                          <option disabled selected hidden>Qualification</option>
                          <option value="10th">10th</option> 
                          <option value="Higher Secondary">Higher Secondary</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Graduation">Graduation</option>
                          <option value="Post Graduation">Post Graduation</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="select-box">
                        <select id="workingStatus"  defaultValue={currentUser.workingStatus} onChange={handleChange}>
                          <option disabled selected hidden>Working Status</option>
                          <option value="Private Sector">Private Sector</option> 
                          <option value="Public Sector">Public Sector</option>
                          <option value="Own Business">Own Business</option>
                          <option value="Not Working">Not Working</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" id="hobbies" placeholder="Hobbies" defaultValue={currentUser.hobbies} onChange={handleChange}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" id="countryLivingIn" placeholder="Country Living In" defaultValue={currentUser.countryLivingIn} onChange={handleChange}/>
                    </div>
                  </div>
           
                  <div className="col-md-12">
                        <textarea placeholder="About Yourself" id="about" defaultValue={currentUser.about} onChange={handleChange}></textarea>
                  </div>
                  <div className="col-md-12">
                  <div className="control">
                   <button type="submit" disabled={loading} className="btns">{loading ? "Loading... " : "Submit"}</button>
                  </div>
           <p className="errorMsg">{error ? error || "Something went wrong" : ""}</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
