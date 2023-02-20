import { getAuth, signOut } from "firebase/auth";
import {Button} from '@mui/material'
import { redirect, useNavigate} from "react-router-dom"




export default function Signout({userDetails, setUserDetails}) {

    const navigate = useNavigate();

    return (
        <Button variant="text" onClick={() => {
            const auth = getAuth();
            signOut(auth).then(() => {
                setUserDetails({
                    userName: "",
                    email: "",
                    profilePicture: "",
                    uid: 0
                })

                navigate('/')
              }).catch((error) => {
                // An error happened.
              });
          
        }}> Sign out </Button>
    )

}