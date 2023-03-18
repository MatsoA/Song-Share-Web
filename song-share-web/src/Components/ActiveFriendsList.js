import {Stack, Item, Paper} from '@mui/material'
import {styled} from '@mui/material/styles'
import {doc, collection, getDoc, getDocs, query, where} from "firebase/firestore"
import {useCollectionData, useCollection} from "react-firebase-hooks/firestore"
import { firebaseApp, authProvider, database } from "./firebaseConfig"
import {useState, useEffect} from "react"
import { BiotechOutlined, Pending } from '@mui/icons-material'
import ActiveFriend from "./ActiveFriend"
import List from '@mui/material/List';

export default function ActiveFriendList({userDetails}) {
   
    const [activeFriendList, loading, error] = useCollection(query(collection(database, "userList", userDetails.uid, "friendList"), where("friendStatus", "==", "active")));

    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {activeFriendList && activeFriendList.docs.map((doc, index) => (
                <ActiveFriend key= {index} userDetails = {userDetails} uid={doc.id}/>
            ))}
        </List>
    )
    

}




