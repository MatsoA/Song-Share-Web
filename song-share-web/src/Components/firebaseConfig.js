// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
    apiKey: "AIzaSyA9B2s4xJT_9kaPCuZzeHjpxY3l3TTMsug",
    authDomain: "song-share-30bef.firebaseapp.com",
    projectId: "song-share-30bef",
    storageBucket: "song-share-30bef.appspot.com",
    messagingSenderId: "395459585745",
    appId: "1:395459585745:web:33faedb731a1eb85fa87f0",
    measurementId: "G-6RCP20YF8G"
  };
  
// Return app and provider objects for use in other components
export const firebaseApp = initializeApp(firebaseConfig);
export const authProvider = new GoogleAuthProvider() //used for signin