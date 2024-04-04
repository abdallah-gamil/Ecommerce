
import React from 'react';
import { Detector } from 'react-detect-offline';

import internetImg from '../assets/NoConnection-bro.svg';

function CheckInternet({children}) {
  return (
    <>
        <Detector
            render={({online})=> (
                online 
                ? children
                : <div className='internetConnected'>
                    <div className='container'>
                        <img src={internetImg} alt='your internet not connected'/>
                        <h className='internetConnected__title'>your internet not connected</h>
                    </div>
                  </div>
            )}
        />
    </>
  )
}

export default CheckInternet
