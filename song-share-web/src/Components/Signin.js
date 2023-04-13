import {Button, Box, Typography, Grid} from '@mui/material';
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { firebaseApp, authProvider, database } from "./firebaseConfig";
import { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom"
import { collection, addDoc, getDocs } from "firebase/firestore"
import {useSignInWithGoogle} from "react-firebase-hooks/auth"
import Banner from './banner';
import gif from ''




export default function Signin({ userDetails, setUserDetails }) {

    //needed for signInWithPopup
    const auth = getAuth();
    
    const navigate = useNavigate();

    //send user to actual app once they've signed in
    //useEffect ensures userDetails is fully updated before switching
    useEffect(() => {
        if (userDetails.userName != "") {
            navigate('/nav')
        }
    }, [userDetails])

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
        
        <Box
        component="main"
        sx={{ mx: 'auto', width: 400, bgcolor: 'background.default' }}>
               
            <Typography variant = "h3" align = "center" color = "textPrimary" gutterBottom>
                        Welcome to Song Share
                    </Typography>
                    <Typography variant = "h6" align = "center" color = "textPrimary" gutterBottom>
                        Please sign in using your Google account
                    </Typography>
                    <Grid container spacing = {2} justifyContent = "center">
                    <Grid item>
        <Button variant="contained" onClick={() => {
            signinUser()
        }}> Sign In </Button>
        </Grid>
        </Grid>
        </Box>
    )
}