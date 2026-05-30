import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/loading/Loading";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  
  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const users = data?.users || [];

  // Role change
  const handleRoleChange = async (id, role) => {
    await axiosSecure.patch(`/users/${id}/role`, { role });
    refetch();
  };

  // Delete user
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;

    await axiosSecure.delete(`/users/${id}`);
    refetch();
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        User Management
      </h2>

      {/* Table */}
      <div className="overflow-x-auto shadow">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>

                {/* Role */}
                <td>
                  <span className="px-2 py-1 rounded text-white text-sm bg-gray-500">
                    {u.role}
                  </span>
                </td>

                <td>{u.phone || "N/A"}</td>

                {/* Actions */}
                <td className="flex gap-2">
                  {/* Role change */}
                  <select
                    className="select select-xs select-bordered"
                    value={u.role}
                    onChange={(e) =>
                      handleRoleChange(u._id, e.target.value)
                    }
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;