import { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { loginStart,loginSuccess,loginFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
export default function Login() {
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
            return;
          }
          else{
            dispatch(loginSuccess(data))
            navigate('/')
          }
        } catch (error) {
            dispatch(loginFailure(error))
        }
    }
   return (
    <>
    <section id="contact" className="signup contact section_padding cover-bg">
        <div className="container">
            <div className="row">
                <div className="section_title text-center">
                    <p>Let us start the journey</p>
                    <h3>Login</h3>
                </div>

                <div className="col-md-12">
                    <div className="signup-form">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
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
                              
                                <div className="col-md-12">
                                    <button type="submit" disabled={loading} className="btns">{loading ? "Loading... " : "Login"}</button>
                                </div>
                                <div className="col-md-12 mt-4">
                                    <div className="text-medium"><p>Don't have an account? <Link to="/signup" className="text-link">SignUp</Link></p></div>
                                </div>
                                <p className="errorMsg">{error ? error || "Something went wrong" : ""}</p>
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




// import { useState } from 'react'
// import { Link } from 'react-router-dom'

// export default function Login() {
//   return (
//     <>
//     <section className="login">
//     <div className="form-container">
//       <h1>Login</h1>
//       <form action="login.html">
//         <div className="control">
//           <label htmlFor="name">Name</label>
//           <input type="text" name="name" />
//         </div>
//         <div className="control">
//           <label htmlFor="password">Password</label>
//           <input type="password" name="password" />
//         </div>
//         <p className="link">
//           <input type="checkbox" /> Remember Me
//         </p>
//         <div className="control">
//           <input type="submit" className="buttons" value="Login" />
//         </div>
//         <div className="text-medium"><p>Don't have an account? <Link to='/signup' className='text-link'>Signup</Link></p></div>

//       </form>
//       <p className="link">
//         <a href="#">Forgot Password</a>
//       </p>
//     </div>
//   </section>
//   </>
//   )
// }
