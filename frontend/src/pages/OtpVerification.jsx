import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginFailure, loginStart, otpSuccess } from '../redux/user/userSlice'

export default function OtpVerification() {
    const [formData,setFormData] = useState({})
    const { loading,error } =useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
          console.log(data)
          if(data.success === false) {
            dispatch(loginFailure(data.message))
            return;
          }
          else{
            dispatch(otpSuccess())
            navigate('/login')
          }
        } catch (error) {
            dispatch(loginFailure(error))
        }
    }
   return (
    <>
      <section className="login">
      <div className="form-container">
        <div className="section_title text-center">
                    {/* <p>Let us start the journey</p> */}
                    <h3>OTP Verification</h3>
                </div>
        <form onSubmit={handleSubmit}>
          <div className="control">
          {/* <label htmlFor="name">Name</label> */}
          <input type="text"
                 id="otp"
                 placeholder="Enter your OTP" className="stylish-textbox"
                 onChange={handleChange} />
        </div>
              
         <div className="control">
        <button type="submit" disabled={loading} className="btns">{loading ? "Loading... " : "Confirm"}</button>
        </div>
      {/*  <p className="errorMsg">{error ? error || "Something went wrong" : ""}</p> */}
      </form>
    </div>
  </section>

</>

  )
}
