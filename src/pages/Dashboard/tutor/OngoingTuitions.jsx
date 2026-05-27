import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/loading/Loading";

const OngoingTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // GET ONGOING TUITIONS
  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ["tutor-ongoing", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications/tutor/ongoing/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // TOTAL ONGOING
  const totalOngoing = tuitions.length;

  return (
    <div className="p-4 md:p-6">

      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-6">
        Ongoing Tuitions
      </h2>

      {/* SUMMARY CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow">
          <h3 className="text-lg">Total Ongoing</h3>
          <p className="text-3xl font-bold">
            {totalOngoing}
          </p>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {tuitions.map((t) => (
          <div
            key={t._id}
            className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition"
          >

            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-bold">
                {t.subject || "Subject N/A"}
              </h3>

              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                Ongoing
              </span>
            </div>

            {/* INFO */}
            <div className="space-y-2 text-sm">

              <p>
                <span className="font-semibold">Student:</span>{" "}
                {t.studentEmail}
              </p>

              <p>
                <span className="font-semibold">Tuition ID:</span>{" "}
                <span className="text-xs">{t.tuitionId}</span>
              </p>

              <p>
                <span className="font-semibold">Salary:</span>{" "}
                ৳ {t.budget || t.amountBDT || "N/A"}
              </p>

              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="text-green-600 font-semibold">
                  Active
                </span>
              </p>

              <p>
                <span className="font-semibold">Approved Date:</span>{" "}
                {t.paidAt
                  ? new Date(t.paidAt).toLocaleDateString()
                  : "N/A"}
              </p>

            </div>

            {/* ACTION */}
            <div className="mt-4 flex gap-2">
              <button className="btn btn-sm bg-primary text-white">
                View Details
              </button>

              <button className="btn btn-sm btn-outline">
                Contact Student
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {tuitions.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg font-semibold">
            No ongoing tuitions found
          </p>
        </div>
      )}
    </div>
  );
};

export default OngoingTuitions;