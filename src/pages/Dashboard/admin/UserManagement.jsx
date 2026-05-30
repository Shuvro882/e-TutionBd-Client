import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/loading/Loading";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const limit = 10;

  // Load users with search + pagination
  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-users", search, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?search=${search}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const users = data?.users || [];
  const total = data?.total || 0;

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

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        className="input input-bordered w-full mb-4"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
      />

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

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-5">
        <button
          className="btn btn-sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Prev
        </button>

        <span className="px-3 py-1">
          Page {page + 1}
        </span>

        <button
          className="btn btn-sm"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={(page + 1) * limit >= total}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;