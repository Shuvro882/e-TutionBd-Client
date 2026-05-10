import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-base-100 px-4 text-center">

      {/* 404 Text */}
      <h1 className="text-8xl font-extrabold text-red-500">404</h1>

      {/* Message */}
      <h2 className="text-2xl font-semibold mt-4">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-500 mt-2 max-w-md">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 btn btn-primary px-6"
      >
        Go Back Home
      </Link>

    </div>
    );
};

export default ErrorPage;