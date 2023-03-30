import { useState, useEffect } from 'react';
import { collection, doc, addDoc, setDoc, getDoc, getDocs, query, where } from "firebase/firestore"
import { firebaseApp, authProvider, database } from "./firebaseConfig"
import { getAuth } from "firebase/auth"
import { Stack, TextField, Button, Box, Item, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles'
import Banner from './banner';
import PendingFriendList from './PendingFriendList'
import SendFriendList from './SendFriendsList'
import getKeys from '../keys'

/* Does not work due to google restricting their search suggestion api
function getSearchSuggestions(query){
    return fetch(`http://suggestqueries.google.com/complete/search`,
    {
        client: "youtube",
        ds: "yt",
        client: "firefox", //doesn't give json without this, for some reason
        q: query,
        origin: "localhost",
        Headers: JSON.stringify({
            "Content-Type": "application/json",
        }),
        Method: "GET"
    }).then(
        result => result[1] //list of suggestion strings
    )
}
*/

//This function returns a promise. Follow it with .then(), with a callback to run
//example: ytSearch("some string here").then(result => console.log(result))
function ytSearch(query, quantity){
    return getKeys().then(function(keys){
        return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=relevance&maxResults=5&q=${encodeURIComponent(query)}&key=${encodeURIComponent(keys.ytApiKey)}`, {
        Headers: JSON.stringify({
            "Content-Type": "application/json",
        }),
        Method: "GET"
    })}).then(
        function(response) { return response.json() }
    ).then(
        function(result){
            var output = [];
            for(let i = 0; i < result.items.length; i++){
                output[i] = {
                    "title": result.items[i].snippet.title, 
                    "url": "youtu.be/" + result.items[i].id.videoId,
                    "thumbnail": result.items[i].snippet.thumbnails.default.url
                };
            }
            return output;
        }
    ) //returns a list [{title, url, thumbnail}, ...]
}

export default function ManageFriendPage({ userDetails, setUserDetails }) {

    //hook for input field
    const [entry, setEntry] = useState("")

    // tracking for errors, used to trigger red box
    const [missingEntry, setMissingEntry] = useState(false);
    const [unfoundUsername, setUnfoundUsername] = useState(false);

    // used to update text field helper text
    const [requestStatus, setRequestStatus] = useState("");

    //start search for friend upon submission
    const handleSubmit = e => {

        e.preventDefault();

        //raise flag if no entry is typed
        if (entry.length === 0) {
            setMissingEntry(true);
        }

        if (entry.length !== 0) {
            //query for how to look for friend (via email)
            const friendSearch = query(collection(database, "userList"), where("email", "==", entry));


            //if valid entry, excecute query and look for friend
            (async function () {
                const querySnapshot = await getDocs(friendSearch);

                //if query is empty, flag will remain true
                setUnfoundUsername(true);
                setRequestStatus("Unable to find user for email");

                //send request to friend found
                querySnapshot.forEach((document) => {
                    setUnfoundUsername(false);

                    //TODO: only add as pending if not already active
                    console.log(document.data());

                    (async function () {
                        const friendTest = await getDoc(doc(database, "userList", document.data().uID, "friendList", userDetails.uid))

                        if (!friendTest.exists()) {
                            await setDoc(doc(database, "userList", document.data().uID, "friendList", userDetails.uid), {
                                friendStatus: "pending"
                            })

                            setRequestStatus("Request Sent")
                        } else {
                            setRequestStatus("Already Friends")
                        }
                    })();

                })



            })();
        }

        //reset entry and error flags
        setEntry("")
    }

    //dynamically show text input as user types into search box
    const handleTextInputChange = e => {
        const value = e.target.value;
        setEntry(value)

        //reset error trackers since new input
        setMissingEntry(false);
        setUnfoundUsername(false);
        setRequestStatus("");
    }


    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', pl: 30, pt: 5 }}>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <TextField
                    helperText={requestStatus}
                    label="Search Song"
                    error={(missingEntry) || (unfoundUsername)}
                    variant="outlined"
                    value={entry}
                    onChange={(e) => {
                        handleTextInputChange(e)
                    }}
                />
                <Button type="submit" variant="contained">Search</Button>
            </form>

            <Divider />

            <text>Songs to send</text>
            <text>/*Songs will appear here in a list*/</text>

            <Divider />

            <text>Friends</text>
            <text>/*When send is clicked it will send songs to the recipient from a send to song object*/</text>
            <SendFriendList userDetails={userDetails} />

            <Divider />

            <text>Incoming songs</text>
            <text>/*Songs that are recieved will go here*/</text>

        </Box>
    )
}