
import React from 'react'
import { Link } from 'react-router-dom';
import { useDataContext } from '../context/DataContext'

function Profile() {
    const {user} = useDataContext();
    return (
        <div className='mainSection profile'>
            <div className='container'>
                <h1>
                    Profile Email : <p>{user&& user.email}</p>
                    <Link className='btn' to='/update-profile'>Update Profile</Link>
                </h1>
            </div>
        </div>
    )
}

export default Profile
