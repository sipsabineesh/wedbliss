import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
export default function SignUp() {
    const [formData,setFormData] = useState({})
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
    const navigate =  useNavigate()
    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]:e.target.value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
           if(!formData.username){
                setLoading(false);
                setError('Please enter the username');
               return false; 
           }if(!formData.email){
                setLoading(false);
                setError('Please enter the email');
               return false; 
            }
            if(!formData.phoneNumber) {
              setLoading(false);
              setError('Please enter the phone number');
              return; 
            } if(!formData.password) {
                setLoading(false);
                setError('Please enter the password');
                return; 
            } if(formData.password !== formData.re_password){
                setLoading(false);
                setError('Passwords dont match');
                return; 
            }
         
            setLoading(true)
            setError('')
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
            setError(data.message)
          }
          else{
            console.log("ALL GOOD")
            setError('')
            navigate('/otpVerify')
          }
          setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
       
      
    }
   return (
    <>
     <section className="login">
      <div className="form-container">
        <div className="section_title text-center">
                    <p>Register For Free</p>
                    <h3>Signup</h3>
                </div>
        <form onSubmit={handleSubmit}>
          <div className="control">
          {/* <label htmlFor="name">Name</label> */}
          <input type="text"
                 id="username" className="stylish-textbox"
                 placeholder="Name" onChange={handleChange} />
        </div>
        <div className="control">
          {/* <label htmlFor="password">Password</label> */}
          <input type="email"
                 id="email" className="stylish-textbox"
                 placeholder="Email" onChange={handleChange}/>
        </div>
        <div className="control">
          {/* <label htmlFor="password">Phone Number</label> */}
          <input type="phoneNumber" 
                id="phoneNumber" className="stylish-textbox"
                placeholder="Phone Number" onChange={handleChange}/>
        </div>
        <div className="control">
          {/* <label htmlFor="password">Password</label> */}
          <input type="password"
                 id="password" 
                 placeholder="Password" className="stylish-textbox"
                 onChange={handleChange} />
        </div>
        <div className="control">
          {/* <label htmlFor="password">Password</label> */}
          <input type="password" 
                id="re_password" className="stylish-textbox"
                placeholder="Re-Enter the Password" onChange={handleChange}/>
        </div>
       
        <div className="control">
          <button type="submit" disabled={loading} className="btns">{loading ? "Loading... " : "Register"}</button>
        </div>
        <p className="errorMsg">{error ? error || "Something went wrong" : ""}</p>
        <div className="text-medium"><p>Have an account? <Link to='/login' className='text-link'>Login</Link></p></div>

      </form>
    
    </div>
  </section>
</>

  )
}
