import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaXTwitter,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";
import Map from "./Map";

const Contacts = () => {
  return (
    <div className="w-full px-4 md:px-10 py-16 bg-gray-50 min-h-screen">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Contact <span className="text-primary">Us</span>
        </h1>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto px-2 md:px-0 leading-relaxed text-center">
          Have questions or need support? Reach out to us anytime. We are always
          here to help students and tutors connect smoothly.
        </p>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Contact Information
            </h2>

            <div className="space-y-5">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                  <FaLocationDot />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">Location</h4>

                  <p className="text-gray-600 text-sm">
                    Shyamoli, Dhaka, Bangladesh.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-full text-green-600">
                  <FaPhone />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">Phone</h4>

                  <p className="text-gray-600 text-sm">+880 1XXXXXXXXX</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 rounded-full text-red-600">
                  <FaEnvelope />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">Email</h4>

                  <p className="text-gray-600 text-sm">
                    support@etuitionbd.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Follow Us</h2>

            <div className="flex gap-4">
              <button className="p-3 rounded-full bg-blue-100 text-blue-600 hover:scale-110 transition duration-300">
                <FaFacebookF />
              </button>

              <button className="p-3 rounded-full bg-gray-200 text-black hover:scale-110 transition duration-300">
                <FaXTwitter />
              </button>

              <button className="p-3 rounded-full bg-blue-100 text-blue-700 hover:scale-110 transition duration-300">
                <FaLinkedinIn />
              </button>

              <button className="p-3 rounded-full bg-gray-200 text-gray-800 hover:scale-110 transition duration-300">
                <FaGithub />
              </button>
            </div>
          </div>

          {/* Google Map */}
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Location
            </h2>

            <div className="w-full h-64 bg-gray-200 rounded-xl">
              <Map></Map>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Send a Message
          </h2>

          <form className="space-y-6">
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Subject
              </label>

              <input
                type="text"
                placeholder="Write subject"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Message
              </label>

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              ></textarea>
            </div>

            {/* Button */}
            <button className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-8 py-3 rounded-xl font-semibold">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
