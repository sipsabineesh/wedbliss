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
                            <input
                                type="text"
                                id="username"
                                className="stylish-textbox"
                                placeholder="Name"
                                onChange={handleChange}
                            />
                            {error.username && <span className="errorMsg">{error.username}</span>}
                        </div>
                        <div className="control">
                            <input
                                type="email"
                                id="email"
                                className="stylish-textbox"
                                placeholder="Email"
                                onChange={handleChange}
                            />
                            {error.email && <span className="errorMsg">{error.email}</span>}
                        </div>
                        <div className="control">
                            <input
                                type="phoneNumber"
                                id="phoneNumber"
                                className="stylish-textbox"
                                placeholder="Phone Number"
                                onChange={handleChange}
                            />
                            {error.phoneNumber && <span className="errorMsg">{error.phoneNumber}</span>}
                        </div>
                        <div className="control">
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                className="stylish-textbox"
                                onChange={handleChange}
                            />
                            {error.password && <span className="errorMsg">{error.password}</span>}
                        </div>
                        <div className="control">
                            <input
                                type="password"
                                id="re_password"
                                className="stylish-textbox"
                                placeholder="Re-Enter the Password"
                                onChange={handleChange}
                            />
                            {error.re_password && <span className="errorMsg">{error.re_password}</span>}
                        </div>
                        <div className="control">
                            <button type="submit" disabled={loading} className="btns">{loading ? "Loading... " : "Register"}</button>
                        </div>
                        {/* {Object.keys(error).length > 0 && (
                            <div className="errorContainer">
                                {Object.keys(error).map((key) => (
                                    <p key={key} className="errorMsg">{error[key]}</p>
                                ))}
                            </div>
                        )} */}
                        <div className="text-medium"><p>Have an account? <Link to='/login' className='text-link'>Login</Link></p></div>
                    </form>
                </div>
            </section>
     {/* <section className="login">
      <div className="form-container">
        <div className="section_title text-center">
                    <p>Register For Free</p>
                    <h3>Signup</h3>
                </div>
        <form onSubmit={handleSubmit}>
        <div className="control">
    <input
        type="text"
        id="username"
        className="stylish-textbox"
        placeholder="Name"
        onChange={handleChange}
    />
    {error.username && <p className="errorMsg">{error.username}</p>}
</div>
<div className="control">
    <input
        type="email"
        id="email"
        className="stylish-textbox"
        placeholder="Email"
        onChange={handleChange}
    />
    {error.email && <p className="errorMsg">{error.email}</p>}
</div>
<div className="control">
    <input
        type="phoneNumber"
        id="phoneNumber"
        className="stylish-textbox"
        placeholder="Phone Number"
        onChange={handleChange}
    />
    {error.phoneNumber && <p className="errorMsg">{error.phoneNumber}</p>}
</div>
<div className="control">
    <input
        type="password"
        id="password"
        placeholder="Password"
        className="stylish-textbox"
        onChange={handleChange}
    />
    {error.password && <p className="errorMsg">{error.password}</p>}
</div>
<div className="control">
    <input
        type="password"
        id="re_password"
        className="stylish-textbox"
        placeholder="Re-Enter the Password"
        onChange={handleChange}
    />
    {error.re_password && <p className="errorMsg">{error.re_password}</p>}
</div>

        <div className="control">
          <button type="submit" disabled={loading} className="btns">{loading ? "Loading... " : "Register"}</button>
        </div>
        <p className="errorMsg">{error ? error || "Something went wrong" : ""}</p>
        <div className="text-medium"><p>Have an account? <Link to='/login' className='text-link'>Login</Link></p></div>

      </form>
    
    </div>
  </section> */}
</>

  )
}
