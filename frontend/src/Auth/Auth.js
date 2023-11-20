import React, { useState } from 'react'
import './auth.css'
import SignUp from '../components/Auth/SignUp';
import LogIn from '../components/Auth/LogIn';
const Auth = () => {
  const [authToggle,setAuthToggle] = useState(false);
  return (
    <div className='auth_body'>
          <div className="wrapper">
      <div className="title-text">
        <div className="title login" >{!authToggle?'Login Form':'Signup Form'}</div>
        <div className="title signup" >Signup Form</div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login"  checked={authToggle===false} readOnly={true}/>
          <input type="radio" name="slide" id="signup" checked={authToggle===true} readOnly={true}/>
          <label htmlFor="login" className="slide login" onClick={()=>setAuthToggle(false)}>Login</label>
          <label htmlFor="signup" className="slide signup" onClick={()=>setAuthToggle(true)}>Signup</label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
        {authToggle?<SignUp setAuthToggle={setAuthToggle} />:<LogIn setAuthToggle={setAuthToggle}/>}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Auth