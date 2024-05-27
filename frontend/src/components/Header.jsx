import React, { useState } from 'react'
import { Link,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = async() => {
      try {
        const res = await fetch ('/api/auth/logout',{
          method:'GET',
          headers:{
              'Content-Type':'application/json',
          },
      })
      dispatch(logout())
      } catch (error) {
        console.log(error)
      }
    }
    const {currentUser} = useSelector(state => state.user)
  return (
    <nav className="header navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
      <div className="logo">
      <Link className='nav-link' to={'/'}><a className="navbar-brand custom_logo"><span>WedBliss</span></a></Link>
      </div>
     
     <button className="navbar-toggler" type="button" onClick={toggleMenu}>
        <span className="fa fa-bars"></span>
      </button>
      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item ml-2"><Link className='nav-link' to={'/'}>Home</Link></li>
          {currentUser ? (
    <>
        <li className="nav-item ml-2">
            <Link className="nav-link" to={'/suggestions'}>Suggestions</Link>
        </li>
        <li className="nav-item ml-2">
            <Link className="nav-link" to={'/acceptedList'}>Accepted Interests</Link>
        </li>
        {currentUser.isSubscribed && (
            <li className="nav-item ml-2">
                <Link className="nav-link" to={'/plans'}>My Package</Link>
            </li>
        )}
    </>
) : (
    <li className="nav-item ml-2">
        <Link className='nav-link' to={'/'}>Search</Link>
    </li>
)}

          </ul>
          </div>
          {/* <li className="nav-item ml-2"><Link className='nav-link' to={'/'}>About Us</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/'}>Packages</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/'}>Contact Us</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/'}>Search</Link></li> */}
          {/* <li className="nav-item ml-2">{currentUser ?<div className="nav-item ml-2"> <Link className="nav-link" to={'/profile'}><i className="fa fa-user" aria-hidden="true"></i></Link> <Link className="nav-link" to={'/profile'}><i className="fa fa-sign-out" aria-hidden="true"></i></Link></div> : <Link className="nav-link" to={'/login'}><i className="fa fa-sign-in" aria-hidden="true"></i></Link> }</li>  */}
          <ul className="navbar-nav ml-auto">
                    {currentUser ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">
                                    <i className="fa fa-user mr-1">{currentUser.username}</i>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleLogout}>
                                    <i className="fa fa-sign-out mr-1"></i> 
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                <i className="fa fa-sign-in mr-1"></i> Login
                            </Link>
                        </li>
                    )}
                </ul>


       
      
    </div>
  </nav>
  )
}


 
// {currentUser ? (
  // <div className="nav-item ml-2 d-flex">
    

  //      <Link className="nav-link" to={'/profile'}>
  //         <i className="fa fa-user mr-2"></i>
  //     </Link>
  //     <Link className="nav-link" onClick={handleLogout}>
  //         <i  className="fa fa-sign-out"></i>Logout
  //     </Link>

  //     <div>
{/* <p className="mb-1 h5"><Link to='/suggestions'>{}</Link></p>
<p className="small text-muted mb-0"><Link className="text-black remove-link"></Link></p> */}
// </div>
//   </div>
// ) : (
  // <Link className="nav-link" to={'/login'}>
  //     <i className="fa fa-sign-in"></i>Login
  // </Link>
// )}