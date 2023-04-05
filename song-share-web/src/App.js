import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import Signin from './Components/Signin'
import MainPage from './Components/MainPage';
import ManageFriendPage from './Components/ManageFriendPage';
import SendSong from './Components/SendSong';
import ErrorPage from './Components/error-page';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate
} from "react-router-dom"
import MainDrawer from './Components/MainDrawer';
import { collection, doc, addDoc, getDoc, query } from "firebase/firestore"
import { firebaseApp, authProvider, database } from "./Components/firebaseConfig";
import Register from "./Components/Register"
import Banner from './Components/banner';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import {purple, blue, amber} from '@mui/material/colors'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: purple,
    secondary: blue,
  },
});

function App() {

  //Stores details for user currently signed in
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    profilePicture: "",
    uid: "0"
  });
  
  //on page load check if we have a stored login for user, 
  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserDetails({
          userName: user.displayName,
          email: user.email,
          profilePicture: user.photoURL,
          uid: user.uid
        });
        // ...
      } 
    })
  }, [])

  useEffect(() => {
    console.log(userDetails.userName);

    //only try to read database if we've signed in
    if (userDetails.userName != "") {

      (async function () {

        const docSnap = await getDoc(doc(database, "userList", userDetails.uid))

        if (!docSnap.exists()) {
          Register({ userDetails })
        }

      })()

    } 

  }, [userDetails]);




  //Paths for React Router
  const routes = [
    //initial landing page
    {

      path: "/",
      element: <Signin userDetails={userDetails} setUserDetails={setUserDetails} />
    },
    //once signed in
    {
      path: "nav",
      element: <MainDrawer userDetails={userDetails} setUserDetails={setUserDetails} />,
      errorElement: <ErrorPage />,
      children: [
        //default feed
        {
          index: true,
          element: <MainPage userDetails={userDetails} setUserDetails={setUserDetails}></MainPage>
        },
        //tab for searching for friends
        {
          path: "friends",
          element: <ManageFriendPage userDetails={userDetails} setUserDetails={setUserDetails}></ManageFriendPage>
        },
        {
          path: "music",
          element: <SendSong userDetails={userDetails} setUserDetails={setUserDetails}></SendSong>
        }
      ]
    },
  ]

  const router = createBrowserRouter(routes)

  return (
    <ThemeProvider theme= {darkTheme}>
      <CssBaseline />
    <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
