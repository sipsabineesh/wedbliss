import { useState,useEffect,useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { loginFailure, loginStart, otpSuccess } from '../../redux/user/userSlice'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';

export default function UserOTPVerification() {
    const [formData,setFormData] = useState({})
    const { loading,error } =useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [timer, setTimer] = useState(60); 
    const resendButtonRef = useRef(null);
    const location = useLocation();
    const userId = new URLSearchParams(location.search).get('userId');
    const timerIntervalRef = useRef(null);

    useEffect(() => {
      startTimer();
      return () => clearInterval(timerIntervalRef.current);
    }, []);
  
    const startTimer = () => {
      timerIntervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1); 
      }, 1000);
    };

  // useEffect(() => {
  //   const timerInterval = setInterval(() => {
  //     setTimer((prevTimer) => prevTimer - 1); 
  //   }, 1000);
  //   return () => clearInterval(timerInterval);
  // }, []);

 
    const resendOTP = async () => {
      clearInterval(timerIntervalRef.current);
      setTimer(60); 
      startTimer(); 
      toast.success("Please check your email");
       const res = await fetch ('/api/auth/resendotp',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({"_id":userId}),
    })
         
    }
    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]:e.target.value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            dispatch(loginStart())
            const res = await fetch ('/api/auth/otpVerify',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        })
          const data = await res.json()
         
          if(!data.userId) {
            dispatch(loginFailure(data.message))
            return;
          }
          else{
            dispatch(otpSuccess(data.userId))
            navigate('/addProfile')
          }
        } catch (error) {
            dispatch(loginFailure(error))
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

            {/* <p>Please enter your OTP</p> */}

            <form onSubmit={handleSubmit}>

            <MDBInput wrapperClass='mb-4' className='text-margin'  placeholder='Enter your OTP' 
             id='otp' type='text' 
             onChange={handleChange} 
            />
             
            <div className="text-center">{timer <= 0 ? 'Timeout!' : `Time remaining: ${timer} seconds`}</div>
            <div className="text-center pt-1 text-margin pb-1">
            <div className="control">
            <p className="errorMsg">{error ? error || "Something went wrong" : ""}</p>
              <button type="submit" className="btns mb-4 w-100">
                Confirm
              </button>
           </div>
          
            </div>
            </form>
            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
         
              <div className="text-medium mb-0">
                <p className="text-black">
                    <button className="btns mx-2 text-link" ref={resendButtonRef} disabled={timer > 0} onClick={() => resendOTP()}>
                      Resend OTP
                    </button>
                </p>
              </div> 
            </div>
          </div>

        </MDBCol>

        <MDBCol col='6'>
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
  )
}
