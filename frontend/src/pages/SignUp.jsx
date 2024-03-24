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
                return; 
            }else if(!formData.email){
                setLoading(false);
                setError('Please enter the email');
                return; 
            }else if(!formData.password) {
                setLoading(false);
                setError('Please enter the password');
                return; 
            }else if(formData.password !== formData.re_password){
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
            setError('')
            navigate('/login')
          }
          setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
       
      
    }
   return (
    <>
    <section id="contact" className="signup contact section_padding cover-bg">
        <div className="container">
            <div className="row">
                <div className="section_title text-center">
                    <p>Register For Free</p>
                    <h3>Signup</h3>
                </div>

                <div className="col-md-12">
                    <div className="signup-form">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text"
                                               id="username" 
                                               placeholder="Name" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="email"
                                               id="email"
                                               placeholder="Email" onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="password" 
                                               id="password" 
                                               placeholder="Password" onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="password" 
                                               id="re_password" 
                                               placeholder="Re-Enter the Password" onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button type="submit" disabled={loading} className="btns">{loading ? "Loading... " : "Register"}</button>
                                </div>
                                <div className="col-md-12 mt-4">
                                    <div className="text-medium"><p>Have an account? <Link to='/login' className='text-link'>Login</Link></p></div>
                                </div>
                                <p className='errorMsg'>{error ? error :""}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</>

  )
}
