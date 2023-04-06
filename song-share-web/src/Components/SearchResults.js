import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import {addDoc, collection} from "firebase/firestore"
import {database} from "./firebaseConfig"

export default function SearchResults({ data, element, showResults, setShowResults, setUnfoundSong, setRequestStatus, setInput, setEntry, setUserNeedsToPick, songList, setSongList}) {
    /*used for yt results display*/
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const open = Boolean(anchorEl);


    useEffect(() => {
        console.log(showResults, element)
        if (showResults) {
            setAnchorEl(element)
        } else {
            setAnchorEl(null);
        }
    }, [showResults, element]);

    


    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => {
                setShowResults(false)
            }}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {data.map((ytData, index) => (
                <MenuItem key={index} onClick = {async () => {
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
                }}>{ytData.title}</MenuItem>
            ))}
        </Menu>
    )
}


