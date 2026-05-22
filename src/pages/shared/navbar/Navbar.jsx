import React, { useState } from "react";
import Logo from "../../../Components/logo/Logo";
import MyLinks from "./MyLinks";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const axiosSecure = useAxiosSecure();

  const [isOpen, setIsOpen] = useState(false);

  const { user, logOut } = useAuth();
  console.log(user);

  const { data: dbUser = {} } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <MyLinks to="/">Home</MyLinks>
      </li>
      <li>
        <MyLinks to="/all-tuition">Tuition</MyLinks>
      </li>
      <li>
        <MyLinks to="/all-tutors">Tutor</MyLinks>
      </li>
      <li>
        <MyLinks to="/contacts">Contact</MyLinks>
      </li>
      <li>
        <MyLinks to="/about">About</MyLinks>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100/90 backdrop-blur sticky top-0 z-50 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <Logo></Logo>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="relative">
            {/* profile section */}
            <div
              className="
      flex items-center gap-3
      border border-base-300
      rounded-full
      px-3 py-1
    "
            >
              {/* name + role */}
              <div className="text-right hidden sm:block">
                <h3 className="font-semibold leading-4">
                  {dbUser?.displayName || "User"}
                </h3>

                <p className="text-xs text-primary capitalize">
                  {dbUser?.role || "student"}
                </p>
              </div>

              {/* image */}
              <img
                src={dbUser?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt=""
                className="w-11 h-11 rounded-full object-cover"
              />

              {/* arrow button only */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-ghost btn-sm btn-circle"
              >
                {isOpen ? (
                  <FaChevronUp className="text-xs" />
                ) : (
                  <FaChevronDown className="text-xs" />
                )}
              </button>
            </div>

            {/* dropdown */}
            {isOpen && (
              <div
                className="absolute right-0 mt-3
              w-36
              bg-base-100
              shadow-lg
              z-50"
              >
                <ul className="menu p-2">
                  <li>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <MdDashboard />
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        handleLogOut();
                        setIsOpen(false);
                      }}
                      className="text-red-500"
                    >
                      <IoIosLogOut />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/logins" className="btn btn-ghost">
              Log in
            </Link>

            <Link to="/registration" className="btn bg-primary text-white">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
