import { collection, doc, addDoc, setDoc, getDoc } from "firebase/firestore"
import { firebaseApp, authProvider, database } from "./firebaseConfig";

export default function Register({userDetails}) {

    async function addUsertoDatabase(userDetails) {
        
            await setDoc(doc(database, "userList", userDetails.uid), {
                Fname: "",
                Lname: "",
                displayName: userDetails.userName,
                email: userDetails.email,
                password: "",
                uID: userDetails.uid
            });
            console.log("Document written with ID: ");


        } 
    
    

    
      addUsertoDatabase(userDetails)
}