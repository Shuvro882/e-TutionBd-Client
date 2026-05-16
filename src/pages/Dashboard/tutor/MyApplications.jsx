import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/loading/Loading";
import Swal from "sweetalert2";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // GET applications
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["myApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications/tutor/${user.email}`
      );
      return res.data;
    },
  });

  // DELETE application
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/applications/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myApplications"]);
      Swal.fire("Deleted", "Application removed", "success");
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-6">

      <h2 className="text-2xl font-bold mb-6">
        My Applications
      </h2>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="table">

          <thead>
            <tr>
              <th>Location</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Applied At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>

                <td>{app.location}</td>

                <td>৳ {app.budget}</td>

                <td>
                  <span
                    className={`badge ${
                      app.status === "pending"
                        ? "badge-warning"
                        : app.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>

                <td>
                  {new Date(app.appliedAt).toLocaleDateString()}
                </td>

                <td>
                  {app.status === "pending" && (
                    <button
                      onClick={() =>
                        deleteMutation.mutate(app._id)
                      }
                      className="btn btn-sm btn-error text-white"
                    >
                      Delete
                    </button>
                  )}

                  {app.status !== "pending" && (
                    <button
                      disabled
                      className="btn btn-sm"
                    >
                      Locked
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

export default MyApplications;