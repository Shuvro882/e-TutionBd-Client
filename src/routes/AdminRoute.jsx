import React from 'react';
import Loading from '../Components/loading/Loading';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import ErrorPage from '../pages/errorPage/ErrorPage';

const AdminRoute = ({children}) =>{
    const {loading} = useAuth();
    const {role, roleLoading} = useRole();



    if(loading || roleLoading) {
        return <Loading></Loading>
    }

    if(role !== 'admin'){
        return <ErrorPage></ErrorPage>
    }
    return children;
};
export default AdminRoute;