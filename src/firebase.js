

import { initializeApp } from "firebase/app";
import { getAuth  , GoogleAuthProvider } from 'firebase/auth';

// config setting protect info in .env file
const firebaseConfig = {
    apiKey: "AIzaSyCartDsnBy8FpAgkpJxH0mkZdXGiFx16vQ",
    authDomain: "shopping-cart-7ae80.firebaseapp.com",
    projectId: process.env.REACT_FIREBASE_APP_PROJECT_ID,
    storageBucket: process.env.REACT_FIREBASE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_FIREBASE_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_FIREBASE_APP_APP_ID,
    measurementId: process.env.REACT_FIREBASE_APP_MEASUREMENT_ID
  };
// to initializeApp in firebase and send it config setting
const app = initializeApp(firebaseConfig);
// ues auth method from firebase
const auth = getAuth(app);

const googleAuth = new GoogleAuthProvider();


// export authentication to any component in your react app
export {auth,googleAuth};
