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
import SearchResults from './SearchResults';
import Play from "./Play"

//html character encoding handler; handles the encodings Youtube returns
var he = require('he');

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
            console.log(result.items[0].snippet.title);
            console.log(he.decode(result.items[0].snippet.title))
            var output = [];
            for(let i = 0; i < result.items.length; i++){
                output[i] = {
                    "title": decodeURIComponent(he.decode(result.items[i].snippet.title)), 
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

    const [resultsElement, setResultsElement] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = e => {
        e.preventDefault();

        if (entry.length === 0) {
            setMissingEntry(true);
            setRequestStatus("No Song Inputted");
        }

        console.log("search entered")
        setResultsElement(e.currentTarget)

        if (entry.length !== 0) {
            (async function () { //number is the quantity of search results to give
                //First, use youtube query to get the probable song name
                const ytResults = await ytSearch(entry, 5); 
                //Maybe we should do a firebase search for the exact name before the YT search to minimize API calls
                const probableName = ytResults[0].title;

                const songSearch = query(collection(database, "songList"), where("songName", "==", probableName));
                const querySnapshot = await getDocs(songSearch);

                //if query is empty, flag will remain true
                console.log("yt search")
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
                        songURL: document.data().songURL,
                        index: id
                        },
                    ]);

                    setInput("");
                    setEntry("");
                        
                    setRequestStatus("Song Found");
                })
                console.log(e.currentTarget)
                setSearchResults(ytResults)
                // if(unfoundSong){
                //     console.log("not in database")
                //     //TODO Display ytResults with message that the song's not known yet, let user select one (or cancel)
                //     //setSearchResults(ytResults);
                //     setRequestStatus("Song not known. Select a Youtube video for it.");
                //     //can we await a user input? If so, here is the moment to do so
                //     setUserNeedsToPick(true);
                // }
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


    // useEffect(() => {
    //     setShowResults(true)
    // }, [userNeedsToPick])

    useEffect(() => {
        console.log("not in database")
        //TODO Display ytResults with message that the song's not known yet, let user select one (or cancel)
        //setSearchResults(ytResults);
        if (unfoundSong) {
            console.log(unfoundSong)
            setRequestStatus("Song not known. Select a Youtube video for it.");
            //can we await a user input? If so, here is the moment to do so
            setUserNeedsToPick(true);
        } else {
            setUserNeedsToPick(false);
        }
    }, [unfoundSong])

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', pl: 30, pt: 7 }}>
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
                <ul>
                    {songList.map((song, index) => {
                    return (
                        <li
                            id={song.id}
                            style={{
                            listStyle: "none",
                            }}
                            key = {index}        
                        >

                                {song.songName}
                                {song.songURL ? <Play videoLink={song.songURL} /> : null}
                                <Button type="button" onClick={() => {deleteById(song.index)}}>Remove</Button>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Divider />

            Friends
            {/*When send is clicked it will send songs to the recipient from a send to song object*/}
            <SendFriendList userDetails={userDetails} songList={songList} setSongList={setSongList}/>
            <SearchResults data = {ytSearchResults} element = {resultsElement} showResults = {userNeedsToPick} setShowResults = {setUserNeedsToPick} setUnfoundSong = {setUnfoundSong} setRequestStatus = {setRequestStatus} setInput ={setInput} setEntry = {setEntry} setUserNeedsToPick = {setUserNeedsToPick} songList = {songList} setSongList = {setSongList} />
        </Box>
    )
}