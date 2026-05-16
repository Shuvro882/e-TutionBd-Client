import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/loading/Loading";
import Swal from "sweetalert2";
import { IoPersonSharp } from "react-icons/io5";
import { FaMapMarkerAlt, FaCalendarAlt, FaMoneyBill } from "react-icons/fa";

const TuitionPostDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Tuition Data
  const { data: tuition = {}, isLoading } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${id}`);
      return res.data;
    },
  });

  // Logged User Data From DB
  const { data: dbUser = {} } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // Apply Function
  const handleApply = async () => {
    // Login Check
    if (!user?.email) {
      return Swal.fire("Login Required", "Please login first", "warning");
    }

    // Role Check
    if (dbUser?.role !== "tutor") {
      return Swal.fire("Access Denied", "Only tutors can apply", "error");
    }

    //  CONFIRMATION MODAL
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to apply for this tuition?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Apply",
      cancelButtonText: "Cancel",
    });

    
    if (!result.isConfirmed) {
      return;
    }

    try {
      const applyInfo = {
        tuitionId: tuition._id,
        studentEmail: tuition.postedEmail,
        tutorEmail: user.email,
        tutorName: user.displayName,
        tutorImage: dbUser.photoURL,
        subject: tuition.subject,
        className: tuition.className,
        budget: tuition.budget,
        location: tuition.location,
        status: "pending",
        appliedAt: new Date(),
      };

      const res = await axiosSecure.post("/applications", applyInfo);

      if (res.data.insertedId) {
        Swal.fire("Success", "Application sent successfully", "success");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/*  LEFT GRID  */}
        <div className="lg:col-span-2 space-y-6">
  {/* MAIN DETAILS */}
  <div className="bg-white shadow-md rounded-2xl p-6 border">
    <h2 className="text-2xl font-bold text-gray-800">
      Tuition Subject: {tuition.subjects}
    </h2>

    <p className="text-gray-500 text-xl mt-1">
      Class: {tuition.class}
    </p>

    {/* BASIC INFO */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-gray-700">

      {/* LOCATION */}
      <div className="p-3 shadow-sm rounded-lg bg-white">
        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-blue-500 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-semibold">{tuition.location}</p>
          </div>
        </div>
      </div>

      {/* TIME */}
      <div className="p-3 shadow-sm rounded-lg bg-white">
        <div className="flex items-start gap-3">
          <FaCalendarAlt className="text-blue-500 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Preferred Time</p>
            <p className="font-semibold">{tuition.time}</p>
          </div>
        </div>
      </div>

      {/* BUDGET */}
      <div className="p-3 shadow-sm rounded-lg bg-white">
        <div className="flex items-start gap-3">
          <FaMoneyBill className="text-blue-500 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Budget</p>
            <p className="font-semibold">{tuition.budget}</p>
          </div>
        </div>
      </div>

      {/* GENDER */}
      <div className="p-3 shadow-sm rounded-lg bg-white">
        <div className="flex items-start gap-3">
          <IoPersonSharp className="text-blue-500 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Preferred Tutor</p>
            <p className="font-semibold">
              {tuition.gender} Tutor
            </p>
          </div>
        </div>
      </div>

    </div>

    {/* EXTRA DETAILS */}
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">

      <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
        <p className="text-sm text-gray-500">Weekly Days</p>
        <p className="font-semibold">
          {tuition.days || "Not specified"}
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
        <p className="text-sm text-gray-500">Medium</p>
        <p className="font-semibold">
          {tuition.medium || "Bangla / English"}
        </p>
      </div>

    </div>

  </div>
</div>

        {/*  RIGHT GRID  */}
        <div className="space-y-6">
          {/* POST INFO CARD */}
          <div className="bg-white shadow-md rounded-2xl p-6 border">
            <h3 className="text-lg font-bold mb-4">Posted By</h3>

            <div className="space-y-2 text-gray-600 text-sm">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {tuition.postedName || "Unknown"}
              </p>

              <p>
                <span className="font-semibold">Email:</span>{" "}
                {tuition.postedEmail}
              </p>

              <p>
                <span className="font-semibold">Date:</span>{" "}
                {tuition.createdAt &&
                  new Date(tuition.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* APPLY CARD */}
          <div className="bg-white shadow-md rounded-2xl p-6 border">
            <h3 className="text-lg font-bold mb-4">Apply for Tuition</h3>

            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full w-fit mb-4">
              <IoPersonSharp className="text-blue-500" />
              <span>{tuition.gender} Tutor Only</span>
            </div>

            <button
              onClick={handleApply}
              className="w-full py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionPostDetails;
