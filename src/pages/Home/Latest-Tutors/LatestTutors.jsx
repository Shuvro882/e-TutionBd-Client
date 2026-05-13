import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCircleArrowRight } from "react-icons/fa6";
import Loading from "../../../Components/loading/Loading"

const LatestTutors = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["latestTutors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors?limit=6");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">

      {/* heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Latest Tutors</h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Connect with experienced and verified tutors for the best learning experience.
        </p>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="
              bg-base-100 
              border 
              border-gray-200
              rounded-2xl
              p-3
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
            <div className="flex flex-col items-center text-center">

              <div className="relative">
                <img
                  src={
                    tutor.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  className="
                    w-18 h-18
                    rounded-full
                    object-cover
                    border-4
                    border-blue-100
                    group-hover:border-blue-400
                    transition-all
                  "
                  alt=""
                />

                <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              {/* name */}
              <h3 className="text-lg font-bold mt-3">
                {tutor.displayName}
              </h3>

              {/* role */}
              <p className="text-blue-600 text-sm font-semibold mt-1">
                {tutor.role}
              </p>

              {/* rating */}
              <div className="flex items-center gap-1 mt-2">
                <FaStar className="text-yellow-400 text-sm" />
                <FaStar className="text-yellow-400 text-sm" />
                <FaStar className="text-yellow-400 text-sm" />
                <FaStar className="text-yellow-400 text-sm" />
                <FaStar className="text-yellow-400 text-sm" />

                <span className="text-gray-500 ml-1 text-xs">
                  (5.0)
                </span>
              </div>
            </div>

            {/* info */}
            <div className="mt-4 space-y-2 text-sm">

              <div className="bg-base-200 rounded-lg px-3 py-2">
                <p className="text-gray-500 text-xs">Email</p>
                <p className="truncate">{tutor.email}</p>
              </div>

              <div className="bg-base-200 rounded-lg px-3 py-2">
                <p className="text-gray-500 text-xs">Phone</p>
                <p>{tutor.phoneNumber}</p>
              </div>

            </div>

            {/* button */}
            <Link to={`/tutors/${tutor._id}`}
              className="
                btn
                btn-sm
                bg-blue-600
                hover:bg-blue-700
                border-none
                text-white
                rounded-lg
                w-full
                mt-4
              "
            >
              View Details
            </Link>

          </div>
        ))}

      </div>

      {/* see all */}
      <div className="text-center mt-12">
        <Link
          to="/all-tutors"
          className="btn btn-outline btn-sm border-blue-500 text-xl text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-6 rounded-lg"
        >
          See All Tutors
          <FaCircleArrowRight />
        </Link>
      </div>

    </div>
  );
};

export default LatestTutors;