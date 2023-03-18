import { getAuth, signOut } from "firebase/auth";
import {Button} from '@mui/material'
import { redirect, useNavigate} from "react-router-dom"
import {useEffect} from "react"




export default function Signout({userDetails, setUserDetails}) {

    //used so useEffect is selective
    let signout = false

    const navigate = useNavigate();

    useEffect(() => {
        if (userDetails.userName == "") {
            navigate("/")
        }
    }, [userDetails])

    return (
        <Button variant="text" onClick={() => {
            const auth = getAuth();
            signOut(auth).then(() => {
                signout = true
                setUserDetails({
                    userName: "",
                    email: "",
                    profilePicture: "",
                    uid: 0
                })
              }).catch((error) => {
                // An error happened.
              });
          
        }}> Sign out </Button>
    )

}