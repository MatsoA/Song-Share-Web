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



function App() {

  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    profilePicture: "",
    uid: 0
  });

  const routes = [
    {
      path: "/",
      element: <Signin userDetails={userDetails} setUserDetails = {setUserDetails}/>
    },
    {
      path: "app",
      element: <MainDrawer />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <MainPage userDetails={userDetails} setUserDetails = {setUserDetails}></MainPage>
        },
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
