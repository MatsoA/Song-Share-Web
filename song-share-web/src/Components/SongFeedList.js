import {Stack, Item, Paper, Divider, TableBody} from '@mui/material'
import {styled} from '@mui/material/styles'
import {doc, collection, getDoc, getDocs, query, where} from "firebase/firestore"
import {useCollectionData, useCollection} from "react-firebase-hooks/firestore"
import { firebaseApp, authProvider, database } from "./firebaseConfig"
import {useState, useEffect} from "react"
import { BiotechOutlined, Pending } from '@mui/icons-material'
import Song from "./Song"
import List from '@mui/material/List';

export function SongFeedList({userDetails}) {
   
    //reads received songs of the user from the database
    const [sendFeed, loading, error] = useCollection(query(collection(database, "userList", userDetails.uid, "receivedSongs")));

    // useEffect(()=> {
    //     console.log(sendFeed.docs)
    // },[sendFeed])

    return (
        <TableBody>
            {sendFeed && sendFeed.docs.map((doc, index) => (
                <Song comments ={doc.data().review} viewOnly= {false} key= {index} songID = {doc.data().songID} sentBy = {doc.data().sentBy} userDetails = {userDetails} rating= {doc.data().rating} />          
            ))}
        </TableBody>
    )
    

}




