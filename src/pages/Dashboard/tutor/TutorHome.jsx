import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/loading/Loading";

const TutorHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const email = user?.email;

  // ALL APPLICATIONS
  const { data: applications = [], isLoading: aLoading } = useQuery({
    queryKey: ["tutor-applications", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/tutor/${email}`);
      return res.data;
    },
  });

  // ONGOING TUITIONS
  const { data: ongoing = [], isLoading: oLoading } = useQuery({
    queryKey: ["tutor-ongoing", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications/tutor/ongoing/${email}`
      );
      return res.data;
    },
  });

  // PAYMENTS
  const { data: payments = [], isLoading: pLoading } = useQuery({
    queryKey: ["tutor-payments", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/tutor?email=${email}`);
      return res.data;
    },
  });

  if (aLoading || oLoading || pLoading) return <Loading />;

  //  FIXED TOTAL EARNING CALCULATION
  const totalEarning = payments.reduce((sum, p) => {
    return sum + (p.amountBDT || p.amount || 0);
  }, 0);

  return (
    <div className="p-6 space-y-8">

      {/* WELCOME */}
      <div className="bg-base-200 p-6 rounded shadow">
        <h2 className="text-2xl font-bold">
          Welcome back, {user?.displayName}
        </h2>
        <p className="text-sm opacity-70">
          Track your applications, tuitions and earnings
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="p-4 bg-base-200 rounded shadow">
          <h3>Total Applications</h3>
          <p className="text-2xl font-bold">{applications.length}</p>
        </div>

        <div className="p-4 bg-base-200 rounded shadow">
          <h3>Ongoing Tuitions</h3>
          <p className="text-2xl font-bold">{ongoing.length}</p>
        </div>

        <div className="p-4 bg-base-200 rounded shadow">
          <h3>Total Earnings</h3>
          <p className="text-2xl font-bold">৳ {totalEarning}</p>
        </div>

      </div>

      {/* ONGOING TUITIONS */}
      <div className="bg-base-200 p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Ongoing Tuitions</h3>

        <div className="space-y-2">
          {ongoing.slice(0, 3).map((o) => (
            <div
              key={o._id}
              className="flex justify-between p-2 bg-base-100 rounded"
            >
              <p>{o.studentEmail}</p>
              <p className="text-green-500">Active</p>
            </div>
          ))}
        </div>
      </div>

      {/* APPLICATIONS */}
      <div className="bg-base-200 p-4 rounded shadow">
        <h3 className="font-semibold mb-3">My Applications</h3>

        <div className="space-y-2">
          {applications.slice(0, 3).map((a) => (
            <div
              key={a._id}
              className="flex justify-between p-2 bg-base-100 rounded"
            >
              <p>{a.tuitionId}</p>
              <span>{a.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PAYMENTS */}
      <div className="bg-base-200 p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Recent Earnings</h3>

        <div className="space-y-2">
          {payments.slice(0, 3).map((p) => (
            <div
              key={p._id}
              className="flex justify-between p-2 bg-base-100 rounded"
            >
              <p>{p.studentEmail}</p>
              <p>৳ {p.amountBDT || p.amount}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TutorHome;