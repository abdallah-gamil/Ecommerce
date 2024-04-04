

import React , {useEffect , useRef}from 'react';
import { useNavigate } from 'react-router';
import { useDataContext } from '../context/DataContext';
import useDiscount from '../hooks/useDiscount';
import { ACTION_TYPES } from '../reducers/ActionTypes';


function Checkout() {


    const navigate = useNavigate();

    const {productsData,dispatch} = useDataContext();

    const ref =  useRef();
  
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


    function renderPaypal() {
        let total = finalTotal();
        window.paypal.Buttons({
            // Sets up the transaction when a payment button is clicked
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: total // Can also reference a variable or function
                  }
                }]
              });
            },
            // Finalize the transaction after payer approval
            onApprove: (data, actions) => {
              return actions.order.capture().then(function(orderData) {
                // console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                const transaction = orderData.purchase_units[0].payments.captures[0];
                alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
                navigate(-1 , {replace : true});
                dispatch({type : ACTION_TYPES.CLEAR_CART_LIST , payload : []});
              });
            }
    
          }).render('#paypal-button-container');
    }


   useEffect(() => {
        ref.current.innerHTML = "";
        if(productsData.cardList.length > 0) renderPaypal();
   }, [productsData.cardList])  
   
  
  return (
    <div className='mainSection checkout' id='paypal-button-container' ref={ref} style={{textAlign:"center"}}>
        
    </div>
  )
}

export default Checkout;
