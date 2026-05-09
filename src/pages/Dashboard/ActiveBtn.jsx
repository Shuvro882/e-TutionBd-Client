import React from 'react';
import { NavLink } from 'react-router';

const ActiveBtn = ({ to, children }) => {
    return (
        <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "bg-blue-100 text-blue-600 font-semibold rounded-lg px-3 py-2"
          : "hover:bg-base-300 rounded-lg px-3 py-2"
      }
    >
      {children}
    </NavLink>
    );
};

export default ActiveBtn;