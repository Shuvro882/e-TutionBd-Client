import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      
      {/* Animated Dots */}
      <div className="flex gap-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
      </div>

      {/* Text */}
      <p className="mt-5 text-gray-700 text-lg font-semibold tracking-wide">
        Please wait...
      </p>
    </div>
  );
};

export default Loading;