
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useForgotPasswordMutation } from '../../redux/user/userApiSlice';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [forgotPassword] = useForgotPasswordMutation();

    const handleChange = (e) => {
      setEmail(e.target.value);
    }
  
    const handleSubmit = async(e) => {
       e.preventDefault();
       try {
        const { data } = await forgotPassword({email})
        if(data.success)       
           toast.success(data.message)
          navigate('/login')
       
       } catch (error) {
        console.log(error)
       }
     
      }
  return (
    <>
     <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col='6' className="mb-5">  
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img src="http://res.cloudinary.com/dcsdqiiwr/image/upload/v1713969131/nstigastexr3ltx6vafc.png" style={{ width: '150px', height: '150px' }} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1"></h4>
            </div>
            <form  onSubmit={handleSubmit}>
              <MDBInput wrapperClass='mb-2' className='forgot-password-margin' placeholder='Email Address' id='email' type='email' value={email} onChange={handleChange} />
              <div className="text-center pt-1 mb-5 pb-1">
                <button type="submit" className="btns mb-4 w-100 forgot-password-margin">Submit</button>
              </div>
            </form>
          </div>
        </MDBCol>
        <MDBCol col='6'>
          <div className="d-flex flex-column justify-content-center">
            <img src="http://res.cloudinary.com/dcsdqiiwr/image/upload/v1713969131/login_img_eu6vkz.png" alt="illustration" />
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    
    </>
  )
}

