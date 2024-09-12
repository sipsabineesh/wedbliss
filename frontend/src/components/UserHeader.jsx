
import React, { useState } from 'react'
import { Link,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux'

export default function UserHeader() {
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

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<div className="container">
    <Link className="navbar-brand" to="/">
        <img src="http://res.cloudinary.com/dcsdqiiwr/image/upload/v1715072610/ybtib72dylsldchvnnqc.png" alt="Logo" className="navbar-logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
            </li>
        </ul>
        <div className="navbar-nav">
            {currentUser ? (
                <>
                    <Link className="nav-link" to="/profile">Profile</Link>
                    <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <Link className="nav-link" to="/login">Login</Link>
            )}
        </div>
    </div>
</div>
</nav>
  )
}
