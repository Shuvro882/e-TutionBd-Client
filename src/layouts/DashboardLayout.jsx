import React from "react";
import { Link, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import { IoIosLogOut, IoIosSettings } from "react-icons/io";
import { FaCirclePlus, FaHandHoldingDollar, FaRegCircleRight } from "react-icons/fa6";
import { MdDashboard, MdOutlinePayment } from "react-icons/md";
import { BsSendCheckFill } from "react-icons/bs";
import { IoMenu, IoPeople } from "react-icons/io5";
import Logo from "../Components/logo/Logo";
import ActiveBtn from "../pages/Dashboard/activeBtn/ActiveBtn";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role, roleLoading } = useRole();

  const { data: dbUser = {} } = useQuery({
  queryKey: ["dbUser", user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await axiosSecure.get(`/users/${user.email}`);
    return res.data;
  },
});

  const location = useLocation();
  const path = location.pathname;

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const pageTitles = {
    "/dashboard/my-tuitions": "My Tuitions",
    "/dashboard/post-tuitions": "Post New Tuition",
    "/dashboard/applied-tutors": "Applied Tutors",
    "/dashboard/payment-history": "Payment History",
    "/dashboard/profile-settings": "Profile Settings",
    "/dashboard/tutor-profile": "Tutor Profile",
    "/dashboard/tuition-management": "Tuition Management",
    "/dashboard/my-applications": "My Applications",
    "/dashboard/revenue-history": "Revenue History",
    "/dashboard/ongoing-tuitions": "Ongoing Tuitions",
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* ===== MAIN CONTENT ===== */}
        <div className="drawer-content flex flex-col">
          {/* ===== NAVBAR ===== */}
          <nav className="navbar bg-base-100 px-4 lg:px-8 py-4 sticky top-0 z-50 shadow">
            <div className="flex-1 flex items-center justify-between">
              {/* LEFT SIDE PAGE TITLE */}
              <h1 className="text-lg sm:text-xl font-bold text-primary">
                {pageTitles[path] || "Dashboard"}
              </h1>

              {/* RIGHT SIDE MOBILE MENU BUTTON */}
              <label
                htmlFor="my-drawer-4"
                className="btn btn-square btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {dbUser?.role || "User"} Account
                  </p>
                </div>

                <button className="hidden lg:flex btn btn-ghost btn-circle rounded-full bg-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                  </svg>
                </button>
              </div>
            </div>
          </nav>

          {/* ===== PAGE CONTENT ===== */}
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </div>

        {/* ===== SIDEBAR ===== */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

          {/* IMPORTANT: flex column added */}
          <aside className="min-h-full w-64 bg-base-100 p-4 flex flex-col shadow-sm">
            <div className="pb-2 mb-2 w-full border-b border-gray-200">
              <Link to="/" className="block w-full">
                <Logo />
              </Link>
            </div>

            {/* MENU (flex-1 so logout stays bottom) */}
            <ul className="menu space-y-1 flex-1">
              {
                 role === "student" && (
                  <>
                  <li>
                
                <ActiveBtn to="/dashboard/student-home">
                  <MdDashboard />
                  Dashboard Home
                </ActiveBtn>
              </li>

              <li>
                
                <ActiveBtn to="/dashboard/my-tuitions">
                <IoMenu />
                My Tuitions</ActiveBtn>
              </li>

              <li>
                <ActiveBtn to="/dashboard/post-tuitions">
                  <FaCirclePlus />
                  Post New Tuition
                </ActiveBtn>
              </li>

              <li>
                <ActiveBtn to="/dashboard/applied-tutors">
                <IoPeople />
                  Applied Tutors
                </ActiveBtn>
              </li>

              <li>
                <ActiveBtn to="/dashboard/payment-history">
                <MdOutlinePayment />
                  Payment History
                </ActiveBtn>
              </li>

              <li>
                <ActiveBtn to="/dashboard/profile-settings">
                <IoIosSettings />
                  Profile Settings
                </ActiveBtn>
              </li>
                  </>
                 )
              }
              {
                role === "tutor" && (
                  <>
                  <li>
                <ActiveBtn to="/dashboard/tutor-profile">
                <IoIosSettings />
                  Tutor Profile Settings
                </ActiveBtn>
              </li>         
              <li>
                <ActiveBtn to="/dashboard/my-applications">
                <BsSendCheckFill />
                  My Applications
                </ActiveBtn>
              </li>
              <li>
                <ActiveBtn to="/dashboard/revenue-history">
                <FaHandHoldingDollar />
                 Revenue History
                </ActiveBtn>
              </li>
              <li>
                <ActiveBtn to="/dashboard/ongoing-tuitions">
                <FaRegCircleRight />
                Ongoing Tuitions
                </ActiveBtn>
              </li>
                  </>
                )
              }

              {
                 role === "admin" && (
                  <>
                  <li>
                <ActiveBtn to="/dashboard/tuition-management">
                <IoIosSettings />
                  Tuition Management
                </ActiveBtn>
              </li>
                  </>
                 )
              }
            </ul>

            {/* ===== LOGOUT (BOTTOM FIXED) ===== */}
            <div className="pt-4">
              <button
                onClick={handleLogOut}
                className="btn bg-blue-100 text-blue-600 w-full"
              >
                Logout
                <IoIosLogOut />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
