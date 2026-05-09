import React from "react";
import Logo from "../../../Components/logo/Logo";
import MyLinks from "./MyLinks";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";


const Navbar = () => {

  const {user, logOut} = useAuth();
  console.log(user);

  const handleLogOut = () =>{
     logOut()
     .then()
     .catch(error =>{
       console.log(error)
     })

  }

  const links = (
    <>
      <li><MyLinks to="/">Home</MyLinks></li>
      <li><MyLinks to="1">Tuition</MyLinks></li>
      <li><MyLinks to="1">Tutor</MyLinks></li>
      <li><MyLinks to="1">About</MyLinks></li>
      <li><MyLinks to="/contacts">Contact</MyLinks></li>
    
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
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
        <ul className="menu menu-horizontal px-1">
         {links}
        </ul>
      </div>
      <div className="navbar-end">
  {user ? (
    <div className="flex items-center gap-3">

      {/* Profile Dropdown */}
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
            src={user?.photoURL || "https://i.pravatar.cc/150"}
            alt="profile"
            />
          </div>
        </label>

        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <span className="font-semibold">{user?.displayName || "User"}</span>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <button onClick={handleLogOut} className="text-red-500">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Link to="/logins" className="btn btn-ghost">
        Log in
      </Link>

      <Link to="/registration" className="btn btn-primary text-white">
        Register
      </Link>
    </div>
  )}
</div>
    </div>
  );
};

export default Navbar;
