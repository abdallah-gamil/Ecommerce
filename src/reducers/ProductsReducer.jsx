

import { ACTION_TYPES } from "./ActionTypes";

export const INITIAL_STATE = {
    allProducts : [],
    allCategory : [],
    cardList : JSON.parse(localStorage.getItem('cardList')) || [],
    productDetails : {},
    relatedProducts : [],
    finalTotal : 0,
}

export const productReducer = (state,action) => {
    switch(action.type){
        case ACTION_TYPES.ALL_PRODUCTS 
            : return {
                ...state ,
                allProducts : [...action.payload]
            };
        case ACTION_TYPES.ALL_CATEGORY 
        : return {
            ...state ,
            allCategory : [...action.payload]
        };
        case ACTION_TYPES.ADD_CARD_LIST
        : return {
            ...state ,
            cardList : [...state.cardList , action.payload]
        };
        case ACTION_TYPES.REMOVE_CARD_LIST
        : return {
            ...state ,
            cardList : [...state.cardList.filter((item) => {
                return item.id !== action.payload;
            })]
        };
        case ACTION_TYPES.INCREASE_ITEM
        : return {
            ...state ,
            cardList : [...state.cardList.map((item) => 
                item.id === action.payload 
                ? {...item,quantity:item.quantity + (item.quantity < item.stock ? 1 : 0 )} 
                : item
            )]
        };
        case ACTION_TYPES.DECREASE_ITEM
        : return {
            ...state ,
            // old solve
            // cardList : [...state.cardList.map((item) => 
            //     item.id !== action.payload 
            //     ? item 
            //     : item.quantity > 1  
            //     ? {...item,quantity:item.quantity-1} 
            //     : item 
            // )]
            //new solve
            cardList : [...state.cardList.map((item) => 
                item.id === action.payload 
                ? {...item,quantity: item.quantity - (item.quantity > 1 ? 1 : 0) } 
                : item 
            )]
        };
        case ACTION_TYPES.PRODUCT_DETAILS
        : return {
            ...state ,
            productDetails : {...action.payload}
        };
        case ACTION_TYPES.RELATED_PRODUCTS
        : return {
            ...state ,
            relatedProducts : [...action.payload],
        };
        case ACTION_TYPES.CLEAR_CART_LIST
        : return {
            ...state ,
            cardList : action.payload,
        };
        default : 
            return state;
    }
}
