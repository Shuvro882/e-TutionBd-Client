import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  FaMapMarkerAlt,
  FaBookOpen,
} from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/loading/Loading";

const AllTuition = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ["allTuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/approved-tuitions");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">

      {/* heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">
          All Tuition Posts
        </h2>

        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Browse all approved tuition opportunities and find the perfect match for your teaching career.
        </p>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {tuitions.map((tuition) => (
          <div
            key={tuition._id}
            className="
              bg-base-100
              border
              border-gray-200
              rounded-2xl
              p-5
              shadow-sm
              hover:shadow-xl
              hover:border-blue-400
              transition-all
              duration-300
              hover:-translate-y-1
              group
            "
          >

            {/* top */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold group-hover:text-blue-600">
                  {tuition.subjects}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Class: {tuition.class}
                </p>
              </div>

              <div className="badge badge-success text-white">
                Approved
              </div>
            </div>

            <div className="border border-gray-100 mt-2"></div>

            {/* info */}
            <div className="mt-5 space-y-3 text-sm">

              <div className="flex items-center gap-2 text-gray-600">
                <FaMapMarkerAlt className="text-blue-500" />
                <span>{tuition.location}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <FaBookOpen className="text-blue-500" />
                <span>{tuition.time}</span>
              </div>

            </div>

            {/* gender + date */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">

              <div className="bg-base-200 px-3 py-1 rounded-full flex items-center gap-1">
                <IoPersonSharp />
                <span>{tuition.gender} Tutor</span>
              </div>

              <p>
                Posted:{" "}
                {new Date(tuition.createdAt).toLocaleDateString()}
              </p>

            </div>

            {/* budget */}
            <div className="mt-5 bg-base-200 rounded-xl p-3">
              <p className="text-xs text-gray-500">
                Monthly Budget
              </p>

              <h4 className="text-2xl font-bold text-blue-600">
                ৳ {tuition.budget}
              </h4>
            </div>

            {/* button */}
            <Link
              to={`/tuition-post-details/${tuition._id}`}
              className="
                btn
                btn-sm
                bg-blue-600
                hover:bg-blue-700
                border-none
                text-white
                rounded-lg
                w-full
                mt-5
              "
            >
              View Details
            </Link>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AllTuition;