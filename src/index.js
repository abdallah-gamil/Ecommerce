import React from 'react';
import ReactDOM from 'react-dom/client';
import {  createHashRouter, RouterProvider } from "react-router-dom";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import Checkout from './pages/Checkout';
import Details from './pages/Details';
import Home from './pages/Home';
import OrdersList from './pages/OrdersList';
import Root from './routes/Root';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import { RequireProfileAuth, RequireUerAuth, RequireUerLoginAuth } from './auth/RequireAuth';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';

const router = createHashRouter([
    {
      path: "/",
      element: <Root />,
      errorElement : <PageNotFound/>,
      children : [
        {
            index : true ,
            element : <Home/>
        },
        {
            path : 'details/:product_Id',
            element : <Details/>,
            loader : ({params}) => {
              if(isNaN(params.product_Id)) {
                throw new Response("Bade Request",{status : 400, statusText : "this product id is not found"})
              }
              return null;
            },
        },
        {
          path : 'orders_list',
          element : <OrdersList/>,
          children : [
            {
              path : "checkout",
              element :  <Checkout/> ,
            },
          ]
        },
        {
          path : 'login',
          element :
          <RequireUerLoginAuth>
               <Login/>
          </RequireUerLoginAuth>
        },
        {
          path : 'profile',
          element :
          <RequireProfileAuth>
              <Profile/>
          </RequireProfileAuth>
        },
        {
          path : 'signup',
          element :
          <RequireUerAuth>
                <Signup/>
          </RequireUerAuth>
        },
        {
          path : 'forgot-password',
          element :<RequireUerLoginAuth>
              <ForgotPassword/>
          </RequireUerLoginAuth>
        },
        {
          path : 'update-profile',
          element :
          <RequireProfileAuth>
              <UpdateProfile/> 
          </RequireProfileAuth>
        },
      ]
    },
    
],{
  
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <RouterProvider router={router}/>
);


serviceWorkerRegistration.register();