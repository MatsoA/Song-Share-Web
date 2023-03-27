import {getFirestore, doc, setDoc, deleteDoc} from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'
import { firebaseApp, authProvider, database } from "./firebaseConfig"
import {Stack, Item, Paper, Button} from '@mui/material'
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

//individual friend entry in list of active friends
//encapsulates behavior on individual friend

export default function ActiveFriend({userDetails, uid, songList, setSongList}) {

    //gets user data from database and monitors any changes on the database
    //hook updates and re-renders page on changes (used to correctly wait for response to render page correctly)
    const [value, loading, error] = useDocument(doc(database, "userList", uid))


    //updates friendList of both users of a friend relation
    async function handleOnSend() {
        

        setSongList([]);
    }

    console.log(songList);

    //display friends list if useDocument() has finished
    return (
        value && 
        <ListItem
            disablePadding
            secondaryAction={
                <div>
                      <Button type="submit" variant="contained"
                          onClick={() => {
                              handleOnSend();
                          }}>Send
                      </Button>
                </div>
              }
          >
            <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={value.data().profilePicture}
                />
            </ListItemAvatar>
            <ListItemText primary={value.data().displayName} />
        </ListItem>
    )
}



