import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/loading/Loading";

const StudentHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const email = user?.email;

  // TUITIONS
  const { data: tuitions = [], isLoading: tLoading } = useQuery({
    queryKey: ["student-tuitions", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions?email=${email}`);
      return res.data;
    },
  });

  // APPLICATIONS
  const { data: applications = [], isLoading: aLoading } = useQuery({
    queryKey: ["student-applications", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/student/${email}`);
      return res.data;
    },
  });

  // PAYMENTS
  const { data: payments = [], isLoading: pLoading } = useQuery({
    queryKey: ["student-payments", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${email}`);
      return res.data;
    },
  });

  if (tLoading || aLoading || pLoading) return <Loading />;

  return (
    <div className="p-6 space-y-8">

      {/* WELCOME */}
      <div className="bg-base-200 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold">
          Welcome back, {user?.displayName}
        </h2>
        <p className="text-sm opacity-70">
          Manage your tuitions, tutors and payments
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="p-4 bg-base-200 rounded shadow">
          <h3>Total Tuitions</h3>
          <p className="text-2xl font-bold">{tuitions.length}</p>
        </div>

        <div className="p-4 bg-base-200 rounded shadow">
          <h3>Applications</h3>
          <p className="text-2xl font-bold">{applications.length}</p>
        </div>

        <div className="p-4 bg-base-200 rounded shadow">
          <h3>Approved Tutors</h3>
          <p className="text-2xl font-bold">
            {
              applications.filter((a) => a.status === "approved").length
            }
          </p>
        </div>

        <div className="p-4 bg-base-200 rounded shadow">
          <h3>Total Payments</h3>
          <p className="text-2xl font-bold">{payments.length}</p>
        </div>
      </div>

      {/* MY TUITIONS */}
      <div className="bg-base-200 p-4 rounded shadow">
        <h3 className="font-semibold mb-3">My Recent Tuitions</h3>

        <div className="space-y-2">
          {tuitions.slice(0, 3).map((t) => (
            <div
              key={t._id}
              className="flex justify-between p-2 bg-base-100 rounded"
            >
              <p>{t.subjects}</p>
              <span className="text-sm">{t.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* APPLICATIONS */}
      <div className="bg-base-200 p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Recent Applications</h3>

        <div className="space-y-2">
          {applications.slice(0, 3).map((a) => (
            <div
              key={a._id}
              className="flex justify-between p-2 bg-base-100 rounded"
            >
              <p>{a.tutorEmail}</p>
              <span className="text-sm">{a.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PAYMENTS */}
      <div className="bg-base-200 p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Recent Payments</h3>

        <div className="space-y-2">
          {payments.slice(0, 3).map((p) => (
            <div
              key={p._id}
              className="flex justify-between p-2 bg-base-100 rounded"
            >
              <p>{p.tutorEmail}</p>
              <p>৳ {p.amountBDT}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default StudentHome;