import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';
import Loading from '../Components/loading/Loading';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();

    if(loading){
        return <div>
            <Loading></Loading>
        </div>
    }

    if(!user){
        return <Navigate to="/logins"></Navigate>
    }
    
    return children;
};

export default PrivateRoute;