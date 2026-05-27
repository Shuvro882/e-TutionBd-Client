import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/home/Home";
import Contacts from "../pages/contact/Contacts";
import Logins from "../pages/Auth/login/Logins";
import Registration from "../pages/Auth/register/Registration";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyTuitions from "../pages/Dashboard/student/MyTuitions";
import PostTuition from "../pages/Dashboard/student/PostTuition";
import NotFound from "../pages/errorPage/ErrorPage";
import AppliedTutors from "../pages/Dashboard/student/AppliedTutors";
import ProfileSettings from "../pages/Dashboard/student/ProfileSettings";
import StudentHome from "../pages/Dashboard/student/StudentHome";
import TutorProfile from "../pages/Dashboard/tutor/TutorProfile";
import AllTutor from "../pages/Home/allTutor/AllTutor";
import About from "../pages/Home/About/About";
import { Component } from "react";
import TutorDetails from "../pages/Home/Latest-Tutors/TutorDetails";
import TuitionManagement from "../pages/Dashboard/admin/TuitionManagement";
import TuitionPostDetails from "../pages/Home/Latest-Tuition/TuitionPostDetails";
import AllTuition from "../pages/Home/allTuition/AllTuition";
import MyApplications from "../pages/Dashboard/tutor/MyApplications";
import PaymentHistory from "../pages/Dashboard/student/PaymentHistory";
import RevenueHistory from "../pages/Dashboard/tutor/RevenueHistory";
import OngoingTuitions from "../pages/Dashboard/tutor/OngoingTuitions";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "contacts",
        Component: Contacts,
      },
      {
        path: "logins",
        Component: Logins,
      },
      {
        path: "registration",
        Component: Registration,
      },
      {
        path: "all-tutors",
        Component: AllTutor
      },
      {
        path: "/tutors/:id",
        Component: TutorDetails,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "/tuition-post-details/:id",
        Component: TuitionPostDetails,
      },
      {
        path: "all-tuition",
        Component: AllTuition,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-tuitions",
        Component: MyTuitions,
      },
      {
        path: "post-tuitions",
        Component: PostTuition,
      },
      {
        path: "applied-tutors",
        Component: AppliedTutors,
      },
      {
        path: "profile-settings",
        Component: ProfileSettings,
      },
      {
        path: "student-home",
        Component: StudentHome,
      },
      {
        path: "tutor-profile",
        Component: TutorProfile,
      },
      {
        path: "tuition-management",
        Component: TuitionManagement,
      },
      {
        path:"my-applications",
        Component: MyApplications

      },
      {
        path:"payment-history",
        Component: PaymentHistory,

      },
      {
        path:"revenue-history",
        Component: RevenueHistory,
      },
      {
        path:"ongoing-tuitions",
        Component: OngoingTuitions,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
