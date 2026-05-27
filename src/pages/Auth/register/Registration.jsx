import React, { useState } from "react";
import RegImage from "../../../assets/images/RegImage.jpeg";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Registration = () => {
  const [show, setShow] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    console.log("after register", data);

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        // create user in database
        const userInfo = {
          email: data.email,
          displayName: data.name,
          phoneNumber: data.phoneNumber,
          role: data.role,
        };

        axiosSecure.post(`/users`, userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("user created in the database");
          }
        });

        // update user profile
        const userProfile = {
          displayName: data.name,
        };

        updateUserProfile(userProfile)
          .then(() => {
            console.log("user profile updated done");

            //  redirect to previous page
            navigate(from, { replace: true });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 hidden lg:block">
        <img
          src={RegImage}
          alt="register"
          className="w-full h-75 lg:h-130 object-cover"
        />
      </div>

      <div className="flex-1 flex items-start lg:items-center justify-center px-4 sm:px-6 py-10">
        <div className="w-full max-w-sm flex flex-col space-y-6">
          <div>
            <h2 className="text-primary text-4xl font-semibold">
              Create <span className="text-black">an</span> Account
            </h2>
            <p className="text-xl text-gray-500 mt-2">
              Lets get started a new journey!!!
            </p>
          </div>

          <div className="card bg-base-100 w-full shadow-2xl">
            <form
              className="card-body"
              onSubmit={handleSubmit(handleRegistration)}
            >
              <fieldset className="fieldset space-y-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Select Role
                    </span>
                  </label>

                  <div className="flex items-center gap-6">
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        value="student"
                        {...register("role", { required: true })}
                        className="radio radio-primary"
                      />
                      <span className="label-text">Student</span>
                    </label>

                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        value="tutor"
                        {...register("role", { required: true })}
                        className="radio radio-primary"
                      />
                      <span className="label-text">Tutor</span>
                    </label>
                  </div>

                  {errors.role && (
                    <p className="text-red-500 text-sm mt-1">
                      Role is required
                    </p>
                  )}
                </div>

                {/* Name */}
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input"
                  placeholder="Your Name"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500 text-sm">Name is required.</p>
                )}

                {/* Phone */}
                <label className="label">Phone Number</label>
                <input
                  type="text"
                  {...register("phoneNumber", { required: true })}
                  className="input"
                  placeholder="Your Phone Number"
                />
                {errors.phoneNumber?.type === "required" && (
                  <p className="text-red-500 text-sm">
                    Phone Number is required.
                  </p>
                )}

                {/* Email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input"
                  placeholder="Email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500 text-sm">Email is required.</p>
                )}

                {/* Password */}
                <div className="relative">
                  <label className="label">Password</label>
                  <input
                    type={show ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/,
                    })}
                    className="input"
                    placeholder="Password"
                  />

                  {errors.password?.type === "required" && (
                    <p className="text-red-500 text-sm">
                      Password is required.
                    </p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500 text-sm">
                      Password must be 6 characters or longer
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-500 text-sm">
                      Must include uppercase, lowercase, number & special
                      character.
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-6 top-8"
                  >
                    {show ? <IoEyeOff /> : <FaEye />}
                  </button>
                </div>

                <button className="btn bg-primary text-white mt-4">
                  Register
                </button>
              </fieldset>

              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/logins" className="text-primary underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;