import { async } from '@firebase/util';
import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import loginImg from '../assets/Signin-pana.png';
import { useDataContext } from '../context/DataContext';

function Login() {

  const {login , showNotification , loginWithGoogle} = useDataContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading,setLoading] = useState(false)
  let redirect = location.state?.path || '/';
  const [user, setUser] = useState({
    userName : '',
    password : ''
  });

  function handelUserInputs(e){
    let {name , value} = e.target;
    setUser({...user,[name] : value});
  }

  // add new user
 async function handelUser(e){
      e.preventDefault();
      const areFalsy = Object.values(user).every(value => value);
      if(!areFalsy) {
          showNotification(false,'please fill your data');
          return;
      };
      try{
        setLoading((prev) => !prev);
        let response =  await login(user);
        localStorage.setItem('userToken',response.user.accessToken);
        navigate(redirect , {replace : true});
      }catch(error){
        showNotification(false,'error in email or password')
      }
      setLoading((prev) => !prev);
  }


  async function googleLogin(){
    setLoading((prev) => !prev);
      try{
        let response =  await loginWithGoogle();
        localStorage.setItem('userToken',response.user.accessToken);
        navigate(redirect , {replace : true});
      }catch(error){
        showNotification(false,'Error in googleLogin Email')
      }
      setLoading((prev) => !prev);
  }
  

  return (
    <div className='login mainSection'>
        <div  className='container'>
            <div className='row align-items-center justify-content-between column-gap row-gap'>
            <div className='login__content login__form'>
                    <h4 className='login__form--title'>Welcome Back!</h4>
                    <p>Login continue</p>
                    <GoogleButton onClick={googleLogin} type="light" disabled={loading} style={{width:"100%",marginTop: "15px"}}/>
                    <form onSubmit={handelUser}>
                        <label>
                            <span>user email</span>
                            <input 
                              type='email' 
                              placeholder='text email..'
                              name='userName'
                              value={user.userName}
                              onChange={handelUserInputs}
                            />
                        </label>
                        <label>
                            <span>password</span>
                            <input 
                              type='password' 
                              placeholder='text password..'
                              name='password'
                              value={user.password}
                              onChange={handelUserInputs}
                            />
                        </label>
                        <button className='btn' disabled={loading}>Login</button>
                    </form>
                    <div><Link to='/forgot-password' className='authLink'> Forgot Password?</Link></div>
                    <div>need an account? <Link to='/signup' className='authLink'> Signup</Link></div>
                </div>
                <div className='login__content login__img'>
                    <img src={loginImg} alt='login'/>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Login
