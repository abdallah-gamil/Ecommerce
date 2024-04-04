

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';
import useDiscount from '../hooks/useDiscount';

function CartDesign({product}) {

  const {addToCard} = useDataContext();


  const navigate = useNavigate();

  return (
    <div className='cart__item'>
        <img src={product.thumbnail} alt={product.title}/>
        <div className='cart__item--info'>
            <h4>{product.title}</h4>
            <div className='row column-gap' style={{margin : '5px 0px'}}>
                <p className='old-price'>${product.price}</p>
                <p className='new-price'>${useDiscount(product.price,product.discountPercentage)}</p>
            </div>
            <p className='discountTag'>{Math.round(product.discountPercentage)}% off</p>
        </div>
        <button className='btn' onClick={()=> addToCard(product)}>Buy now</button>
        <button className='btn' onClick={()=> navigate(`/details/${product.id}`,{replace : true})}>Details</button>
    </div>
  )
}

export default CartDesign
