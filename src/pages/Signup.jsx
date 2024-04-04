
import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

import SignupImg from '../assets/Signup-pana.png';
import { useDataContext } from '../context/DataContext';

function Signup() {

    const {signup,showNotification} = useDataContext();
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

   async function handleSignup(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        let {password,userName,confirm_password} = Object.fromEntries(formData.entries())
        if(password !== confirm_password) {
            return showNotification(false,"password don't matched");
        }
        if(password.length < 6 ) return showNotification(false,"password must be more than 6 letter");
        try{
            setLoading((prev) => !prev);
            await signup(userName,password);
            showNotification(true,"success email created");
            navigate('/login');
        }catch(code) {
            showNotification(false,'This email has already been created');
        }
        setLoading((prev) => !prev);
    }

  return (
    <div className='login mainSection'>
        <div  className='container'>
            <div className='row align-items-center justify-content-between column-gap row-gap'>
            <div className='login__content login__form'>
                    <h4 className='login__form--title'>Welcome Back!</h4>
                    <p>Signup continue</p>
                    <form onSubmit={handleSignup}>
                        <label>
                            <span>user email</span>
                            <input 
                              type='email' 
                              placeholder='text userName..'
                              name='userName'
                            />
                        </label>
                        <label>
                            <span>password</span>
                            <input 
                              type='password' 
                              placeholder='text password..'
                              name='password'
                            />
                        </label>
                        <label>
                            <span>confirm password</span>
                            <input 
                              type='password' 
                              placeholder='confirm password..'
                              name='confirm_password'
                            />
                        </label>
                        <button className='btn' disabled={loading} >Signup</button>
                    </form>

                    <div>Already have an account? <Link to='/login' className='authLink'> Login</Link></div>
                </div>
                <div className='login__content login__img'>
                    <img src={SignupImg} alt='login'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup