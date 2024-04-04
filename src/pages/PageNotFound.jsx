

import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom';

import errorImg from '../assets/042.png';

function PageNotFound() {

    const error = useRouteError();
    const navigate = useNavigate();
    function goBack() {
        navigate('/',{replace : true});
    }

    return (
        <div className='error'>
            <div className='container'>
                <div className='row justify-content-between align-items-center'>
                    <div className='error__info'>
                        <h1 className='error__info--heading'>
                            Oops
                        </h1>
                        <p className='error__info--des'>
                            {error.message || error.statusText}
                            <h2>wrong!</h2>
                        </p>
                        <button className='error__info--btn' onClick={goBack}>
                            back to home page
                        </button>
                    </div>
                    <div className='error__img'>
                            <img src={errorImg} alt='this page is not found'/> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
