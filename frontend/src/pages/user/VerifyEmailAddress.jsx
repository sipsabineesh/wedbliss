import React, { useState,useEffect,useRef } from 'react';
import { useLocation,useParams,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { editUserSuccess,logout } from '../../redux/user/userSlice.js'
import { useChangeEmailAddressMutation } from '../../redux/user/userApiSlice';

export default function VerifyEmailAddress() {
    // const {id} = useParams()
    // const {email} = useParams()
    const [formData,setFormData] = useState({})
    const { loading,error } =useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [timer, setTimer] = useState(60); 
    const resendButtonRef = useRef(null);
    const location = useLocation();
    const { id, email } = location.state || {}; 

    const timerIntervalRef = useRef(null);
    const [changeEmailAddress] = useChangeEmailAddressMutation(id,email);

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
        body:JSON.stringify({"_id":id}),
    })
 }   

    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]:e.target.value})
    }

    const handleSubmit = async(e) => { 
        e.preventDefault();
        try {
         const { res } = await changeEmailAddress({id,email})
         dispatch(editUserSuccess(res))
         toast.success("Email Address Changed Successfully.You need to login with the new email address")
         navigate('/profile')
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

      </MDBRow>

    </MDBContainer>
    </>
  )
}
