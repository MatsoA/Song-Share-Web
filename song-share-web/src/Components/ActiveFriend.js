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

export default function ActiveFriend({userDetails, uid}) {


    //console.log(uid)

    const [value, loading, error] = useDocument(doc(database, "userList", uid))


    async function removeFriend() {
        const currentUserFriendRef = doc(database, "userList", userDetails.uid, "friendList", uid);
        const otherUserFriendRef = doc(database, "userList", uid, "friendList", userDetails.uid);


        await deleteDoc(currentUserFriendRef);
        await deleteDoc(otherUserFriendRef);
    }

    return (
        value && 
        <ListItem
            secondaryAction={
              <div>
                    <IconButton edge="end" aria-label="Ignore Request" 
                        onClick={() => {
                            removeFriend();
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
                />
            </ListItemAvatar>
            <ListItemText primary={value.data().displayName} />
        </ListItem>
    )
}



