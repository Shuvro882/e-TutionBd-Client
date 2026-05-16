import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/loading/Loading";

const TuitionManagement = () => {
  const axiosSecure = useAxiosSecure();

  //  Load all tuitions (Admin)
  const {
    data: tuitions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-tuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/tuitions");
      return res.data;
    },
  });

  //  Approve / Reject Handler
  const handleStatus = async (id, status) => {
    await axiosSecure.patch(`/tuitions/status/${id}`, {
      status,
    });

    
    refetch();
  };

  if (isLoading) 
     return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Tuition Management
      </h2>

      <div className="overflow-x-auto shadow">
        <table className="table w-full ">
          <thead className="bg-base-200">
            <tr className="">
              <th>Student Email</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tuitions.map((t) => (
              <tr key={t._id}>
                <td>{t.postedEmail}</td>
                <td>{t.subjects}</td>
                <td>{t.class}</td>
                <td>{t.budget}</td>

                {/* Status Badge */}
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      t.status === "Approved"
                        ? "bg-green-500"
                        : t.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>

                {/* Buttons */}
                <td className="flex gap-2">
                  <button
                    onClick={() => handleStatus(t._id, "Approved")}
                    className="btn btn-xs btn-success"
                    disabled={t.status === "Approved"}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleStatus(t._id, "Rejected")}
                    className="btn btn-xs btn-error"
                    disabled={t.status === "Rejected"}
                  >
                    Reject
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

export default TuitionManagement;