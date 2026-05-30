import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/loading/Loading";
import { Link } from "react-router";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  // Load dashboard stats 
  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats"); 
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const {
    totalUsers = 0,
    totalTutors = 0,
    totalTuitions = 0,
    approvedTuitions = 0,
    totalRevenue = 0,
    pendingTuitions = 0,
  } = data;

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <h2 className="text-2xl font-bold text-center">
        Admin Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="p-4 rounded-lg shadow bg-base-200">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>

        <div className="p-4 rounded-lg shadow bg-base-200">
          <h3 className="text-lg font-semibold">Total Tutors</h3>
          <p className="text-2xl font-bold">{totalTutors}</p>
        </div>

        <div className="p-4 rounded-lg shadow bg-base-200">
          <h3 className="text-lg font-semibold">Total Tuitions</h3>
          <p className="text-2xl font-bold">{totalTuitions}</p>
        </div>

        <div className="p-4 rounded-lg shadow bg-base-200">
          <h3 className="text-lg font-semibold">Approved Tuitions</h3>
          <p className="text-2xl font-bold">{approvedTuitions}</p>
        </div>

        <div className="p-4 rounded-lg shadow bg-base-200">
          <h3 className="text-lg font-semibold">Pending Tuitions</h3>
          <p className="text-2xl font-bold">{pendingTuitions}</p>
        </div>

        <div className="p-4 rounded-lg shadow bg-base-200">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold">৳ {totalRevenue}</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Quick Actions</h3>

        <div className="flex flex-wrap gap-3">

          <Link to="/dashboard/user-management" className="btn btn-primary">
            Manage Users
          </Link>

          <Link to="/dashboard/tuition-management" className="btn btn-secondary">
            Manage Tuitions
          </Link>

        </div>
      </div>

    </div>
  );
};

export default AdminHome;