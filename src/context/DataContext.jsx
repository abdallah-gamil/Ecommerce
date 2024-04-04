

import React, { createContext, useContext, useEffect, useReducer , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACTION_TYPES } from '../reducers/ActionTypes';
import { INITIAL_STATE, productReducer } from '../reducers/ProductsReducer';
import Swal from 'sweetalert2';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged ,
    signOut ,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,
    signInWithPopup,
    signInWithRedirect ,
} from 'firebase/auth';
import {auth , googleAuth} from '../firebase';

export const appContext = createContext();

function DataContext({children}) {

    const [data,dispatch] =  useReducer(productReducer, INITIAL_STATE);
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const navigate = useNavigate();

    function addToCard(item) {
        if(!user) {
            showNotification(true,'you have to login first');
            navigate('/login');
            return;
        }
        let checkItem = data.cardList?.find((product) => {
            return product.id === item.id;
        });
        if(checkItem) {
            showNotification(false,'this product actually added');
            return;
        };
        dispatch({type : ACTION_TYPES.ADD_CARD_LIST , payload : {...item , quantity :1}})
    }

    function deleteProduct(ID){
        dispatch({type : ACTION_TYPES.REMOVE_CARD_LIST , payload : ID});
        data.cardList.length === 1 && navigate('/');
    }

    function login({userName:email ,password }){
        return signInWithEmailAndPassword(auth,email,password);
    }

    function loginWithGoogle(){
       return signInWithPopup(auth , googleAuth);
    }

    function signup(email,password){
       return createUserWithEmailAndPassword(auth,email,password);
    }

    function forgotPassword(email){
        return sendPasswordResetEmail(auth,email);
    }

    function updateUserEmail(email){
        return updateEmail(auth.currentUser,email);
    }
    function updateUserPassword(password){
        return updatePassword(auth.currentUser,password);
    }

    // add new user  
    useEffect(() => {
       const unSubscribe = onAuthStateChanged(auth,(user) => {
            setUser(user);
        });

        if(!user){
            localStorage.removeItem('userToken');
        }

        return () => {
            unSubscribe();
        }
        
    },[]);

    function logout(){
        // setUser(null);
       return signOut(auth);
    }

    function showNotification(status,statusText) {
        Swal.fire({
          position: 'top-center',
          icon: status ? 'success' : "error",
          title: statusText,
          showConfirmButton: false,
          timer: 2500
        })
    }

    // save cart list and user in localStorage
    useEffect(() => {
        if(navigator.onLine){
            localStorage.setItem('cardList',JSON.stringify(data.cardList));
            localStorage.setItem('user',JSON.stringify(user));
        }
    }, [data.cardList , user]);

    return (
        <appContext.Provider value={
            {
                productsData : data , 
                dispatch ,
                addToCard ,
                deleteProduct,
                user,
                login,
                logout,
                showNotification,
                signup,
                forgotPassword,
                updateUserEmail,
                updateUserPassword,
                loginWithGoogle
            }
        }>
            {children}
        </appContext.Provider>
    )
}



export const useDataContext = () => {
    return useContext(appContext);
}

export default DataContext;
