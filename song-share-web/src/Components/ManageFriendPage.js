import {useState, useEffect} from 'react';
import {Stack, TextField, Button} from '@mui/material';
import { collection, doc, addDoc, setDoc, getDocs, query, where } from "firebase/firestore"
import { firebaseApp, authProvider, database } from "./firebaseConfig";

export default function ManageFriendPage({userDetails, setUserDetails}) {

    //hook for input field
    const [entry, setEntry] = useState("")

    //tracking for errors, used to trigger red box
    const [missingEntry, setMissingEntry] = useState(false);
    const [unfoundUsername, setUnfoundUsername] = useState(false);

    //start search for friend upon submission
    const handleSubmit = e => {

        e.preventDefault();

        //raise flag if no entry is typed
        if (entry.length == 0) {
            setMissingEntry(true);
        }

        if (entry.length !== 0) {
            //query for how to look for friend (via email)
            const friendSearch = query(collection(database, "userList"), where("email", "==", entry));

            
            //if valid entry, excecute query and look for friend
            (async function() {
                const querySnapshot = await getDocs(friendSearch);

                //if query is empty, flag will remain true
                setUnfoundUsername(true);

                //send request to friend found
                querySnapshot.forEach((document) => {
                    setUnfoundUsername(false);
                    
                    (async function() {
                        await setDoc(doc(database, "userList", document.data().uID, "friendList", userDetails.uid), {
                            friendStatus: "pending"
                        })
                    })();

                })
            })();
        }

        //reset entry and error flags
        setEntry("")
    }

    //dynamically show text input as user types into search box
    const handleTextInputChange = e => {
        const value = e.target.value;
        setEntry(value)

        //reset error trackers since new input
        setMissingEntry(false);
        setUnfoundUsername(false);
    }


    return (
        <form noValidate autoComplete = 'off' onSubmit={handleSubmit}>
            <TextField 
                error = {(missingEntry) || (unfoundUsername)}
                label = "Search User"
                variant = "outlined"
                value = {entry}
                onChange={(e)=> {
                    handleTextInputChange(e)
                }}
            />

            <Button type="submit" variant = "contained">Search</Button>
        </form>
    )
}