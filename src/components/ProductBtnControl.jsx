

import React from 'react';
import { useDataContext } from '../context/DataContext';
import { ACTION_TYPES } from '../reducers/ActionTypes';

function ProductBtnControl({productID}) {
  const {productsData, dispatch , showNotification} = useDataContext();

  
  function handelQuantityDecrease(){
    dispatch({type:ACTION_TYPES.DECREASE_ITEM , payload : productID});
  }

  function handelQuantityIncrease(){
      dispatch({type:ACTION_TYPES.INCREASE_ITEM , payload : productID});
      let {stock,quantity} = productsData.cardList?.find((el)=> {
          return el.id === productID ;
      });
      if(quantity >= stock){
        showNotification(false,'The store no longer contains a quantity greater than that');
      }
  }

  function getQuantity(){
    return productsData.cardList.find((item) => item.id === productID)?.quantity || 1;
  }

  return (
    <div className='BtnControls'>
        <button className='decrease' onClick={handelQuantityDecrease}>-</button>
        <span>{getQuantity()}</span>
        <button className='increase' onClick={handelQuantityIncrease}>+</button>
    </div>
  )
}


export const DeleteProduct = ({productID}) => {

  const {deleteProduct} = useDataContext();

  return(
      <>
          <span className='RemoveBtn' onClick={()=>deleteProduct(productID)}>+</span>
      </>
  )
};


export default ProductBtnControl;


// ProductBtnControl.DeleteProduct = ({productID}) => {

//     const {deleteProduct} = useDataContext();

//     return(
//         <>
//             <span className='RemoveBtn' onClick={()=>deleteProduct(productID)}>+</span>
//         </>
//     )
// };