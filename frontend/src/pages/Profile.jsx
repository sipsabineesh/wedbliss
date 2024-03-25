import React from 'react'

export default function Profile() {
  return (
    <section className="about">
    <div className="container">
      <div className="section_title text-center">
        {/* <p>Main Info</p>
        <h3>About Me</h3> */}
      </div>
      <div className="row">
        <div className="col-md-6 profile-about-img">
          <div className="img-box image-fluid inner-shadow">
            <img src="images/contact_img.jpg" className="outer-shadow image-fluid" alt="Profile" />
            <div className="social_icon_tab">
              <div className="social_icon">
                <a href="#"><span><i className="fa fa-facebook"></i></span></a>
                <a href="#"><span><i className="fa fa-twitter"></i></span></a>
                <a href="#"><span><i className="fa fa-instagram"></i></span></a>
                <a href="#"><span><i className="fa fa-youtube-play"></i></span></a>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-about-info">
          <p>Hi, I'm.... Your soulmate is waiting for you.</p>
          <div>
            <a href="#" className="btns">Contact Details</a>
            <a href="#" className="btns">More Photos</a>
          </div>
        </div>
      </div>
      <div className="profile-details">
        <div className="profile-details-tabs">
          <div className="tab-items active" onClick={() => openTab('personal')} data-target=".personal_details">Personal Details</div>
          <div className="tab-items" onClick={() => openTab('education')} data-target=".education">Education</div>
          <div className="tab-items" onClick={() => openTab('profession')} data-target=".profession">Profession</div>
        </div>
        <div id="personal" className="personal personal-details-tab tab-content active">
          <div className="part_info">
            <div className="row">
              <div className="col-md-3 info-block">
                <h5>Name:</h5><h5>xxxx</h5>
              </div>
              <div className="col-md-3 info-block">
                <h5>Age:</h5><h5>xxxx</h5>
              </div>
              <div className="col-md-3 info-block">
                <h5>Height:</h5><h5>xxxx</h5>
              </div>
              <div className="col-md-3 info-block">
                <h5>Weight:</h5><h5>xxxx</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 info-block">
                <h5>Native Place:</h5><h5>xxxx</h5>
              </div>
              <div className="col-md-3 info-block">
                <h5>Country Living In:</h5><h5>xxxx</h5>
              </div>
              <div className="col-md-3 info-block">
                <h5>Mother Tongue:</h5><h5>xxxx</h5>
              </div>
              <div className="col-md-3 info-block">
                <h5>Hobbies:</h5><h5>xxxx</h5>
              </div>
            </div>
          </div>
        </div>
        <div id="education" className="education education-details-tab tab-content">
          <div className="part_info">
            <div className="row">
              <div className="col-md-3 info-block">
                <h5>Qualification:</h5><h5>xxxx</h5>
              </div>
              <div className="col-md-3 info-block">
                <h5>College:</h5><h5>xxxx</h5>
              </div>
              <div className="col-md-3 info-block">
                <h5>University:</h5><h5>xxxx</h5>
              </div>
              <div className="col-md-3 info-block">
                <h5>Place:</h5><h5>xxxx</h5>
              </div>
            </div>
          </div>
        </div>
        <div id="profession" className="profession profession-details-tab tab-content">
          <div className="part_info">
            <div className="row">
              <div className="col-md-3 info-block">
                <h5>Designation:</h5><h5>xxxx</h5>
              </div>
              <div className="col-md-3 info-block">
                <h5>Experience:</h5><h5>xxxx</h5>
              </div>
              <div className="col-md-3 info-block">
                <h5>Company Name:</h5><h5>xxxx</h5>
              </div>
              <div className="col-md-3 info-block">
                <h5>Place:</h5><h5>xxxx</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  )
}


