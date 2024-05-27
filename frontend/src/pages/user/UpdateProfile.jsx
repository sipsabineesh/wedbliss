
import { useState,useEffect,useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editUserSuccess,logout } from '../../redux/user/userSlice.js'
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import Header from '../../components/Header.jsx';



export default function UpdateProfile() {
   const { currentUser } = useSelector(state => state.user);
   const [formData, setFormData] = useState({
         username: currentUser.username || '',
    email: currentUser.email || '',
    phoneNumber: currentUser.phoneNumber || '',
    });
    const [email,setEmail] = useState('')
  const [imageFile,setImageFile] = useState(null)
  const [imageFileURL,setImageFileURL] = useState(null)
  const [errors, setErrors] = useState({});
  const filePickerRef = useRef()

//   const [formData,setFormData] = useState({})
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const [dob,setDOB] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
  
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
    setFormData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        phoneNumber: currentUser.phoneNumber || '',
        dob: currentUser.dob || '',
   });
  }, [currentUser,imageFileURL],dob);
  
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

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const newErrors = {};
            
            if (!formData.username) {
                newErrors.username = 'Please enter the username';
            }
            if (!dob) { // Check if dob is empty
                newErrors.dob = 'Please enter the date of birth';
            }
            if (!formData.phoneNumber) {
                newErrors.phoneNumber = 'Please enter the phone number';
            }
        
            setErrors(newErrors);
          
    
            if (Object.keys(newErrors).length > 0) {
                // If there are errors, update the state and stop the submission
                setErrors(newErrors);
                setLoading(false);
                return;
            }
            else{
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
                    setError('You have been blocked by Admin. Please Contact the Admin')
                    navigate('/login')
                  }else{
                    setLoading(false)
                    setError('')
                    dispatch(editUserSuccess(data))
                    toast.success('Profile updated')
                    navigate('/profile')
                   }
            }            
        } catch (error) {
            setLoading(false)
            setError(error)
        }
        
    }

  return (
    <>
    <MDBContainer className="my-5 gradient-form">
        <MDBRow>
            <MDBCol col='6' className="mb-5">
                <div className="d-flex flex-column ms-5">
                    <div className="text-center">
                        <img src="http://res.cloudinary.com/dcsdqiiwr/image/upload/v1713969131/nstigastexr3ltx6vafc.png"
                            style={{ width: '150px', height: '150px' }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1"></h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <MDBCol md='12'  className='mb-3'>
        <div className='form-group'>
            <label htmlFor='username' className='form-label'>
                Username
            </label>
            <MDBInput
                wrapperClass='mb-2'
                placeholder='Name'
                id='username'
                type='text'
                onChange={handleChange}
                defaultValue={currentUser.username}
            />
             {errors.username && <span className="errorMsg">{errors.username}</span>}
        </div>
    </MDBCol>
   
                      
                        <MDBRow>
    <MDBCol md='3' className='gender-row mb-3'>
        <div className='form-group'>
            <span className='gender-title'>Gender</span>
        </div>
    </MDBCol>
    <MDBCol md='3'>
        <div className='form-group'>
            <input
                type='radio'
                id='male'
                className='gender-details'
                name='gender'
                value='male'
                defaultChecked={currentUser.gender === 'male'}
                onChange={handleChange}
            />
            <label htmlFor='male' className='gender-label'>
                Male
            </label>
        </div>
    </MDBCol>
    <MDBCol md='3'>
        <div className='form-group'>
            <input
                type='radio'
                id='female'
                className='gender-details'
                name='gender'
                value='female'
                defaultChecked={currentUser.gender === 'female'}
                onChange={handleChange}
            />
            <label htmlFor='female' className='gender-label'>
                Female
            </label>
        </div>
    </MDBCol>
    
    <MDBCol md='12'>
        <div className='form-group'>
            <label htmlFor='phoneNumber' className='form-label'>
                Phone Number
            </label>
            <MDBInput
                wrapperClass='mb-2'
                placeholder='Phone Number'
                id='phoneNumber'
                type='text'
                onChange={handleChange}
                defaultValue={currentUser.phoneNumber}
            />
               {errors.phoneNumber && <span className="errorMsg">{errors.phoneNumber}</span>}
        </div>
     
    </MDBCol>
                      
                        
    <MDBCol md='12'>
        <div className='form-group'>
            <label htmlFor='dob' className='form-label'>
                Date of Birth
            </label>
            <MDBInput
                wrapperClass='mb-2'
                placeholder='Date Of Birth'
                type='date'
                id='dob'
                onChange={handleChange}
                defaultValue={dob}
            />
            {dob}
             {errors.dob && <span className="errorMsg">{errors.dob}</span>}
        </div>
    </MDBCol>
</MDBRow>

                       
                        
                        {/* <MDBInput wrapperClass='mb-2' placeholder='Confirm Password' id='re_password' type='password'
                            onChange={handleChange}
                            value={formData.re_password}
                        />
                        {errors.re_password && <span className="errorMsg">{errors.re_password}</span>} */}

                        <div className="text-center pt-1 mb-5 pb-1">
                            <div className="control">
                                <p className="errorMsg">{errors.message}</p>
                                <button type="submit" disabled={loading} className="btns mb-4 w-100">{loading ? "Loading... " : "Update"}</button>
                            </div>
                        </div>
                    </form>
                   
                </div>
            </MDBCol>

            <MDBCol col='6' className="mb-5">
                <div className="d-flex flex-column justify-content-center">
                    <img src="http://res.cloudinary.com/dcsdqiiwr/image/upload/v1713969131/login_img_eu6vkz.png"></img>
                </div>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
</>
  )
}
