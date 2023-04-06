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
export default function Review({comments, viewOnly, songName, sentBy, userDetails}) {
    
    //review comments
    const [myReview, setMyReview] = React.useState();

    const handleReviewChange = (e) => {
        const val = e.target.value;
        setMyReview(val);
    };

    //creating the sentToList ID
    const sentToID = songName + userDetails.uid

    //creating the receivedSongID
    const receivedID = songName + sentBy

    const handleSendReview = () => {

        (async function () {
            await updateDoc(doc(database, "userList", sentBy, "sentSongs", sentToID), {
                review:myReview
            })
        })();

        (async function () {
            await updateDoc(doc(database, "userList", userDetails.uid, "receivedSongs", receivedID), {
                review:myReview
            })
        })();
    }

if(viewOnly){
    return (
        <div>
                    <TextField id="outlined-multiline-static"
                        disabled
                        value={myReview} 
                        multiline maxRows={4} 
                        defaultValue= {comments}
                        onChange={(e) => {
                            handleReviewChange(e)
                        }}
                    />
    
        </div>
    )
}
else{
    return (
        <div>
                    <TextField id="outlined-multiline-static"
                        value={myReview} 
                        multiline maxRows={4} 
                        defaultValue= {comments}
                        onChange={(e) => {
                            handleReviewChange(e)
                        }}
                    />
                    <Button endIcon={<SendIcon />} 
                    onClick={() => {
                        handleSendReview()
                    }}></Button>
    
        </div>
    )
}
}