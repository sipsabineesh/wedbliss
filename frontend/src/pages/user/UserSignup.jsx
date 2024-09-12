import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { clearPreference, userPreference } from '../../redux/user/userSlice'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import OAuth from '../../components/OAuth';

export default function UserSignup() {
    const [formData,setFormData] = useState({})
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
    const dispatch = useDispatch();
    const navigate =  useNavigate()
  const preference = useSelector(userPreference);

    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]:e.target.value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          let isError = false; 
          const errors = {}; 
          if (!formData.username) {
              isError = true;
              errors.username = 'Please enter the username';
          }
          if (!formData.email) {
              isError = true;
              errors.email = 'Please enter the email';
          }
          if (!formData.phoneNumber) {
              isError = true;
              errors.phoneNumber = 'Please enter the phone number';
          }
          if (!formData.password) {
              isError = true;
              errors.password = 'Please enter the password';
          }
          if (formData.password !== formData.re_password) {
              isError = true;
              errors.re_password = 'Passwords do not match';
          }
          if (isError) {
              setLoading(false);
              setError(errors);
              return;
          }
          setLoading(true);
          setError(''); 
          if(preference)
            formData.preference = preference
            const res = await fetch ('/api/auth/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        })
          const data = await res.json()
          setLoading(false)
         
          if(data.success === false) {
            setError(data)
          }
          else{
            dispatch(clearPreference());
            setError('')
            // navigate('/otpVerify')
            navigate(`/otpVerify?userId=${data.userId}`);
          }
          setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }
  return (
    // <>
    // <MDBContainer className="my-5 gradient-form">
    //   <MDBRow>
    //     <MDBCol col='6' className="mb-5">  
    //       <div className="d-flex flex-column ms-5">
    //         <div className="text-center">
    //           <img src="http://res.cloudinary.com/dcsdqiiwr/image/upload/v1713969131/nstigastexr3ltx6vafc.png"
    //             style={{width: '150px', height:'150px'}} alt="logo" />
    //           <h4 className="mt-1 mb-5 pb-1"></h4>
    //         </div>
    //         <form onSubmit={handleSubmit}>
            
    //         <MDBInput wrapperClass='mb-2' placeholder='Name' id='username' type='text' 
    //         onChange={handleChange}
    //         />
    //         {error.username && <span className="errorMsg">{error.username}</span>}
    //         <MDBInput wrapperClass='mb-2' placeholder='Email address' id='email' type='email' 
    //         onChange={handleChange} 
    //         />
    //         {error.email && <span className="errorMsg">{error.email}</span>}
    //         <MDBInput wrapperClass='mb-2' placeholder='Phone Number' id='phoneNumber' type='text'
    //          onChange={handleChange}
    //          />
    //         {error.phoneNumber && <span className="errorMsg">{error.phoneNumber}</span>}
    //         <MDBInput wrapperClass='mb-2' placeholder='Password' id='password' type='password'
    //          onChange={handleChange}
    //          />
    //         {error.password && <span className="errorMsg">{error.password}</span>}
    //         <MDBInput wrapperClass='mb-2' placeholder='Confirm Password' id='re_password' type='password' 
    //         onChange={handleChange}
    //         />
    //         {error.re_password && <span className="errorMsg">{error.re_password}</span>}

        
    //         <div className="text-center pt-1 mb-5 pb-1">
    //             <div className="control">
    //                <p className="errorMsg">{error ? error || "Something went wrong" : ""}</p>
    //                 <button type="submit" disabled={loading} className="btns mb-4 w-100">{loading ? "Loading... " : "Register"}</button>
    //                 <OAuth/>
    //             </div>
    //         </div>
         

    //         <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
         
    //           <div className="text-medium mb-0"><p className="text-black">Have an account? <Link to='/login' className='btns mx-2 text-link'>Login</Link></p></div> 
    //         </div>
    //         </form>

    //       </div>

    //     </MDBCol>

    //     <MDBCol col='6' className="mb-5">
    //       <div className="d-flex flex-column justify-content-center">
    //             <img src="http://res.cloudinary.com/dcsdqiiwr/image/upload/v1713969131/login_img_eu6vkz.png"></img>
    //         {/* <div className="text-black px-3 py-4 p-md-5 mx-md-4">
    //           <h4 class="mb-4">We are The WedBliss Team</h4>
    //           <p class="text-black small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    //             tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    //             exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    //           </p>
    //         </div> */}

    //       </div>
    //     </MDBCol>
    //   </MDBRow>
    // </MDBContainer>
    // </>
    <>
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
            <MDBInput wrapperClass='mb-2' placeholder='Name' id='username' type='text'
              onChange={handleChange}
            />
            {error.username && <span className="errorMsg">{error.username}</span>}
            <MDBInput wrapperClass='mb-2' placeholder='Email address' id='email' type='email'
              onChange={handleChange}
            />
            {error.email && <span className="errorMsg">{error.email}</span>}
            <MDBInput wrapperClass='mb-2' placeholder='Phone Number' id='phoneNumber' type='text'
              onChange={handleChange}
            />
            {error.phoneNumber && <span className="errorMsg">{error.phoneNumber}</span>}
            <MDBInput wrapperClass='mb-2' placeholder='Password' id='password' type='password'
              onChange={handleChange}
            />
            {error.password && <span className="errorMsg">{error.password}</span>}
            <MDBInput wrapperClass='mb-2' placeholder='Confirm Password' id='re_password' type='password'
              onChange={handleChange}
            />
            {error.re_password && <span className="errorMsg">{error.re_password}</span>}

            <div className="text-center pt-1 mb-5 pb-1">
              <div className="control">
                <p className="errorMsg">{error ? error.message : ""}</p>
                <button type="submit" disabled={loading} className="btns mb-4 w-100">{loading ? "Loading... " : "Register"}</button>
                <OAuth />
              </div>
            </div>
          </form>
          <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
            <div className="text-medium mb-0">
              <p className="text-black">Have an account? <Link to='/login' className='btns mx-2 text-link'>Login</Link></p>
            </div>
          </div>
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
</>
  )
}


