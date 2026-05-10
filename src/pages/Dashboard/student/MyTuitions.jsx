import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../../Components/loading/Loading";

const MyTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: tuitions = [], refetch, isLoading } = useQuery({
    queryKey: ["myTuitions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions?email=${user.email}`);
      return res.data;
    },
  });

  const approved = tuitions.filter((tuition) => tuition.status === "Approved");

  const pending = tuitions.filter((tuition) => tuition.status === "Pending");

  if (isLoading) {
  return <Loading />;
}

  const handleTuitionDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.delete(`/tuitions/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your tuition post has been deleted.",
              icon: "success",
            });
          }
        });
    });
  };

  return (
    <div className="p-4 md:p-6">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">My Tuitions</h2>
        <p className="text-gray-500 mt-1">
          Manage all your tuition posts here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-base-100 shadow rounded-2xl p-5 border">
          <h3 className="text-lg font-semibold">Total Tuitions</h3>
          <p className="text-3xl font-bold text-primary mt-2">
            {tuitions.length}
          </p>
        </div>

        <div className="bg-base-100 shadow rounded-2xl p-5 border">
          <h3 className="text-lg font-semibold">Approved</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">
            {approved.length}
          </p>
        </div>

        <div className="bg-base-100 shadow rounded-2xl p-5 border">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">
            {pending.length}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {tuitions.length === 0 ? (
        <div className="bg-base-100 shadow rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold mb-2">No Tuition Posted Yet</h2>
          <p className="text-gray-500">You have not posted any tuition yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow rounded-2xl">
          <table className="table table-zebra">
            <thead className="bg-base-200">
              <tr>
                <th>SL</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Location</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Applications</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tuitions.map((tuition, index) => (
                <tr key={tuition._id}>
                  <td>{index + 1}</td>

                  <td className="font-medium">{tuition.subjects}</td>

                  <td>{tuition.class}</td>

                  <td>{tuition.location}</td>

                  <td>৳ {tuition.budget}</td>

                  <td>
                    <span
                      className={`badge text-white
                        ${
                          tuition.status === "Approved"
                            ? "badge-success"
                            : tuition.status === "Pending"
                              ? "badge-warning"
                              : "badge-error"
                        }`}
                    >
                      {tuition.status}
                    </span>
                  </td>

                  <td>{tuition.applicationsCount || 0}</td>

                  <td>
                    <div className="flex items-center gap-2">
                      <button className="btn btn-sm btn-info text-white">
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => handleTuitionDelete(tuition._id)}
                        className="btn btn-sm btn-error text-white"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyTuitions;
