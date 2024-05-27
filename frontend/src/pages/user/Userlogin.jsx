import { useState,useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { loginStart,loginSuccess,loginFailure } from '../../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import OAuth from '../../components/OAuth';

export default function Userlogin() {
    const [formData,setFormData] = useState({})
    const [error,setError] = useState('')
    const { loading } =useSelector((state) => state.user)
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
      console.log("current user in login")
      console.log(currentUser)
     if(currentUser){
        navigate('/'); 
      }
      else{
        navigate('/login');
      }
    }, [currentUser, navigate]);
  
    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]:e.target.value})
    }

    const handleForgotPassword = (e) => { 
      e.preventDefault();
      // toast.success("Please check your email")
      navigate('/forgotPassword')
    }
    
    const validateEmail = email => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }
    
        if (!formData.password) {
            setError('Please enter your password');
            return;
        }
            dispatch(loginStart())
            const res = await fetch ('/api/auth/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        })
          const data = await res.json()
          console.log(data)
          if(data.success === false) {
            dispatch(loginFailure(data.message))
            setError(data.message);
            return;
          }
          else{
            dispatch(loginSuccess(data))
            console.log(data)
            if(data.isAdmin == true)
             navigate('/dashboard')
            else           
             navigate('/')
          }
        } catch (error) {
            dispatch(loginFailure(error))
            setError(error);
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
                style={{width: '150px', height:'150px'}} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1"></h4>
            </div>

            <p>Please login to your account</p>

            <form onSubmit={handleSubmit}>

            <MDBInput wrapperClass='mb-4' placeholder='Email Address' 
             id='email' type='email' 
             onChange={handleChange} 
            />
            <MDBInput wrapperClass='mb-4' placeholder='Password'
             id="password" type='password'
             onChange={handleChange} 
            />


            <div className="text-center pt-1 mb-5 pb-1">
            <div className="control">
            <p className="errorMsg">{error ? error || "Something went wrong" : ""}</p>
              <button type="submit" disabled={loading}  className="btns mb-4 w-100">{loading ? "Loading... " : "Login"}</button>
              <OAuth/>
           </div>
           <button onClick={handleForgotPassword} className="forgot-password-button">Forgot Password?</button>
             
            </div>
            </form>
            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
         
              <div className="text-medium mb-0"><p className="text-black">Don't have an account? <Link to='/signup' className='btns mx-2 text-link'>Signup</Link></p></div> 
            </div>

          </div>

        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column justify-content-center">
                <img src="http://res.cloudinary.com/dcsdqiiwr/image/upload/v1713969131/login_img_eu6vkz.png"></img>
            {/* <div className="text-black px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4">We are The WedBliss Team</h4>
              <p class="text-black small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div> */}

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
    </>
  );
}
