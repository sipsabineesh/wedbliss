import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom"

const Home = () => {
    const [user,setUser] = useState({})
    useEffect(() => {
        const handleScroll = () => {
          const scroll = window.scrollY;
          const navbar = document.querySelector(".navbar");
          if (scroll >= 10) {
            navbar.classList.add("nav-scroll");
          } else {
            navbar.classList.remove("nav-scroll");
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        // Cleanup function to remove the event listener when component unmounts
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    return (
        <>
          <section id="home" className="banner cover-bg">
            <div className="container h-100">
              <div className="row align-items-center h-100">
                <div className="col-12 caption text-center">
                  <div className="button col-lg-6 col-md-6 col-sm-12">
                   <Link to="/signup" className="btn">Signup</Link>
                   <Link to="/login" className="btn">Login</Link>
                  </div>
                  {/* <div className="social_icon text-center mt-4">
                    <a href="#"><span><i className="fa fa-facebook"></i></span></a>
                    <a href="#"><span><i className="fa fa-twitter"></i></span></a>
                    <a href="#"><span><i className="fa fa-instagram"></i></span></a>
                    <a href="#"><span><i className="fa fa-youtube-play"></i></span></a>
                  </div> */}
                </div>
              </div>
            </div>
          </section>
          <section id="about" className="about section_padding pb-0">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-12 section_title text-center">
                  <p>Who We Are</p>
                  <h3>About Us</h3>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="part_photo">
                    <img className="img-fluid pb-100 about-pic" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="part_text">
                    <h4 className="mb-30">Your soulmate is waiting for you</h4>
                    <p className="pb-35">Welcome to the most trusted Matrimonial site in South India.</p>
                    <a href="#" className="btns mr-2">Subscribe</a>
                    <a href="#" className="btns">Get your Soulmate</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="showContact section_padding text-center cover-bg">
            <div className="container">
              <h2>If you are interested</h2>
              <a href="#" className="btns mt-20">More Details</a>
            </div>
          </section>
          <section id="package" className="package section_padding">
            <div className="container">
              <div className="row">
                <div className="section_title text-center">
                  <p>What We Do</p>
                  <h3>Packages</h3>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 py-15">
                  <div className="package_box box">
                    <div className="icon">
                      <i className="fa fa-star-half-o"></i>
                    </div>
                    <div className="text">
                      <h4 className="box_title mb-20">1 Month Package</h4>
                      <p>hvjyftydtestfghghyty</p>
                    </div>
                  </div>
                </div>
                {/* More package boxes */}
              </div>
            </div>
          </section>
          <section id="contact" className="contact section_padding cover-bg">
            <div className="container">
                <div className="row">
                    <div className="section_title text-center">
                        <p>Get In Touch</p>
                        <h3>Contact</h3>
                    </div>
                    <div className="col-md-12">
                        <div className="part_info">
                            <div className="row">
                                <div className="col-md-4 xs-md-30">
                                    <div className="info-block text-center">
                                        <div className="icon">
                                            <i className="fa fa-map-marker"></i>
                                        </div>
                                        <h5>Location</h5>
                                        <p>India</p>
                                    </div>
                                </div>
                                <div className="col-md-4 xs-md-30">
                                    <div className="info-block text-center">
                                        <div className="icon">
                                            <i className="fa fa-mobile"></i>
                                        </div>
                                        <h5>Phone</h5>
                                        <p>987654321</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="info-block text-center">
                                        <div className="icon">
                                            <i className="fa fa-envelope"></i>
                                        </div>
                                        <h5>Email Address</h5>
                                        <p>info@wedbliss.online</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="contact-form">
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" name="name" placeholder="Name" required />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="email" name="email" placeholder="Email" required />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="text" name="subject" placeholder="Subject" required />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <textarea placeholder="Type Your Message" required></textarea>
                                    </div>
                                    <div className="col-md-12">
                                        <button type="submit" className="btns">Send Message</button>
                                    </div>
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
  
  export default Home