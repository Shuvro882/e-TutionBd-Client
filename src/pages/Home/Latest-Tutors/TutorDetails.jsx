import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/loading/Loading";
import { FaStar } from "react-icons/fa";

const TutorDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: tutor, isLoading } = useQuery({
    queryKey: ["tutor-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutors/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      {/* Main Card */}
      <div className="bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-gray-200">

        {/* Top Banner */}
        <div className="bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 h-36 relative">

          {/* Profile Image */}
          <div className="absolute left-1/2 -bottom-14 transform -translate-x-1/2">
            <img
              src={
                tutor.photoURL ||
                "https://i.ibb.co/4pDNDk1/avatar.png"
              }
              alt="Tutor"
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-xl"
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 pb-8 px-6 md:px-10">

          {/* Name & Role */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              {tutor.displayName}
            </h2>

            <p className="text-blue-600 font-medium mt-1 capitalize">
              {tutor.role}
            </p>

            {/* Rating */}
            <div className="flex justify-center items-center gap-1 mt-3">
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />

              <span className="ml-2 text-gray-500 text-sm">
                (5.0 Ratings)
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">

            {/* Email */}
            <div className="bg-base-200 rounded-2xl p-5 hover:shadow-md transition">
              <p className="text-sm text-gray-500 mb-1">
                Email Address
              </p>

              <h3 className="font-semibold break-all">
                {tutor.email}
              </h3>
            </div>

            {/* Phone */}
            <div className="bg-base-200 rounded-2xl p-5 hover:shadow-md transition">
              <p className="text-sm text-gray-500 mb-1">
                Phone Number
              </p>

              <h3 className="font-semibold">
                {tutor.phoneNumber || "Not Available"}
              </h3>
            </div>

            {/* Qualification */}
            <div className="bg-base-200 rounded-2xl p-5 hover:shadow-md transition">
              <p className="text-sm text-gray-500 mb-1">
                Qualification
              </p>

              <h3 className="font-semibold">
                {tutor.qualification || "Not Added"}
              </h3>
            </div>

            {/* Experience */}
            <div className="bg-base-200 rounded-2xl p-5 hover:shadow-md transition">
              <p className="text-sm text-gray-500 mb-1">
                Experience
              </p>

              <h3 className="font-semibold">
                {tutor.experience || "0"} Years
              </h3>
            </div>

            {/* Salary */}
            <div className="bg-base-200 rounded-2xl p-5 hover:shadow-md transition">
              <p className="text-sm text-gray-500 mb-1">
                Expected Salary
              </p>

              <h3 className="font-semibold text-green-600">
                ৳ {tutor.expectedSalary || "Negotiable"}
              </h3>
            </div>

            {/* Availability */}
            <div className="bg-base-200 rounded-2xl p-5 hover:shadow-md transition">
              <p className="text-sm text-gray-500 mb-1">
                Availability
              </p>

              <h3 className="font-semibold text-green-500">
                {tutor.availability || "Available"}
              </h3>
            </div>
          </div>

          {/* About */}
          <div className="mt-8 bg-base-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-3">
              About Tutor
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {tutor.about ||
                "An experienced and dedicated tutor passionate about helping students achieve academic success through personalized learning methods and consistent guidance."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;