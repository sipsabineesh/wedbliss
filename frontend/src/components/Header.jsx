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
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
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
          <li className="nav-item ml-2"><Link className='nav-link' to={'/'}>About Us</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/'}>Packages</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/'}>Contact Us</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/'}>Search</Link></li>
          {/* <li className="nav-item ml-2">{currentUser ?<div className="nav-item ml-2"> <Link className="nav-link" to={'/profile'}><i className="fa fa-user" aria-hidden="true"></i></Link> <Link className="nav-link" to={'/profile'}><i className="fa fa-sign-out" aria-hidden="true"></i></Link></div> : <Link className="nav-link" to={'/login'}><i className="fa fa-sign-in" aria-hidden="true"></i></Link> }</li>  */}
          {currentUser ? (
                                <div className="nav-item ml-2 d-flex align-items-center">
                                    <Link className="nav-link" to={'/profile'}>
                                        <i className="fa fa-user mr-2" aria-hidden="true"></i>
                                    </Link>
                                    <Link className="nav-link" onClick={handleLogout}>
                                        <i  className="fa fa-sign-out" aria-hidden="true"></i>Logout
                                    </Link>
                                </div>
                            ) : (
                                <Link className="nav-link" to={'/login'}>
                                    <i className="fa fa-sign-in" aria-hidden="true"></i>Login
                                </Link>
                            )}
        </ul>
      </div>
    </div>
  </nav>
  )
}
