import React from 'react';
import Stats from './Stats';
import { FaBullseye, FaEye } from 'react-icons/fa';
import AboutCEO from './AboutCEO';


const About = () => {
    return (
        <div className="my-20 px-4 text-center md:px-10">
      
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
          Bangladesh’s Most Trusted{" "} <br />
          <span className="text-primary">Tuition Platform</span>
        </h2>

        {/* Description */}
        <p className="mt-5 text-gray-600 text-base md:text-lg leading-relaxed">
          We connect students with verified and experienced tutors across the
          country. Whether it’s academic support, admission preparation, or
          skill development, <span className="font-semibold text-gray-800">eTuitionBD</span> ensures
          quality education right at your doorstep with trusted guidance and
          personalized learning.
        </p>
        <Stats></Stats>
         <section className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16 px-4 md:px-10">

      {/* Vision Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300">
        <div className="text-4xl text-primary flex justify-center mb-4">
          <FaEye />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Our Vision
        </h2>

        <p className="text-gray-600 leading-relaxed">
          To build a Bangladesh where every student can discover the right mentor
          to reach their full potential, and every skilled teacher has a platform
          to share knowledge and earn with dignity and respect.
        </p>
      </div>

      {/* Mission Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300">
        <div className="text-4xl text-primary flex justify-center mb-4">
          <FaBullseye />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Our Mission
        </h2>

        <p className="text-gray-600 leading-relaxed">
          To ensure that quality education reaches every part of Bangladesh. We
          strive to connect motivated learners with qualified educators through a
          reliable, secure, and efficient digital platform that makes learning
          easier for everyone.
        </p>
      </div>

    </section>
    <AboutCEO></AboutCEO>
        
    </div>
    );
};

export default About;