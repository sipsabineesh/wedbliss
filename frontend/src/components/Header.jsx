import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
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
          <li className="nav-item ml-2">{currentUser ? <Link className="nav-link" to={'/profile'}><i className="fa fa-user" aria-hidden="true"></i></Link> : <Link className="nav-link" to={'/login'}><i className="fa fa-sign-in" aria-hidden="true"></i></Link> }</li> 
        </ul>
      </div>
    </div>
  </nav>
  )
}
