import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaHeadset } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { MdOutlineVerifiedUser } from "react-icons/md";

const Choose = () => {
  return (
   <div className="my-20">
    <h2 className="text-left text-2xl font-semibold ml-2">Why Choose <span className="text-orange-600">e</span>TutionBd?</h2>
     <div className="grid grid-cols-1 md:grid-cols-4">

      <div className="flex items-center gap-4 p-4 rounded-xl max-w-sm">
        <div className="bg-green-100 p-3 rounded-lg text-green-600 text-xl">
          <MdOutlineVerifiedUser />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Verified Tutors</h3>
          <p className="text-sm text-gray-600">
            All tutors are verified and experienced in their fields.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-xl max-w-sm">
        <div className="bg-amber-100 p-3 rounded-lg text-amber-600 text-xl">
          <IoMdLock />
        </div>

        {/* Text */}
        <div>
          <h3 className="font-semibold text-gray-800">Secure Payments</h3>
          <p className="text-sm text-gray-600">
            Safe and Secure payment system for everyone.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-xl max-w-sm">  
        <div className="bg-blue-100 p-3 rounded-lg text-blue-600 text-xl">
         <AiOutlineLike />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Easy to Use</h3>
          <p className="text-sm text-gray-600">
            User-Friendly platform with smooth experience.
          </p>
        </div>
      </div>


      <div className="flex items-center gap-4 p-4 rounded-xl max-w-sm">
        <div className="bg-purple-100 p-3 rounded-lg text-purple-600 text-xl">
          <FaHeadset />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">24/7 Support</h3>
          <p className="text-sm text-gray-600">
            We are here to help you anytime you need.
          </p>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Choose;
