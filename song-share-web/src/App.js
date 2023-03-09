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
import Banner from './Components/banner';



function App() {

  //Stores details for user currently signed in
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    profilePicture: "",
    uid: 0
  });

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
      element: <Banner />,
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
