import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/loading/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
  } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Payment History
      </h2>

      {payments.length === 0 ? (
        <p className="text-gray-500">No payments found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Tutor Email</th>
                <th>Tuition ID</th>
                <th>Amount (BDT)</th>
                <th>Amount (USD)</th>
                <th>Transaction ID</th>
                <th>Paid At</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p, index) => (
                <tr key={p._id}>
                  <td>{index + 1}</td>
                  <td>{p.tutorEmail}</td>
                  <td>{p.tuitionId}</td>
                  <td>{p.amountBDT}</td>
                  <td>${p.amount}</td>
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
      )}
    </div>
  );
};

export default PaymentHistory;