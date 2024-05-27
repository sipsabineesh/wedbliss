import React, { useState } from 'react';
import { Link,useParams,useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { useChangePasswordMutation } from '../../redux/user/userApiSlice';

export default function ChangePassword() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      const { email } = useParams();
      const [error, setError] = useState('');
      const navigate = useNavigate();
      const [changePassword] = useChangePasswordMutation();
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      }
    
      const handleSubmit = async(e) => {
        formData.email = email
        console.log(formData)
        e.preventDefault();
       try {
        const { data } = await changePassword({formData})
        if(data){
          navigate('/login');
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
            </div>
           
            <form onSubmit={handleSubmit}>
            <h4 className="change-password-margin">Change Password</h4>
              {/* <MDBInput wrapperClass='mb-2' placeholder='Current Password' id='currentPassword' type='password' value={formData.currentPassword} onChange={handleChange} /> */}
              <MDBInput wrapperClass='mb-2' placeholder='New Password' id='newPassword' type='password' value={formData.newPassword} onChange={handleChange} />
              <MDBInput wrapperClass='mb-2' placeholder='Confirm Password' id='confirmPassword' type='password' value={formData.confirmPassword} onChange={handleChange} />
              <div className="text-center pt-1 mb-5 pb-1">
                <button type="submit" className="btns mb-4 w-100">Submit</button>
              </div>
            </form>
            {error && <p className="text-danger">{error}</p>}
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

