import Signout from './Signout';
import { useLocation } from 'react-router-dom'
import { collection, addDoc, getDocs } from "firebase/firestore"
import { database } from "./firebaseConfig";
import { Box } from '@mui/material';
import Play from './Play'



export default function MainPage({ userDetails, setUserDetails }) {


    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', pl: 30, pt: 5 }}>
            <div>
                Username: {userDetails.userName} {"\n"}
                Email: {userDetails.email}
                <img style={{ width: 50, height: 50 }} src={userDetails.profilePicture} />
                <Signout userDetails={userDetails} setUserDetails={setUserDetails} />
                <Play videoLink={'https://www.youtube.com/watch?v=ZzI9JE0i6Lc'} />
            </div>
        </Box>
    );

} 