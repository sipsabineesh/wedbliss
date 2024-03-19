import React from 'react'

export default function Footer() {
  return (
    <footer className="footer text-center">
        <div className="container">
          <div className="logo">
            <a className="custom_logo" href="#"><span>WedBliss</span></a>
          </div>
          <div className="social_icon text-center">
            <a href="#"><span><i className="fa fa-facebook"></i></span></a>
            <a href="#"><span><i className="fa fa-twitter"></i></span></a>
            <a href="#"><span><i className="fa fa-linkedin"></i></span></a>
            <a href="#"><span><i className="fa fa-instagram"></i></span></a>
          </div>
          <div className="copy">
            <h6>&copy; year Designed by 63 Creations</h6>
          </div>
        </div>
      </footer>
  )
}
