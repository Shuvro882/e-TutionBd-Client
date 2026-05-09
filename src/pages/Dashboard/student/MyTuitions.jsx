import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import axios from 'axios';

const MyTuitions = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: tuitions = []} = useQuery({
        queryKey:['myTuitions', user?.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/tuitions?email=${user.email}`);
            return res.data;
        }
    })

    return (
        <div>
            <h2>all of my tuitions: {tuitions.length}</h2>
        </div>
    );
};

export default MyTuitions;