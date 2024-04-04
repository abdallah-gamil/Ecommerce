
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';

import ProductBtnControl, { DeleteProduct } from './ProductBtnControl'

function NavDropMenu() {

  const {productsData} = useDataContext();
  const navigate = useNavigate();

  
  return (
    <div className='header__navBar--products'>
    <div className='wrapper'>
        
        {
          (productsData.cardList?.length > 0) ? (
            productsData.cardList?.map((item)=>(
                <div className='item' key={item.id}>
                    <img src={item.thumbnail} alt={item.title}/>
                    <div className='item__info'>
                        <p>{item.title}</p>
                        <span>${(item.price - (item.price * (Math.round(item.discountPercentage)/100))).toFixed(2)}</span>
                        {/* <ProductBtnControl productID={item.id}/> */}
                        <DeleteProduct  productID={item.id}/>
                    </div>
                </div>
            ))
          ) : <p style={{textAlign : "center"}}>No Data To Display</p>
        }
        
        <button onClick={()=> navigate('orders_list')} className='viewBtn'>view card list</button>
    </div>
</div>
  )
}

export default NavDropMenu
