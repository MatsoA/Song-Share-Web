import { useState, useEffect } from 'react';
import { collection, doc, addDoc, setDoc, getDoc, getDocs, query, where } from "firebase/firestore"
import { firebaseApp, authProvider, database } from "./firebaseConfig"
import { getAuth } from "firebase/auth"
import { Stack, TextField, Button, Box, Item, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles'
import Banner from './banner';
import PendingFriendList from './PendingFriendList'
import SendFriendList from './SendFriendsList'

export default function SendSongsPage({ userDetails, setUserDetails }) {

    //hook for input field
    const [entry, setEntry] = useState("")

    // tracking for errors, used to trigger red box
    const [missingEntry, setMissingEntry] = useState(false);
    const [unfoundSong, setUnfoundSong] = useState(false);

    // set for the list of songs
    const [input, setInput] = useState("");
    const [songList, setSongList] = useState([]);

    // used to update text field helper text
    const [requestStatus, setRequestStatus] = useState("");

    const handleSearch = e => {
        e.preventDefault();

        if (entry.length === 0) {
            setMissingEntry(true);
            setRequestStatus("No Song Inputted");
        }

        if (entry.length !== 0) {
            const songSearch = query(collection(database, "songList"), where("songName", "==", entry));


            (async function () {
                const querySnapshot = await getDocs(songSearch);

                //if query is empty, flag will remain true
                setUnfoundSong(true);
                setRequestStatus("Unable to find Song");
                setEntry("");

                querySnapshot.forEach((document) => {
                    setUnfoundSong(false);

                    console.log(document.data());
                    

                    const id = songList.length + 1;
                    setSongList((prev) => [
                        ...prev,
                        {
                        songID: id,
                        songName: entry,
                        },
                    ]);
                    setInput("");
                    setEntry("");

                    console.log(songList);
                        
                    setRequestStatus("Song Found");
                })
            })();
        }
    }

    //dynamically show text input as user types into search box
    const handleTextInputChange = e => {
        const value = e.target.value;
        setEntry(value)

        //reset error trackers since new input
        setMissingEntry(false);
        setUnfoundSong(false);
        setRequestStatus("");
    }

    const handleDeleteListItem = (id) => {
        console.log("remove item")
        console.log(id);
    }


    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', pl: 30, pt: 5 }}>
            <form noValidate autoComplete='off' onSubmit={handleSearch}>
                <TextField
                    helperText={requestStatus}
                    label="Search Song"
                    error={(missingEntry) || (unfoundSong)}
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
            <text> TODO: add functionality to the remove buttons</text>
            <ul>
                {songList.map((song) => {
                    return (
                    <li
                        id={song.id}
                        style={{
                        listStyle: "none",
                        }}
                    >
                        {song.songName}
                        <Button type="button" onClick={() => {handleDeleteListItem(song.id)}}>Remove</Button>
                    </li>
                    );
                })}
            </ul>

            <Divider />

            <text>Friends</text>
            <text>/*When send is clicked it will send songs to the recipient from a send to song object*/</text>
            <SendFriendList userDetails={userDetails} />

        </Box>
    )
}