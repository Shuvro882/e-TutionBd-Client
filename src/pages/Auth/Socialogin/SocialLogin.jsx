import React from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        console.log(result.user);

        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          role: "student",
        };

        axiosSecure
          .post("/users", userInfo)
          .then((res) => {
            console.log("user data has been stored", res.data);

            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="w-[50%] flex items-center justify-center gap-2 mb-2">
        <div className="h-px flex-1 bg-gray-400"></div>
        <span className="text-sm text-gray-500">or</span>
        <div className="h-px flex-1 bg-gray-400"></div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline btn-primary w-[85%] flex items-center justify-center gap-2"
      >
        <svg
          className="w-4 h-4"
          aria-label="Google logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>

      <p className="text-sm text-start w-[85%] mb-2">
        Don't have an account?{" "}
        <Link to="/registration" className="text-primary underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default SocialLogin;
