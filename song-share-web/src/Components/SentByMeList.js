import {Stack, Item, Paper, Divider, TableBody} from '@mui/material'
import {styled} from '@mui/material/styles'
import {doc, collection, getDoc, getDocs, query, where} from "firebase/firestore"
import {useCollectionData, useCollection} from "react-firebase-hooks/firestore"
import { firebaseApp, authProvider, database } from "./firebaseConfig"
import {useState, useEffect} from "react"
import { BiotechOutlined, Pending } from '@mui/icons-material'
import Song from "./Song"
import List from '@mui/material/List';

export function SentByMeList({userDetails}) {
   
    //reads received songs of the user from the database
    const [sentFeed, loading, error] = useCollection(query(collection(database, "userList", userDetails.uid, "sentSongs")));

    // useEffect(()=> {
    //     console.log(sendFeed.docs)
    // },[sendFeed])

    return (
        <TableBody>
            {sentFeed && sentFeed.docs.map((doc, index) => (
                <Song comments={doc.data().review} viewOnly={true} key= {index} songID = {doc.data().songID} sentBy = {userDetails.uid} userDetails = {userDetails} rating = {doc.data().rating} />          
            ))}
        </TableBody>
    )
    

}




