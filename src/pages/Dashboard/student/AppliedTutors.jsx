import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/loading/Loading";

const AppliedTutors = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications/student/${user.email}`
      );
      return res.data;
    },
  });

  // ACCEPT
  const acceptMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/applications/accept/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
    },
  });

  // REJECT
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/applications/reject/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
    },
  });

  // PAYMENT COMPLETE (simulate)
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/applications/approve/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
    },
  });

  if (isLoading) return <Loading />;

  const total = applications.length;
  const pending = applications.filter(a => a.status === "pending").length;
  const approved = applications.filter(a => a.status === "approved").length;

  return (
    <div className="p-4 md:p-6">

      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6">Applied Tutors</h2>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded">
          Total: {total}
        </div>
        <div className="p-4 bg-white shadow rounded">
          Pending: {pending}
        </div>
        <div className="p-4 bg-white shadow rounded">
          Approved: {approved}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="table">
          <thead>
            <tr>
              <th>Tutor</th>
              <th>Location</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map(app => (
              <tr key={app._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={app.tutorImage}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold">{app.tutorName}</p>
                      <p className="text-sm text-gray-500">
                        {app.tutorEmail}
                      </p>
                    </div>
                  </div>
                </td>

                <td>{app.location}</td>
                <td>{app.budget}</td>

                <td>
                  <span className="badge">
                    {app.status}
                  </span>
                </td>

                <td className="flex gap-2">

                  {/* ACCEPT */}
                  {app.status === "pending" && (
                    <button
                      onClick={() => acceptMutation.mutate(app._id)}
                      className="btn btn-success btn-sm"
                    >
                      Accept
                    </button>
                  )}

                  {/* PAYMENT BUTTON */}
                  {app.status === "accepted" && (
                    <button
                      onClick={() => approveMutation.mutate(app._id)}
                      className="btn btn-primary btn-sm"
                    >
                      Pay & Approve
                    </button>
                  )}

                  {/* REJECT */}
                  {app.status === "pending" && (
                    <button
                      onClick={() => rejectMutation.mutate(app._id)}
                      className="btn btn-error btn-sm"
                    >
                      Reject
                    </button>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AppliedTutors;