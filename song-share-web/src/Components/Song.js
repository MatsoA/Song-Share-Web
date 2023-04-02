import {getFirestore, doc, setDoc, deleteDoc} from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'
import { firebaseApp, authProvider, database } from "./firebaseConfig"
import {Stack, Item, Paper, Typography, Divider, TableRow, TableCell} from '@mui/material'

import Avatar from '@mui/material/Avatar';
import Review from './Review'

//individual table entry for a song
//includes
//song name, sentBy name and profile picture, and review button
//add thumbnail and play button here
export default function Song({songID, sentBy, userDetails}) {

    //gets data about song from songList in database
    const [song, loading, error] = useDocument(doc(database, "songList", songID));

    //gets sentByName from database to send to song
    const [sentByName] = useDocument(doc(database, "userList", sentBy));

    return (
        song && sentByName &&
        <TableRow
        key={song.data().songName}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell component="th" scope = "row"> 
        {song.data().songName}
        </TableCell>
        <TableCell align = "left">{sentByName.data().displayName} <Avatar src={sentByName.data().profilePicture} /> </TableCell>
        <TableCell align = "left"> 
        <Review song={songID} songName={song.data().songName} sentBy={sentBy}userDetails = {userDetails}> </Review>
        </TableCell>
        </TableRow>   
        
    )
}



