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
import NotFound from "../pages/errorPage/ErrorPage";
import AppliedTutors from "../pages/Dashboard/student/AppliedTutors";
import ProfileSettings from "../pages/Dashboard/student/ProfileSettings";
import StudentHome from "../pages/Dashboard/student/StudentHome";
import TutorProfile from "../pages/Dashboard/tutor/TutorProfile";
import AllTutor from "../pages/Home/allTutor/AllTutor";






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
        Component: Registration,
      },
      {
        path:"all-tutors",
        element:<PrivateRoute><AllTutor></AllTutor></PrivateRoute>

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
      },
      {
        path: 'applied-tutors',
        Component: AppliedTutors,
      },
      {
        path: 'profile-settings',
        Component: ProfileSettings,
      },
      {
        path:'student-home',
        Component: StudentHome,
      },
      {
        path: 'tutor-profile',
        Component: TutorProfile,
      }
    ]
  },
  {
  path: "*",
  Component: NotFound,
}
]);