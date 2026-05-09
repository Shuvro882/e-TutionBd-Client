import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/home/Home";
import Contacts from "../pages/contact/Contacts";
import Logins from "../pages/Auth/login/Logins";
import Registration from "../pages/Auth/register/Registration";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashBoardLayout";
import MyTuitions from "../pages/Dashboard/student/MyTuitions";
import PostTuition from "../pages/Dashboard/student/PostTuition";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
      {
        index: true,
        Component: Home,
      },
      {
        path: "contacts",
        Component: Contacts,
      },
      {
        path:"logins",
        Component: Logins,
      },
      {
        path:"registration",
        Component: Registration
      }
    ]
  },
  {
    path: 'dashboard',
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        path: 'my-tuitions',
        Component: MyTuitions
      },
      {
        path: 'post-tuitions',
        Component: PostTuition,
      }
    ]
  },
]);