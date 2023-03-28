import {getFirestore, doc, setDoc, deleteDoc} from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'
import { firebaseApp, authProvider, database } from "./firebaseConfig"
import {Stack, Item, Paper, Typography} from '@mui/material'
import {styled} from '@mui/material/styles'
import {useEffect} from "react"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import Avatar from '@mui/material/Avatar';

//individual song

export default function Song({SongID}) {

    //gets user data from database and monitors any changes on the database
    //hook updates and re-renders page on changes (used to correctly wait for response to render page correctly)
    const [value, loading, error] = useDocument(doc(database, "songList", SongID))




    return (
        value && 
        <ListItem>
            <ListItemText primary={value.data().songName} />
            <ListItemText primary={value.data().songURL} />
        </ListItem>
    )
}



