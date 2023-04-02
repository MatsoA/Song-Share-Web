import React from 'react';
import {Button, Popover, MenuList, MenuItem, TextField, Rating, Typography} from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview'
import { collection, doc, updateDoc, addDoc, setDoc, getDoc, getDocs, query, where ,} from "firebase/firestore"
import { useDocument } from 'react-firebase-hooks/firestore'
import { database } from "./firebaseConfig";
/*
Review Button
sets sentSong review and rating fields in the database
need to implement setting receivedSong review and rating fields in the database
popover menu when button is clicked
may implement rating in separate cell on table when table is sortable
*/
export default function Review({song, songName, sentBy, userDetails}) {
    
    //popup list
    const [anchor, setAnchor] = React.useState(null);
    const handleClick = (event) => {
        setAnchor(event.currentTarget)
    };
    
    const handleClose = () => {
        setAnchor(null);
    };
    
    const open = Boolean(anchor);
    const id = open ? 'simple-popover' : undefined;

    //review comments
    const [myReview, setMyReview] = React.useState("");

    //var holding my received song to grab the data for rating and comments
    //want to have the rating and comments pop up automatically if there is any data there
    /************************************************************************************************************** */
    const [mySong] = useDocument(doc(database, "userList", userDetails.uid, "receivedSongs", song));

    const handleReviewChange = (e) => {
        const val = e.target.value;
        setMyReview(val);
    };

    // rating variable
    const [stars, setStars] = React.useState(0);

    //creating the sentToList ID
    const sentToID = songName + userDetails.uid

    //creating the receivedSongID
    const receivedID = songName + sentBy

    const handleSendReview = () => {

        (async function () {
            await updateDoc(doc(database, "userList", sentBy, "sentSongs", sentToID), {
                rating:stars,
                review:myReview
            })
        })();

        (async function () {
            await updateDoc(doc(database, "userList", userDetails.uid, "receivedSongs", receivedID), {
                rating:stars,
                review:myReview
            })
        })();
    }

return (
    <div>
        <Button 
            aria-describedby={id}
            variant ="outlined" 
            endIcon = {<RateReviewIcon />}
            onClick={handleClick}
        >
        Review
        </Button>
    <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical:'bottom',
            horizontal: 'right'
        }}
        >
        <MenuList>
        <MenuItem>
            <Typography>
                Rating :
            </Typography>
            <Rating name="simple-controlled"
                value={stars}
                onChange={(event, newValue) => {
                    setStars(newValue);
                }}
                />
            </MenuItem>
            <MenuItem>
                <TextField id="standard-multiline-flexible"
                    value={myReview} 
                    label="Comments" 
                    multiline maxRows={4} 
                    variant="standard"
                    onChange={(e) => {
                        handleReviewChange(e)
                    }}
                />
            </MenuItem>
            <MenuItem>
                <Button onClick={handleSendReview}>Send</Button>
            </MenuItem>
        </MenuList>
    </Popover>

    </div>
)
}