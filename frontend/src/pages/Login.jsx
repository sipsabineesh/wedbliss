import { useState,useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { loginStart,loginSuccess,loginFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Login() {
    const [formData,setFormData] = useState({})
    const [error,setError] = useState('')
    const { loading } =useSelector((state) => state.user)
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
    
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
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            dispatch(loginStart())
            const res = await fetch ('/api/auth/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        })
          const data = await res.json()
         
          if(data.success === false) {
            dispatch(loginFailure(data.message))
            setError(data.message);
            return;
          }
          else{
            dispatch(loginSuccess(data))
           
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
      <section className="login">
      <div className="form-container">
        <div className="section_title text-center">
                    <p>Let us start the journey</p>
                    <h3>Login</h3>
                </div>
        <form onSubmit={handleSubmit}>
          <div className="control ">
            
          {/* <label htmlFor="name">Name</label> */}
          <input type="email"
                 id="email"
                 placeholder="Email" className="stylish-textbox"
                 onChange={handleChange} />
        </div>
        <div className="control">
          {/* <label htmlFor="password">Password</label> */}
          <input type="password"
                 id="password" 
                 placeholder="Password" className="stylish-textbox"
                 onChange={handleChange} />
        </div>
        {/* <p className="link">
          <input type="checkbox" /> Remember Me
        </p> */}
        <div className="control">
        <button type="submit" disabled={loading} className="btns">{loading ? "Loading... " : "Login"}</button>
        </div>
      <p className="errorMsg">{error ? error || "Something went wrong" : ""}</p>
        <div className="text-medium"><p>Don't have an account? <Link to='/signup' className='text-link'>Signup</Link></p></div> 

      </form>
      {/* <p className="link">
        <a href="#">Forgot Password</a>
      </p> */}
    </div>
  </section>

</>

  )
}



