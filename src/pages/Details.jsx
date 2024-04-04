

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_API } from '../api/Api';
import CartDesign from '../components/CartDesign';
import ProductBtnControl from '../components/ProductBtnControl';
import { useDataContext } from '../context/DataContext';
import useDiscount from '../hooks/useDiscount';
import { ACTION_TYPES } from '../reducers/ActionTypes';

function Details() {

  
  

  const {productsData,dispatch , addToCard} = useDataContext();
  let {product_Id} = useParams();
  const navigate = useNavigate();
  let [productCategory,setProductCategory] =  useState('');
  let [mainImg,setMainImg] =  useState('');

  // load single product data from the base api
  useEffect(() => {
    axios.get(`${BASE_API}/${product_Id}`)
    .then((res) => {
      dispatch({type : ACTION_TYPES.PRODUCT_DETAILS , payload : res.data});
      setProductCategory(res.data.category);
      setMainImg(res.data.thumbnail);
    })
    .catch((error) => {
      console.error(error);
      if(error.response.status === 404) navigate('/');
    })
    return ()=> {
      dispatch({type : ACTION_TYPES.PRODUCT_DETAILS , payload : {}});
    }
  }, [product_Id])

  // load related data from the base api
  useEffect(() => {
      if(productCategory){
        axios.get(`${BASE_API}/category/${productCategory}`)
        .then((res) => {
          dispatch({type : ACTION_TYPES.RELATED_PRODUCTS , payload : res.data.products})
        })
        .catch((error) => {
          console.log(error);
        })
      }

      return ()=>{
        dispatch({type : ACTION_TYPES.RELATED_PRODUCTS , payload : []})
      }
  },[productCategory]);


  return (
        <section className='productDetails mainSection'> 
        <div className='container'>
            <button onClick={()=> navigate('/',{replace : true})} className='btn'>Go Back</button>
            <div className='row align-items-center justify-content-between row-gap'>
              <div className='productDetails__img box'>
                  <div className='productDetails__img--images'>
                        {
                          productsData.productDetails.images?.map((src , index)=> {
                              return(
                                <img src={src} onClick={()=> setMainImg(src)} key={index} alt={productsData.productDetails.title} />
                              )
                          })
                        }
                  </div>
                  <div className='productDetails__img--mainImg'>
                      <img src={mainImg} alt={productsData.productDetails.title}/>
                  </div>
              </div>
              <div className='productDetails__info box'>
                    <h2 className='productDetails__info--title'>{productsData.productDetails.title}</h2>
                    <p className='productDetails__info--oldPrice'>${productsData.productDetails.price}</p>
                    <p className='productDetails__info--newPrice'>${useDiscount(productsData.productDetails.price,productsData.productDetails.discountPercentage)}</p>
                    <p className='productDetails__info--dsc'>{productsData.productDetails.description}</p>
                    <p className='productDetails__info--brand'>Brand : <span>{productsData.productDetails.brand}</span></p>
                    <p className='productDetails__info--brand'>Available : <span>{productsData.productDetails.stock > 0 ? 'in Stock' : 'not Available'}</span></p>
                    
                    {/* condition to display increase and decrease btn => if the product actual added to cart list */}
                    {
                      (productsData.cardList.find((item)=> item.id === productsData.productDetails.id))
                      && <ProductBtnControl productID={productsData.productDetails.id}/>
                    }

                    <button className='btn'  onClick={()=> addToCard(productsData.productDetails)}>Buy now</button>
              </div>
            </div>
            <h2 className='title'>Related Products</h2>
            <div className='row align-items-center justify-content-between row-gap'>
                  {
                    (productsData.relatedProducts?.length > 0 ) &&(
                      productsData.relatedProducts?.map((product)=>(
                        <CartDesign product={product} key={product.id}/>
                      ))
                    )
                  }
            </div>
        </div>
      </section>
  )
}

export default Details
