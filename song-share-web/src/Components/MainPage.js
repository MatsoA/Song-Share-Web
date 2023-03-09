import Signout from './Signout';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom'


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
            </div>
        </Box>
    );

} 