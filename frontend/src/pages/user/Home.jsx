
import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Plans from './Plans';
import Suggestions from './Suggestions';
import { useGetUserQuery } from '../../redux/user/userApiSlice';
import { Carousel } from 'react-bootstrap';
import { setPreference,logout } from '../../redux/user/userSlice';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';

export default function Home() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true); 
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setPreference(formData));
        navigate('/signup');
    };
    const handleLogout = async () => {
        try {
          const res = await fetch('/api/auth/logout', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          dispatch(logout());
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        async function fetchSubscriptionStatus() {
            try {
                const response = await fetch(`/api/user/getUser/${currentUser._id}`);
                if (response.status === 401) {
                  // User is blocked 
                  toast.error("Your account has been blocked by the admin");
                //   toast.error(data.message); 
                handleLogout()
                  navigate('/login'); 
                  return;
              }
              
                const data = await response.json();
                setUser(data.user);
            } catch (error) {
                console.error('Error fetching subscription status:', error);
            } finally {
                setLoading(false); 
            }
        }

        if (currentUser) {
            fetchSubscriptionStatus();
        } else {
            setLoading(false); 
        }
    }, []);

    if (loading) {
        return (
            <>
                <Header />
                <div className="vh-100 content d-flex align-items-center justify-content-center">
                    <div className="text-center">
                        <p className="text-black">Loading...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            {/* <Sidebar/> */}
            {currentUser ? (
                user.isSubscribed ? (
                    <Suggestions />
                ) : (
                    <Plans />
                )
            ) : (
                <div>
                    <section id="home" className="home-banner banner signup contact section_padding cover-bg">
                        <div className="container">
                            <div className="row">
                                <div className="section_title text-center">
                                    <p></p>
                                    <h3></h3>
                                </div>

                                <div className="col-md-12" id="home-title">
                                    <h3 className="text-white">Creating bonds that last a lifetime</h3>
                                    <div className="">
                                        <form onSubmit={handleSubmit} className="signup-form">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label className="text-white">Gender</label>
                                                        <div className="select-box">
                                                            <select id="gender" style={{ width: "100%" }} onChange={handleChange}>
                                                                <option disabled selected hidden>Gender</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label className="text-white">Age Range</label>
                                                        <div className="row">
                                                            <div className="col">
                                                                <input type="number" id="ageFrom" style={{ width: "100%" }} placeholder="From" onChange={handleChange} />
                                                            </div>
                                                            <div className="col">
                                                                <input type="number" id="ageTo" style={{ width: "100%" }} placeholder="To" onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label className="text-white">Religion</label>
                                                        <div className="select-box">
                                                            <select id="religion" style={{ width: "100%" }} onChange={handleChange}>
                                                                <option disabled selected hidden>Religion</option>
                                                                <option value="hindu">Hindu</option>
                                                                <option value="christian">Christian</option>
                                                                <option value="muslim">Muslim</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label className="text-white">Mother Tongue</label>
                                                        <input type="text" id="motherTongue" style={{ width: "100%" }} placeholder="Mother Tongue" onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <button type="submit" className="btns">Let's Begin</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="package" className="package section_padding">
                        <div className="container">
                            <div className="row">
                                <div className="section_title text-center">
                                    <p></p>
                                    <h3>Features</h3>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 py-15">
                                    <div className="package_box box">
                                        <div className="icon">
                                            <i className="fa fa-check-circle" aria-hidden="true"></i>
                                        </div>
                                        <div className="text">
                                            <h4 className="box_title mb-20">Verified Profiles</h4>
                                            <p>hvjyftydtestfghghyty</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 py-15">
                                    <div className="package_box box">
                                        <div className="icon">
                                            <i className="fa fa-shield" aria-hidden="true"></i>
                                        </div>
                                        <div className="text">
                                            <h4 className="box_title mb-20">Enhanced Privacy Settings</h4>
                                            <p>hvjyftydtestfghghyty</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 py-15">
                                    <div className="package_box box">
                                        <div className="icon">
                                            <i className="fa fa-handshake-o" aria-hidden="true"></i>
                                        </div>
                                        <div className="text">
                                            <h4 className="box_title mb-20">Trustworthy</h4>
                                            <p>hvjyftydtestfghghyty</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

             {/* <Footer /> */}
        </>
    );
}
