import {getFirestore, doc, setDoc, deleteDoc, getDoc} from 'firebase/firestore'
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
        for(var i = 0; i < songList.length; i++){
            await setDoc(doc(database, "userList", userDetails.uid, "sentSongs", songList[i].songName + uid), {
                recipient: userDetails.uid, listenedTo: false, rating: 0, review: "", songName: songList[i].songName, sentTo: uid
            })

            await setDoc(doc(database, "userList", uid, "receivedSongs", songList[i].songName + userDetails.uid), {
                sentBy: userDetails.uid, songName: songList[i].songName
            })
        }
        

        //var test = await getDoc(doc(database, "userList", userDetails.uid, 'sentSongs', songList[0] ));



        setSongList([]);
    }

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



