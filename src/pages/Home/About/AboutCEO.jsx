import React from "react";
import ceo from "../../../assets/shuvroPP.jpg";

const AboutCEO = () => {
  return (
    <section className="w-full py-16 px-4 md:px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image Section  */}
        <div className="w-full md:w-1/2 flex justify-center ">
          <div className="w-64 h-64 md:w-85 md:h-100 border-2 border-blue-400 shadow-md rounded-full overflow-hidden flex items-center justify-center">
            <img src={ceo} alt="CEO" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Founder & Visionary
          </h2>

          <h4 className="text-lg text-primary font-medium mb-4">
            eTuitionBd Platform
          </h4>

          <p className="text-gray-600 leading-relaxed mb-6">
            We believe education should be accessible, transparent, and
            efficient. Our mission is to connect students with qualified tutors
            in a simple and trusted way.
          </p>

          {/* Quote Box */}
          <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-500">
            <p className="italic text-gray-700">
              “Education is not about privilege — it is about opportunity. We
              are building a bridge between learners and mentors.”
            </p>
          </div>

          {/* Optional Name */}
          <p className="mt-5 font-semibold text-gray-800">
            — Shuvro Saha, Founder
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutCEO;
