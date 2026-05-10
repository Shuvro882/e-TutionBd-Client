import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PostTuition = () => {
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const handlePostTuition = (data) => {

  const tuitionData = {
    ...data,
    postedEmail: user?.email,
    postedName: user?.displayName,
  };

  Swal.fire({
    title: "Are you sure?",
    text: "Are you going to post this for your tuition!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, post it!"
  }).then((result) => {

    if (result.isConfirmed) {

      axiosSecure.post('/tuitions', tuitionData)
        .then(res => {
          console.log('save post', res.data);
        });

    }

  });

  // reset();
};

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/*  Heading */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-primary">Post a New Tuition</h2>
        <p className="text-gray-500 mt-2">
          Fill in the details below to find the perfect tutor. Your post will be
          reviewed by our admins.
        </p>
      </div>

   
      <div className="bg-base-100 shadow-xl rounded-xl overflow-hidden">

        <div className="bg-blue-50 border-b border-blue-200 p-2 flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center rounded-full border border-blue-600 bg-blue-100 text-blue-600">
            !
          </div>
          <p className="text-blue-700 text-sm font-medium">
            Please provide accurate information to get the best tutors.
          </p>
        </div>

        <form onSubmit={handleSubmit(handlePostTuition)} className="p-6 space-y-10">

          {/*  Academic Info  */}
          <div>
            <h3 className="text-lg font-semibold border-l-4 border-blue-500 pl-3 mb-4">
              Academic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Class / Level *</label>
                <input
                  type="text"
                  placeholder="e.g. Class 9 / HSC"
                  className="input input-bordered w-full"
                  {...register("class", { required: true })}
                />
              </div>

              <div>
                <label className="label">Medium *</label>
                <select
                  className="select select-bordered w-full"
                  {...register("medium")}
                >
                  <option>Bangla Medium</option>
                  <option>English Medium</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="label">Subjects *</label>
              <input
                type="text"
                placeholder="e.g. Math, Physics, Chemistry"
                className="input input-bordered w-full"
                {...register("subjects",{ required: true })}
              />
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-lg font-semibold border-l-4 border-blue-500 pl-3 mb-4">
              Schedule & Budget
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Days per Week *</label>
                <select
                  className="select select-bordered w-full"
                  {...register("days")}
                >
                  <option>Select Days</option>
                  <option>2 Days</option>
                  <option>3 Days</option>
                  <option>4 Days</option>
                  <option>5 Days</option>
                </select>
              </div>

              <div>
                <label className="label">Salary Budget (BDT) *</label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  className="input input-bordered w-full"
                  {...register("budget",{ required: true })}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Preferred Time</label>
                <input
                  type="text"
                  placeholder="e.g. 4:00 PM - 6:00 PM"
                  className="input input-bordered w-full"
                  {...register("time",{ required: true })}
                />
              </div>

              <div>
                <label className="label">Tutor Gender Preference</label>
                <select
                  className="select select-bordered w-full"
                  {...register("gender")}
                >
                  <option>Any Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
          </div>

          {/*  Location  */}
          <div>
            <h3 className="text-lg font-semibold border-l-4 border-blue-500 pl-3 mb-4">
              Location & Requirements
            </h3>

            <div>
              <label className="label">Detailed Address / Location *</label>
              <input
                type="text"
                placeholder="e.g. Mirpur 10, Dhaka"
                className="input input-bordered w-full"
                {...register("location",{ required: true })}
              />
            </div>

            <div className="mt-4">
              <label className="label">Additional Requirements</label>
              <textarea
                className="textarea textarea-bordered w-full h-28"
                placeholder="e.g. Need experienced tutor..."
                {...register("requirements")}
              ></textarea>
            </div>
          </div>

          {/*  Submit */}
          <button className="btn bg-blue-600 w-full text-white text-lg">
            Post Tuition Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostTuition;
