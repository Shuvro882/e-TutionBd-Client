import React, { useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/loading/Loading";
import { useLocation } from "react-router";
import Swal from "sweetalert2";

const AppliedTutors = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const location = useLocation();
  const paymentProcessed = useRef(false);

  
  // FETCH APPLICATIONS
  
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/student/${user.email}`);

      return res.data;
    },
  });

 
  // REJECT APPLICATION
  
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/applications/reject/${id}`);

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      Swal.fire({
        icon: "success",
        title: "Application Rejected",
        timer: 1500,
        showConfirmButton: false,
      });
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
      });
    },
  });

  
  // HANDLE PAYMENT
  
  const handlePayment = async (app) => {
    try {
      const paymentInfo = {
        applicationId: app._id,
        tuitionId: app.tuitionId,
        tutorName: app.tutorName,
        tutorEmail: app.tutorEmail,
        studentEmail: user.email,
        budget: app.budget,
      };

      const res = await axiosSecure.post(
        "/payment-checkout-session",
        paymentInfo,
      );

      // REDIRECT TO STRIPE
      window.location.assign(res.data.url);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Payment Failed",
      });
    }
  };

  
  // STRIPE SUCCESS / CANCEL
  
  useEffect(() => {
    const query = new URLSearchParams(location.search);

    const sessionId = query.get("session_id");
    const appId = query.get("appId");
    const cancel = query.get("cancel");

    // CANCEL
    if (cancel) {
      Swal.fire({
        icon: "warning",
        title: "Payment Cancelled",
        timer: 1500,
        showConfirmButton: false,
      });

      // URL CLEAN
      window.history.replaceState({}, document.title, location.pathname);
    }

    // SUCCESS
    if (sessionId && appId && !paymentProcessed.current) {
      const updatePayment = async () => {
        try {
          paymentProcessed.current = true;
          await axiosSecure.patch(`/applications/payment-success/${appId}`, {
            transactionId: sessionId,
          });

          // REFETCH
          queryClient.invalidateQueries({
            queryKey: ["applications"],
          });

          Swal.fire({
            icon: "success",
            title: "Tutor Approved Successfully",
            timer: 1500,
            showConfirmButton: false,
          });

          // URL CLEAN
          window.history.replaceState({}, document.title, location.pathname);
        } catch (error) {
          console.log(error);

          Swal.fire({
            icon: "error",
            title: "Payment Update Failed",
          });
        }
      };

      updatePayment();
    }
  }, [location.search, location.pathname, axiosSecure, queryClient]);

  
  // LOADING
  
  if (isLoading) {
    return <Loading />;
  }

 
  // STATS
 
  const total = applications.length;

  const pending = applications.filter((a) => a.status === "pending").length;

  const approved = applications.filter((a) => a.status === "approved").length;

  return (
    <div className="p-4 md:p-6">
      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6">Applied Tutors</h2>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="text-xl font-bold">Total</h3>

          <p className="text-2xl">{total}</p>
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="text-xl font-bold">Pending</h3>

          <p className="text-2xl">{pending}</p>
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="text-xl font-bold">Approved</h3>

          <p className="text-2xl">{approved}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
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
            {applications.map((app) => (
              <tr key={app._id}>
                {/* TUTOR */}
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={app.tutorImage}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <p className="font-bold">{app.tutorName}</p>

                      <p className="text-sm text-gray-500">{app.tutorEmail}</p>
                    </div>
                  </div>
                </td>

                {/* LOCATION */}
                <td>{app.location}</td>

                {/* BUDGET */}
                <td>৳ {app.budget}</td>

                {/* STATUS */}
                <td>
                  <span
                    className={`badge ${
                      app.status === "approved"
                        ? "badge-success"
                        : app.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="flex gap-2">
                  {/* PAY BUTTON */}
                  {app.status === "pending" && (
                    <button
                      onClick={() => handlePayment(app)}
                      className="btn btn-primary btn-sm"
                    >
                      Approve & Pay
                    </button>
                  )}

                  {/* REJECT BUTTON */}
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
