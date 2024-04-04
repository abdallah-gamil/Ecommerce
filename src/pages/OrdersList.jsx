
import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import ProductBtnControl, { DeleteProduct } from '../components/ProductBtnControl';
import { useDataContext } from '../context/DataContext';
import useDiscount from '../hooks/useDiscount';

function OrdersList() {
  const {productsData} = useDataContext();

  const navigate = useNavigate();

  function CalcDiscount(price,discount){
      let updatePrice = useDiscount(price,discount);
      return updatePrice;
  }

  function CalcSubTotal(quantity , price,discount){
      return (quantity * (CalcDiscount(price,discount))).toFixed(2);
  }

  function finalTotal() {
    let total =  productsData.cardList.reduce((acc,el)=> {
      let price = CalcSubTotal(el.quantity,el.price,el.discountPercentage);
      return (acc + Number(price));
    },0).toFixed(2);
      return total;
  }

  return (
    <div className='mainSection ordersPage'>
        <div className='container'>
            <h2 className='title'>SHOPPING CART</h2>
            <div className='wrapper'>
              <table className='ordersPage__ordersTable'>
                  <thead>
                      <tr>
                          <th>Product</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Count</th>
                          <th>SubTotal</th>
                          <th>Remove</th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                        productsData.cardList?.map((itemRow)=> {
                          return(
                            <tr key={itemRow.id}>
                                <td>
                                  <img src={itemRow.thumbnail} alt={itemRow.title}/>
                                </td>
                                <td>{itemRow.title}</td>
                                <td>${CalcDiscount(itemRow.price,itemRow.discountPercentage)}</td>
                                <td>
                                  <ProductBtnControl productID={itemRow.id}/>
                                </td>
                                <td>$
                                  {CalcSubTotal(itemRow.quantity ,itemRow.price,itemRow.discountPercentage)}</td>
                                <td>
                                  <DeleteProduct productID={itemRow.id}/>
                                </td>
                            </tr>
                          )
                        })
                    }
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>
                        CART TOTAL: 
                        {
                            productsData.cardList.length > 0 
                            ? finalTotal()
                            : ' your cart is empty'
                        }
                      </td>
                    </tr>
                    <tr>
                    <td>
                        {
                          productsData.cardList.length > 0 &&
                          <button className='btn' onClick={()=> navigate('checkout')}>checkout</button>
                        }
                      </td>
                    </tr>
                  </tfoot>
              </table>
            </div>
            {
              productsData.cardList.length === 0 
              && <img className='not_found' src='./cart.3fb2f85a27ef1e5245ad.png' alt='data table is not found'/>
            }
            {
                productsData.cardList.length > 0 &&
                <Outlet/>
            }
        </div>
    </div>
  )
}

export default OrdersList
