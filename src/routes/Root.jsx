

import React from 'react';
import { Outlet } from 'react-router';
import CheckInternet from '../components/CheckInternet';
import Header from '../components/Header';
import DataContext from '../context/DataContext';
import '../styles/main.scss';

function Root() {
  return (
    <>
    <DataContext>
        <Header/>
        <CheckInternet>
          <Outlet/>
        </CheckInternet>
    </DataContext>
    </>
  )
}

export default Root
