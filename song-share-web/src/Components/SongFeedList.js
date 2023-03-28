import {Stack, Item, Paper} from '@mui/material'
import {styled} from '@mui/material/styles'
import {doc, collection, getDoc, getDocs, query, where} from "firebase/firestore"
import {useCollectionData, useCollection} from "react-firebase-hooks/firestore"
import { firebaseApp, authProvider, database } from "./firebaseConfig"
import {useState, useEffect} from "react"
import { BiotechOutlined, Pending } from '@mui/icons-material'
import Song from "./Song"
import List from '@mui/material/List';

export function SongFeedList({userDetails}) {
   
    //reads friendList from database and monitors any changes
    //hook updates and re-renders page on changes (used to correctly wait for response to render page correctly)
    const [sendFeed, loading, error] = useCollection(query(collection(database, "userList", userDetails.uid, "recievedSongs")));

    // useEffect(()=> {
    //     console.log(sendFeed.docs)
    // },[sendFeed])

    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {sendFeed && sendFeed.docs.map((doc, index) => (
                <Song key= {index} SongID = {doc.data().SongID}/>          
            ))}
        </List>
    )
    

}




