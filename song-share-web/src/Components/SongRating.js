import React from 'react';
import {Button, Popover, MenuList, MenuItem, TextField, Rating, Typography} from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview'
import { collection, doc, updateDoc, addDoc, setDoc, getDoc, getDocs, query, where ,} from "firebase/firestore"
import { useDocument } from 'react-firebase-hooks/firestore'
import { database } from "./firebaseConfig";
import SendIcon from '@mui/icons-material/Send';
/*
Review Button
sets sentSong review and rating fields in the database
need to implement setting receivedSong review and rating fields in the database
popover menu when button is clicked
may implement rating in separate cell on table when table is sortable
*/
export default function SongRating({viewOnly, songName, sentBy, userDetails, rating}) {
    
    // rating variable
    const [stars, setStars] = React.useState(rating);

    //creating the sentToList ID
    const sentToID = songName + userDetails.uid

    //creating the receivedSongID
    const receivedID = songName + sentBy

    const handleSendReview = () => {

        (async function () {
            await updateDoc(doc(database, "userList", sentBy, "sentSongs", sentToID), {
                rating:stars
            })
        })();

        (async function () {
            await updateDoc(doc(database, "userList", userDetails.uid, "receivedSongs", receivedID), {
                rating:stars
            })
        })();
    }

    React.useEffect(() => {
        handleSendReview();
        console.log(stars);
    }, [stars])

if(viewOnly){
    return(
<div>
    <Rating name='read-only'
        value = {stars}
        readOnly/>
</div>
    )
}
else {

return (
    <div>
            <Rating name="simple-controlled"
                value={stars}
                onChange={(event, newValue) => {
                    setStars(newValue);
                }}
                />          
    </div>
)
            }
}