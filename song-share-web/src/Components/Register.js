import { collection, doc, addDoc, setDoc, getDoc } from "firebase/firestore"
import { firebaseApp, authProvider, database } from "./firebaseConfig";

//add user to userList if signing in for first time ever
export default function Register({userDetails}) {
        (async function() {
            await setDoc(doc(database, "userList", userDetails.uid), {
                Fname: "",
                Lname: "",
                displayName: userDetails.userName,
                profilePicture: userDetails.profilePicture,
                email: userDetails.email,
                password: "",
                uID: userDetails.uid
            });
            console.log("Document written with ID: ");
        })();
    
}