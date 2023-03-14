import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import Signin from './Components/Signin'
import MainPage from './Components/MainPage';
import ManageFriendPage from './Components/ManageFriendPage';
import ErrorPage from './Components/error-page';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import MainDrawer from './Components/MainDrawer';
import { collection, doc, addDoc, getDoc, query } from "firebase/firestore"
import { firebaseApp, authProvider, database } from "./Components/firebaseConfig";
import Register from "./Components/Register"



function App() {

  //Stores details for user currently signed in
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    profilePicture: "",
    uid: "0"
  });

  useEffect(() => {
    console.log(userDetails.userName);

    let found = false;

    (async function() {

      const docSnap = await getDoc(doc(database, "userList", userDetails.uid))
      
      if (!docSnap.exists()) {
        Register({userDetails})
      }
      

    })()
    
  }, [userDetails]);




  //Paths for React Router
  const routes = [
    //initial landing page
    {
      path: "/",
      element: <Signin userDetails={userDetails} setUserDetails = {setUserDetails}/>
    },
    //once signed in
    {
      path: "nav",
      element: <MainDrawer />,
      errorElement: <ErrorPage />,
      children: [
        //default feed
        {
          index: true,
          element: <MainPage userDetails={userDetails} setUserDetails = {setUserDetails}></MainPage>
        },
        //tab for searching for friends
        {
          path: "friends",
          element: <ManageFriendPage userDetails={userDetails} setUserDetails = {setUserDetails}></ManageFriendPage>
        }
      ]
    },
  ]
  
  const router = createBrowserRouter(routes)

  return (
    <RouterProvider router={router} />
  );
}

export default App;
