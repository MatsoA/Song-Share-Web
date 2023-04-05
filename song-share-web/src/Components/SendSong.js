import { useState, useEffect } from 'react';
import { collection, doc, addDoc, setDoc, getDoc, getDocs, query, where } from "firebase/firestore"
import { firebaseApp, authProvider, database } from "./firebaseConfig"
import { getAuth } from "firebase/auth"
import { Stack, TextField, Button, Box, Item, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles'
import Banner from './banner';
import PendingFriendList from './PendingFriendList'
import SendFriendList from './SendFriendsList'
import { Key } from '@mui/icons-material';
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
        return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=relevance&maxResults=${encodeURIComponent(quantity)}&q=${encodeURIComponent(query)}&key=${encodeURIComponent(keys.ytApiKey)}`, {
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
                    "thumbnail": result.items[i].snippet.thumbnails.default.url,
                    "channel": result.items[i].snippet.channelTitle
                };
            }
            return output;
        }
    ) //returns a list [{title, url, thumbnail}, ...]
}

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
    
    //yt search integration features
    const [ytSearchResults, setSearchResults] = useState([]); //results from youtube, for displaying
    const [userNeedsToPick, setUserNeedsToPick] = useState(false); //whether the user is currently being prompted

    const handleSearch = e => {
        e.preventDefault();

        if (entry.length === 0) {
            setMissingEntry(true);
            setRequestStatus("No Song Inputted");
        }

        if (entry.length !== 0) {
            (async function () { //number is the quantity of search results to give
                //First, use youtube query to get the probable song name
                const ytResults = await ytSearch(entry, 5); 
                //Maybe we should do a firebase search for the exact name before the YT search to minimize API calls
                const probableName = ytResults[0].title;

                const songSearch = query(collection(database, "songList"), where("songName", "==", probableName));
                const querySnapshot = await getDocs(songSearch);

                //if query is empty, flag will remain true
                setUnfoundSong(true);
                setRequestStatus("Unable to find Song");
                setEntry("");
                querySnapshot.forEach((document) => {
                    setUnfoundSong(false);

                    console.log(document.data());
                    
                    console.log(entry.songID)

                    const id = songList.length + 1;

                    setSongList((prev) => [
                        ...prev,
                        {
                        songID: document.id,
                        songName: entry,
                        index: id
                        },
                    ]);

                    setInput("");
                    setEntry("");
                        
                    setRequestStatus("Song Found");
                })
                if(unfoundSong){
                    //TODO Display ytResults with message that the song's not known yet, let user select one (or cancel)
                    setSearchResults(ytResults);
                    setRequestStatus("Song not known. Select a Youtube video for it.");
                    //can we await a user input? If so, here is the moment to do so
                    setUserNeedsToPick(true);
                }
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

    const deleteById = id => {
        setSongList(oldValues => {
          return oldValues.filter(songList => songList.index !== id)
        })
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

            Songs to send
            <div>
                {userNeedsToPick ?
                    <div>
                        {
                            ytSearchResults.map((ytData)=>{
                                return (
                                    <div>
                                        Youtube Results
                                        <Button type="button" onClick={async ()=>{
                                            const id = songList.length + 1;
                                            //add to the database, then send
                                            var newDoc = await addDoc(collection(database, "songList"), {
                                                "songName": ytData.title,
                                                "songURL": ytData.url
                                            });
                                            setSongList((prev) => [
                                                ...prev,
                                                {
                                                    songID: newDoc.id,
                                                    songName: ytData.title,
                                                    index: id
                                                }
                                            ])
                                            setUnfoundSong(false);
                                            setRequestStatus("Song Found");
                                            setInput("");
                                            setEntry("");
                                            setUserNeedsToPick(false);
                                        }}>
                                            {/*Add actual display of result here, using data from ytData*/}
                                        </Button>
                                    </div>
                                );
                            })    
                        }
                        <Button type="button" onClick={setUserNeedsToPick(false)}>Cancel</Button>
                    </div>
                :
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
                                    
                                    <Button type="button" onClick={() => {deleteById(song.index)}}>Remove</Button>
                                </li>
                            );
                        })}
                    </ul>
                }
            </div>
            <Divider />

            Friends
            {/*When send is clicked it will send songs to the recipient from a send to song object*/}
            <SendFriendList userDetails={userDetails} songList={songList} setSongList={setSongList}/>

        </Box>
    )
}