import Signout from './Signout';
import React from 'react';
import { useLocation } from 'react-router-dom'
import { collection, addDoc, getDocs } from "firebase/firestore"
import { database } from "./firebaseConfig";
import { Box, Divider, Checkbox, FormGroup, FormControlLabel, Typography } from '@mui/material';
import {SongFeedList} from './SongFeedList'
import Song from './Song'



export default function MainPage({ userDetails, setUserDetails }) {
    
    //handle change for sorting song list
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const [sentByMe, setSentByMe] = React.useState(true);

    const handleSentBy = (event) => {
        setSentByMe(event.target.checked);
    };


    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', pl: 30, pt: 5 }}>
            <Typography variant = 'h6'>
            Sort by: 
            </Typography>
            <FormGroup>
            <FormControlLabel
                label="Received Songs"
                control = {<Checkbox 
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{'aria-label': 'controlled'}}
                />}
            />
            <FormControlLabel
                label="Sent Songs"
                control = {<Checkbox 
                    checked={sentByMe}
                    onChange={handleSentBy}
                    inputProps={{'aria-label': 'controlled'}}
                />}
            />
            </FormGroup>
            <Divider />
            
            <SongFeedList userDetails = {userDetails}/>
            <Divider />
            <div>
                Username: {userDetails.userName} {"\n"}
                Email: {userDetails.email}
                <img style={{ width: 50, height: 50 }} src={userDetails.profilePicture} />
                <Signout userDetails={userDetails} setUserDetails={setUserDetails} />
            </div>
        </Box>
    );

} 