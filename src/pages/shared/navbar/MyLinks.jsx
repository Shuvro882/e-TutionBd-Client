import React from 'react';
import { NavLink } from 'react-router';

const MyLinks = ({to,className,children}) => {
    return (
           <NavLink to={to} className={({isActive}) => 
           isActive ? "text-primary underline" : 
           `${className || ""} font-semibold`}>
           
           {children}
      </NavLink>  
    );
};

export default MyLinks;