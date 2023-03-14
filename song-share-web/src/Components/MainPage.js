import Signout from './Signout';
import { useLocation } from 'react-router-dom'
import { collection, addDoc, getDocs } from "firebase/firestore"
import { database } from "./firebaseConfig";



export default function MainPage({ userDetails, setUserDetails }) {

    async function addUsertoDatabase(userDetails) {
        try {
            const docRef = await addDoc(collection(database, "userList"), {
                Fname: "",
                Lname: "",
                displayName: userDetails.userName,
                email: userDetails.email,
                password: "",
                uID: userDetails.uid
            });
            console.log("Document written with ID: ", docRef.id);

            const querySnapshot = await getDocs(collection(database, "userList"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }


    }

    async function searchUsers(userDetails) {
        const querySnapshot = await getDocs(collection(database, "userList"));
        querySnapshot.forEach((doc) => {
            if (doc.data().uID === userDetails.uid) {
                return
            }

            addUsertoDatabase(userDetails)
        });
    }

    addUsertoDatabase(userDetails)


    return (
        <div>
            Username: {userDetails.userName} {"\n"}
            Email: {userDetails.email}
            <img style={{ width: 50, height: 50 }} src={userDetails.profilePicture} />
            <Signout userDetails={userDetails} setUserDetails={setUserDetails} />
        </div>
    );

} 