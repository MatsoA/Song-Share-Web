import {Button} from '@mui/material'
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { firebaseApp, authProvider } from "./firebaseConfig";
import { useState, useEffect } from "react";
import { redirect, useNavigate} from "react-router-dom"




export default function SigninPage({userDetails, setUserDetails}) {
    

    //needed for signInWithPopup
    const auth = getAuth();

    const navigate = useNavigate();

    //wrapper for popup
    const signinUser = async () => {
        //trigger popup
        signInWithPopup(auth, authProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                console.log(user);
                console.log(setUserDetails)
                
                //after popup is completed, update values of userDetails 
                setUserDetails({
                    userName: user.displayName,
                    email: user.email,
                    profilePicture: user.photoURL,
                    uid: user.uid
                });

                console.log(userDetails)

                navigate('/app')
                
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }


    return (
        <Button variant="contained" onClick={() => {
            signinUser(userDetails, setUserDetails)
        }}> Sign In </Button>
    )
}