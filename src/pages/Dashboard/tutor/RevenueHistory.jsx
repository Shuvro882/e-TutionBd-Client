import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/loading/Loading";

const RevenueHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // GET PAYMENTS (ALL)
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["tutor-revenue", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/tutor?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // FILTER ONLY THIS TUTOR
  const tutorPayments = payments.filter(
    (p) => p.tutorEmail === user.email
  );

  // TOTAL REVENUE
  const totalRevenue = tutorPayments.reduce(
    (sum, p) => sum + Number(p.amountBDT || 0),
    0
  );

  return (
    <div className="p-4 md:p-6">

      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-6">
        Revenue History
      </h2>

      {/* TOTAL CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow">
          <h3 className="text-lg">Total Revenue</h3>
          <p className="text-3xl font-bold">
            ৳ {totalRevenue}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="table table-zebra w-full">

          <thead>
            <tr>
              <th>#</th>
              <th>Student Email</th>
              <th>Tuition ID</th>
              <th>Amount (BDT)</th>
              <th>Amount (USD)</th>
              <th>Transaction ID</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {tutorPayments.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>

                <td>{p.studentEmail}</td>

                <td className="text-xs">
                  {p.tuitionId}
                </td>

                <td>৳ {p.amountBDT}</td>

                <td>${p.amountUSD}</td>

                <td className="text-xs">
                  {p.transactionId}
                </td>

                <td>
                  {new Date(p.paidAt).toLocaleDateString()}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default RevenueHistory;