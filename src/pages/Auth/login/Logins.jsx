import React, { useState } from "react";
import RegImage from "../../../assets/images/RegImage.jpeg";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import { FaEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
import SocialLogin from "../Socialogin/SocialLogin";

const Logins = () => {
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    console.log("form data", data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 hidden lg:block">
        <img
          src={RegImage}
          alt="login"
          className="w-full h-75 lg:h-130 object-cover"
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-sm flex flex-col items-start space-y-8">
          <div>
            <h2 className="text-primary text-4xl font-semibold">
              Welcome <span className="text-black">Back</span>
            </h2>
            <p className="text-xl text-gray-500 mt-2">
              Log in to Continue your Journey.
            </p>
          </div>

          <div className="card bg-base-100 w-full shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
              <fieldset className="fieldset">
                {/* Email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input"
                  placeholder="Email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500">Email is required</p>
                )}

                {/* Password */}
                <div className="relative">
                <label className="label">Password</label>
                <input
                  type={show ? "text" : "password"}
                  {...register("password", { required: true, minLength: 6 })}
                  className="input"
                  placeholder="Password"
                />
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">
                    Password must be 6 characters or longer.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-6 top-8"
                >
                  {show ?<IoEyeOff />  : <FaEye />}
                </button>
                </div>

                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>

                <button className="btn btn-primary text-white mt-4">Login</button>
              </fieldset>
            </form>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logins;
