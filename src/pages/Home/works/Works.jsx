import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RxPeople } from "react-icons/rx";

const Works = () => {
  return (
    <div className="my-10 bg-blue-50 py-10">
      <h2 className="text-3xl font-semibold text-left mb-8 ml-1.5">How <span className="text-primary">It</span> Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        
        <div className="bg-white shadow rounded-xl p-6 text-center relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
            1
          </div>

          <IoDocumentTextOutline className="h-14 w-14 text-blue-600 mx-auto mt-4" />

          <h2 className="font-semibold mt-4">Post Your Tuition</h2>

          <p className="text-gray-500 text-sm mt-2">
            Students post their tuition requirements with subject, class,
            location and budget.
          </p>
        </div>

       
        <div className="bg-white shadow rounded-xl p-6 text-center relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
            2
          </div>
          <RxPeople className="h-14 w-14 text-amber-700 mx-auto mt-4" />

          <h2 className="mt-6 font-semibold">Tutors Apply</h2>

          <p className="text-gray-500 text-sm mt-2">
            Qualified Tutors apply for the tution you posted.
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
            3
          </div>
          <IoMdCheckmarkCircleOutline className="h-14 w-14 text-green-600 mx-auto mt-4" />
          <h2 className="mt-6 font-semibold">Start Learning</h2>
          <p className="text-gray-500 text-sm mt-2">
            Choose the best tutor,make payment and start your learning journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Works;
