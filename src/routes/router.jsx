import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/home/Home";
import Contacts from "../pages/contact/Contacts";
import Logins from "../pages/Auth/login/Logins";
import Registration from "../pages/Auth/register/Registration";


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
]);