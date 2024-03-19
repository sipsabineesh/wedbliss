import React from 'react'

export default function Login() {
  return (
    <>
    <section className="login">
    <div className="form-container">
      <h1>Login</h1>
      <form action="login.html">
        <div className="control">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
        </div>
        <div className="control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        <p className="link">
          <input type="checkbox" /> Remember Me
        </p>
        <div className="control">
          <input type="submit" className="buttons" value="Login" />
        </div>
      </form>
      <p className="link">
        <a href="#">Forgot Password</a>
      </p>
    </div>
  </section>
  </>
  )
}
