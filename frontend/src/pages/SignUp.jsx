import React from 'react'

export default function SignUp() {
  return (
    <>
    <section id="contact" className="signup contact section_padding cover-bg">
        <div className="container">
            <div className="row">
                <div className="section_title text-center">
                    <p>Register For Free</p>
                    <h3>Signup</h3>
                </div>

                <div className="col-md-12">
                    <div className="signup-form">
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
                                      
                          
                             
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="password" name="password" placeholder="Password" required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="password" name="re_password" placeholder="Re-Enter the Password" required />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button type="submit" className="btns">Register</button>
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
