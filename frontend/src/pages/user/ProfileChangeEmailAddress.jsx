
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { editUserSuccess, logout } from '../../redux/user/userSlice.js';
// import { useChangeEmailAddressMutation } from '../../redux/user/userApiSlice';
import { useVerifyEmailAddressMutation } from '../../redux/user/userApiSlice';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';

export default function ProfileChangeEmailAddress() {
  const location = useLocation();
  const { id } = location.state || {};
    const [email, setEmail] = useState('');
    // const dispatch = useDispatch();
     const navigate = useNavigate();
    // const [changeEmailAddress] = useChangeEmailAddressMutation();
     const [verifyEmailAddress] = useVerifyEmailAddressMutation(email);
console.log("userId")
console.log(id)
    
    const handleChange = (e) => {
      setEmail(e.target.value);
    }
  
    const handleSubmit = async(e) => { 
       e.preventDefault();
       try {
        // const { res } = await changeEmailAddress({id,email})
        const res = await verifyEmailAddress({id,email})
        console.log("res")
        console.log(res.data.message)
        // dispatch(editUserSuccess(res))
        if(res.data.success === true) {
            toast.success(res.data.message)
            // navigate('/verifyEmailAddress/'+id+'/'+email)
            navigate('/verifyEmailAddress', { state: { id, email } });
        }
         else{

         }
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

