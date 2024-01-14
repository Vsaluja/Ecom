// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAYomkBcYzXYNkmwwycNLCk-VudlVWYdDA",
    authDomain: "shoppe-ecom.firebaseapp.com",
    projectId: "shoppe-ecom",
    storageBucket: "shoppe-ecom.appspot.com",
    messagingSenderId: "662611662000",
    appId: "1:662611662000:web:64455cfa379cee4b2ad775",
    measurementId: "G-LP8EP3JWTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);