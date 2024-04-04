import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';

function ForgotPassword() {

    const {forgotPassword , showNotification} = useDataContext();
    const [loading,setLoading] =  useState(false);

    const handelForgotPass = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let {userName :email} = Object.fromEntries(formData.entries());
        if(!email) {
            showNotification(false,'please text your email');
            return;
        }
        try{
            setLoading((prev) => !prev);
            await forgotPassword(email);
            showNotification(true,'check your email to get new password');
        }catch(error){
            showNotification(false,'this email is not found');
        }
        setLoading((prev) => !prev);
    }
    

  return (
    <div className='login mainSection'>
        <div  className='container'>
            <div className='row align-items-center justify-content-center column-gap row-gap'>
                <div className='login__content login__form'>
                    <h4 className='login__form--title'>Welcome Back!</h4>
                    <p>Rest password continue</p>
                    <form onSubmit={handelForgotPass}>
                        <label>
                            <span>user email</span>
                            <input 
                              type='email' 
                              placeholder='text userName..'
                              name='userName'
                            />
                        </label>
                        <button className='btn' disabled={loading}>Rest password</button>
                    </form>

                    <div><Link to='/login' className='authLink'> Login</Link></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword