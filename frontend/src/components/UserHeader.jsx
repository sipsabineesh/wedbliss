
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
//     <nav className="header navbar navbar-expand-lg navbar-dark fixed-top">
//       <div className="container">
//       <div style={{ width: '50px', height: '39px' ,marginBottom:'59px', borderStyle:'1px solid #fff'}}>
//       <Link className='' to={'/'}><a className="navbar-brand"><img src="http://res.cloudinary.com/dcsdqiiwr/image/upload/v1713969131/nstigastexr3ltx6vafc.png"
//        style={{ width: '50px', height: '32px' ,marginBottom:'59px', borderStyle:'1px solid #fff'}} alt="logo" /></a></Link>
//       </div>
     
//      <button className="navbar-toggler" type="button" onClick={toggleMenu}>
//         <span className="fa fa-bars"></span>
//       </button>
//       <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
//         <ul className="navbar-nav ml-auto">
//           <li className="nav-item ml-2"><Link className='nav-link' to={'/'}>Home</Link></li>
//           <li className="nav-item ml-2"><Link className='nav-link' to={'/suggestions'}>Suggestions</Link></li>
//           <li className="nav-item ml-2"><Link className='nav-link' to={'/acceptedList'}>Accepted Interests</Link></li>
//           <li className="nav-item ml-2"><Link className='nav-link' to={'/plans'}>Packages</Link></li>
//           <li className="nav-item ml-2"><Link className='nav-link' to={'/profile'}>Search</Link></li>
//           {/* <li className="nav-item ml-2">{currentUser ?<div className="nav-item ml-2"> <Link className="nav-link" to={'/profile'}><i className="fa fa-user" aria-hidden="true"></i></Link> <Link className="nav-link" to={'/profile'}><i className="fa fa-sign-out" aria-hidden="true"></i></Link></div> : <Link className="nav-link" to={'/login'}><i className="fa fa-sign-in" aria-hidden="true"></i></Link> }</li>  */}
//           {currentUser ? (
//                                 <div className="nav-item ml-2 d-flex">
                                  
//                                   <li className="nav-item ml-2">    <Link className="nav-link" to={'/suggestions'} >
//                                         Suggestions
//                                     </Link> </li>
//                                     <li className="nav-item ml-2"> <Link className="nav-link" to={'/acceptedList'}>
//                                         Accepted Interests
//                                     </Link></li>
//                                     {!currentUser.isSubscribed && ( 
//                                     <li className="nav-item ml-2"><Link className="nav-link" to={'/plans'}>
//                                         Packages
//                                     </Link></li>
//                                 )}
//                                      <li className="nav-item ml-2"><Link className="nav-link" to={'/profile'}>
//                                         <i className="fa fa-user mr-2"></i>
//                                     </Link></li>
//                                     <li className="nav-item ml-2"><Link className="nav-link" onClick={handleLogout}>
//                                         <i  className="fa fa-sign-out"></i>Logout
//                                     </Link></li>

//                                     <div>
//                     <p className="mb-1 h5"><Link to='/suggestions'>{}</Link></p>
//                     <p className="small text-muted mb-0"><Link className="text-black remove-link"></Link></p>
//                  </div>
//                                 </div>
//                             ) : (
//                                 <Link className="nav-link" to={'/login'}>
//                                     <i className="fa fa-sign-in" aria-hidden="true"></i>Login
//                                 </Link>
//                             )}
//         </ul>
//       </div>
//     </div>
//   </nav>
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
