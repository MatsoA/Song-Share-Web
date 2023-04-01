import {getFirestore, doc, setDoc, deleteDoc} from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'
import { firebaseApp, authProvider, database } from "./firebaseConfig"
import {Stack, Item, Paper} from '@mui/material'
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

//individual request entry in list of pending friends
//encapsulates behavior on individual friend request

export default function PendingFriend({userDetails, uid}) {

    //gets user data from database and monitors any changes on the database
    //hook updates and re-renders page on changes (used to correctly wait for response to render page correctly)
    const [value, loading, error] = useDocument(doc(database, "userList", uid))


    //update friendLists of both users of proposed friend relation 
    async function acceptFriendRequest() {
        const incomingRequestRef = doc(database, "userList", userDetails.uid, "friendList", uid);
        const senderRef = doc(database, "userList", uid, "friendList", userDetails.uid);

        //update friend details on both reciever and sender of request
        await setDoc(incomingRequestRef, {friendStatus: "active"}, {merge: true}); 
        await setDoc(senderRef, {friendStatus: "active"}, {merge: true});
    }

    //remove friendRequest from logged in users' friendList
    //entry not made in requester's friendList so only one deletion necessary
    async function denyFriendRequest() {
        const incomingRequestRef = doc(database, "userList", userDetails.uid, "friendList", uid);


        await deleteDoc(incomingRequestRef);
    }

    return (
        value && 
        <ListItem
            secondaryAction={
              <div>
                    <IconButton edge="end" aria-label="Add Friend" 
                        onClick={() => {
                            acceptFriendRequest()
                        }}>
                        <PersonAddIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="Ignore Request" 
                        onClick={() => {
                            denyFriendRequest()
                        }}>
                        <CancelIcon />
                    </IconButton>
              </div>
            }
            disablePadding
          >
            <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={value.data().profilePicture}
                  crossOrigin = "anonymous"
                />
            </ListItemAvatar>
            <ListItemText primary={value.data().displayName} />
        </ListItem>
    )
}



