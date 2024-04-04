

import React , {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';

function UpdateProfile() {
    const {user , showNotification , updateUserPassword , updateUserEmail} = useDataContext();
    const [loading,setLoading] =  useState(false);
    const navigate = useNavigate();

    function updateProfile(e){
        e.preventDefault();
        setLoading((prev) => !prev);
        const formData = new FormData(e.target);
        let {password,userName:email,confirm_password} = Object.fromEntries(formData.entries())
        if(password !== confirm_password) {
            showNotification(false,"password don't matched");
            return ;
        }
        let promises = [];
        if(email !== user.email){
            promises.push(updateUserEmail(email));
        }
        if(password){
            if(password.length < 6 ) {
                showNotification(false,"password must be more than 6 letter")
                return ;
            };
            promises.push(updateUserPassword(password));
        }
        Promise.all(promises).then(() => {
            showNotification(true,'Updated Successfully');
            navigate('/profile',{replace:true});
        }).catch((e) => {
            console.log(e.message);
            showNotification(false,'error in update');
        }).finally(() => {
            setLoading((prev) => !prev);
        });
    }

   
    return (
        <div className='login mainSection'>
            <div  className='container'>
                <div className='row align-items-center justify-content-center column-gap row-gap'>
                    <div className='login__content login__form'>
                        <h4 className='login__form--title'>Welcome Back!</h4>
                        <p>Update Profile Continue</p>
                        <form onSubmit={updateProfile}>
                        <label>
                            <span>user email</span>
                            <input 
                              type='email' 
                              placeholder='text userName..'
                              name='userName'
                              defaultValue={user?.email}
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
                        <button className='btn' disabled={loading}>Update Now</button>
                    </form>
    
                        <div><Link to='/profile' className='authLink'> cancel</Link></div>
                    </div>
                </div>
            </div>
        </div>
      )
}

export default UpdateProfile;





    


