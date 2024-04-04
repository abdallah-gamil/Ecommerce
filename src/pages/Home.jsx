import React, {useEffect} from 'react';
import { useDataContext } from '../context/DataContext';
import axios from 'axios';
import { ACTION_TYPES } from '../reducers/ActionTypes';
import {BASE_API} from '../api/Api';
import  Pagination  from '../components/Pagination';
import HeroSection from '../components/HeroSection';

function Home() {

  const {productsData, dispatch} = useDataContext();

  //load products data from api
  useEffect(() => {
    axios.get(`${BASE_API}?limit=100`)
    .then((res) => {
      dispatch({type : ACTION_TYPES.ALL_PRODUCTS , payload : res.data.products});
    })
    .catch((error) => {
        console.error(error);
        // if(!navigator.onLine){
        //     console.log("your internet not connected")
        // }
    })
  }, []);

  return (
    <>
      <HeroSection/>
      <section className='mainSection'> 
          <div className='container'>
              <Pagination data={productsData.allProducts}/>
          </div>
      </section>
    </>
  )
}

export default Home
