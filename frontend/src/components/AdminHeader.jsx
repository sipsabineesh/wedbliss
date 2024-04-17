import React, { useState } from 'react'
import { Link,Navigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { logout } from '../redux/admin/adminSlice';

export default function AdminHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const {adminUser} = useSelector(state => state.admin)
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
   
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top nav-scroll">
      <div className="container">
      <div className="logo">
      <Link className='nav-link' to={'/'}><a className="navbar-brand custom_logo"><span>WedBliss</span></a></Link>
      </div>
     
     <button className="navbar-toggler" type="button" onClick={toggleMenu}>
        <span className="fa fa-bars"></span>
      </button>
      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item ml-2"><Link className='nav-link' to={'/dashboard'}>Home</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/userList'}>Users</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/planList'}>Packages</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/dashboard'}>Subscriptions</Link></li>
          <li className="nav-item ml-2"><Link className='nav-link' to={'/dashboard'}>Search</Link></li>
          {/* <li className="nav-item ml-2">{currentUser ?<div className="nav-item ml-2"> <Link className="nav-link" to={'/profile'}><i className="fa fa-user" aria-hidden="true"></i></Link> <Link className="nav-link" to={'/profile'}><i className="fa fa-sign-out" aria-hidden="true"></i></Link></div> : <Link className="nav-link" to={'/login'}><i className="fa fa-sign-in" aria-hidden="true"></i></Link> }</li>  */}
          <li className="nav-item ml-2">
         
          {adminUser ? (
                                <div className="nav-item ml-2 d-flex align-items-center">
                                    <Link className="nav-link" onClick={handleLogout}>
                                        <i  className="fa fa-sign-out" aria-hidden="true"></i>Logout
                                    </Link>
                                </div>
                             ) : ( 
                                 <Link className="nav-link" to={'/adminLogin'}>
                                    <i className="fa fa-sign-in" aria-hidden="true"></i>Login
                                </Link> 
                            )}
              </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}
