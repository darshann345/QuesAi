import React from 'react';
import './Login.css';
import wLogo from './../assets/wLogo.png';
import Logo from './../assets/Logo.png'
import { CheckBox, Height, Widgets } from '@mui/icons-material';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const handleSubmit = (e) =>{
    e.preventDefault()
    setEmail('')
    setPassword('')
    navigate('/home')

  }
  return (
    <>
      <div className='container'>
        <div className='quespart1'>
          <div className='quesAitext'>
            <img src={wLogo} alt="quesAi Logo" />
            <h1 style={{ fontSize: "30px" }}><b>Ques.</b>AI</h1>
          </div>
          <div className='quesAi-Header-text'>
            <h2>
              Your PodCast </h2>
            <h2>will no longer</h2>
            <h2> be just a hoddy</h2>
            <p>Supercharge Your Distribution</p>
            <p>using our AI assitant</p>

          </div>


        </div>
        <div className='quespart2'>
          <img src={Logo} alt="Logo" style={{ marginLeft: "100px" }} />
          <h2 style={{ marginLeft: "70px", color: "purple" }}>Welcome To</h2>
          <h4 style={{ marginLeft: "100px", marginTop: "-10px", color: "lightdarkblue" }}>Ques.AI</h4>
          <br />
          <br />
          <form onSubmit = {handleSubmit}>
            <input
              type="text"
              placeholder='Email Address'
              sx={{ width: "500px" }}
              value={email}
              onChange={
                (e) => setEmail(e.target.value)
              }
            />
            <br />
            <input
              type="text"
              placeholder='Password'
              value={Password}
              onChange={
                (e) => setPassword(e.target.value)
              }
            />
            <br></br>
            <div style={{ display: "flex", flexDirection: "row", gap: "60px" }}>
              <h6>Remember Me</h6>
              <h6>Forgotton Password</h6>
            </div>

            <button type="submit" style={{ display: "flex", justifyContent: "center", width: "15.5vw", height: "30px", alignItems: "center", borderRadius: "4px", background: "darkblue", color: "white" }}>Login</button>

          </form>
        </div>
      </div>
    </>
  );
};

export default Login;