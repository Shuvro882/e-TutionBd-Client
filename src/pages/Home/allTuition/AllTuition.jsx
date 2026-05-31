import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaBookOpen } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/loading/Loading";

const AllTuition = () => {
  const axiosSecure = useAxiosSecure();

  // input states (UI only)
  const [searchInput, setSearchInput] = useState("");

  // real API states
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [page, setPage] = useState(0);

  const limit = 6;

  //  Debounce search fix
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data = {}, isLoading } = useQuery({
    queryKey: [
      "allTuitions",
      search,
      sort,
      selectedClass,
      selectedSubject,
      selectedLocation,
      page,
    ],

    queryFn: async () => {
      const res = await axiosSecure.get("/approved-tuitions", {
        params: {
          search,
          sort,
          class: selectedClass,
          subject: selectedSubject,
          location: selectedLocation,
          page,
          limit,
        },
      });

      return res.data;
    },
  });

  const tuitions = data?.tuitions || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">

      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold">All Tuition Posts</h2>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Browse all approved tuition opportunities and find the perfect match.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="grid md:grid-cols-5 gap-3 mb-10">

        {/* SEARCH (FIXED) */}
        <input
          type="text"
          placeholder="Search subject or location"
          className="input input-bordered w-full"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        {/* SORT */}
        <select
          className="select select-bordered"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(0);
          }}
        >
          <option value="">Sort By</option>
          <option value="budgetAsc">Budget Low → High</option>
          <option value="budgetDesc">Budget High → Low</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        {/* CLASS  */}
        <input
          type="text"
          placeholder="Class (e.g. 10, 11, 12)"
          className="input input-bordered w-full"
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            setPage(0);
          }}
        />

        {/* SUBJECT  */}
        <input
          type="text"
          placeholder="Subject (Math, Biology...)"
          className="input input-bordered w-full"
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value);
            setPage(0);
          }}
        />

        {/* LOCATION */}
        <input
          type="text"
          placeholder="Location"
          className="input input-bordered"
          value={selectedLocation}
          onChange={(e) => {
            setSelectedLocation(e.target.value);
            setPage(0);
          }}
        />
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {tuitions.map((tuition) => (
          <div
            key={tuition._id}
            className="bg-base-100 border rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all group"
          >

            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-bold group-hover:text-blue-600">
                  {tuition.subjects}
                </h3>

                <p className="text-sm text-gray-500">
                  Class: {tuition.class}
                </p>
              </div>

              <div className="badge badge-success text-white">
                Approved
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-600">

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                {tuition.location}
              </div>

              <div className="flex items-center gap-2">
                <FaBookOpen className="text-blue-500" />
                {tuition.time} Days
              </div>

            </div>

            <div className="flex justify-between mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <IoPersonSharp />
                {tuition.gender}
              </div>

              <p>
                {new Date(tuition.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-4 bg-base-200 p-3 rounded-xl">
              <p className="text-xs">Budget</p>
              <h4 className="text-2xl font-bold text-blue-600">
                ৳ {tuition.budget}
              </h4>
            </div>

            <Link
              to={`/tuition-post-details/${tuition._id}`}
              className="btn btn-sm bg-blue-600 text-white w-full mt-4"
            >
              View Details
            </Link>

          </div>
        ))}

      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-10 gap-2">

        <button
          className="btn btn-sm"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`btn btn-sm ${page === num ? "btn-primary" : ""}`}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={page === totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default AllTuition;