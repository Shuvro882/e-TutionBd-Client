import React, { useState } from "react";
import RegImage from "../../../assets/images/RegImage.jpeg";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import { FaEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";

const Registration = () => {
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser } = useAuth();

  const handleRegistration = (data) => {
    console.log("after register", data);
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
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
                {/* Name */}
                <label className="label">Name</label>
                <input type="text" className="input" placeholder="Your Name" />

                {/* Phone */}
                <label className="label">Phone Number</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Phone Number"
                />

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
                    {show ? <IoEyeOff />  : <FaEye />}
                  </button>
                </div>
                <button className="btn btn-primary text-white mt-4">Register</button>
              </fieldset>
              <p className="text-sm">
                Already have an account?  <Link to="/logins" className="text-primary underline">
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
