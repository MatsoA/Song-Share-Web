import Signout from './Signout';
import {useLocation} from 'react-router-dom'                         

export default function MainPage({userDetails, setUserDetails}) {
   

    return (
            <div>
                Username: {userDetails.userName} {"\n"}
                Email: {userDetails.email}
                <img style = {{width: 50, height: 50}} src={userDetails.profilePicture } />
                <Signout userDetails= {userDetails} setUserDetails={setUserDetails}/>
            </div>
    );

} 