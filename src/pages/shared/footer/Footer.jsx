import React from "react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../../../Components/logo/Logo";

const Footer = () => {
  return (
  <footer className="bg-[#162335] text-secondary">
  <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

    {/* Left Section */}
    <div className="md:col-span-1">
      <div className="mb-2">
        <Logo />
      </div>
      <p className="text-sm leading-relaxed">
        eTuitionBd is a platform that connects students with qualified tutors, ensuring reliable and transparent tuition services.
      </p>
      {/* Social Icons */}
      <div className="flex gap-3 mt-4">
        <a className="p-2 rounded-full border hover:bg-blue-600 hover:text-white transition">
          <FaFacebookF />
        </a>
        <a className="p-2 rounded-full border hover:bg-black hover:text-white transition">
          <FaXTwitter />
        </a>
        <a className="p-2 rounded-full border hover:bg-blue-700 hover:text-white transition">
          <FaLinkedinIn />
        </a>
        <a className="p-2 rounded-full border hover:bg-red-600 hover:text-white transition">
          <FaYoutube />
        </a>
        <a className="p-2 rounded-full border hover:bg-green-500 hover:text-white transition">
          <FaWhatsapp />
        </a>
      </div>
    </div>

    {/* Middle Section (Links) */}
    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">

      {/* Section 1 */}
      <div>
        <h3 className="font-bold mb-3">Quick Links</h3>
        <div className="flex flex-col gap-2">
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Tutions</a>
          <a className="link link-hover">Tutors</a>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact us</a>
        </div>
      </div>

      {/* Section 2 */}
      <div>
        <h3 className="font-bold mb-3">For Students</h3>
        <div className="flex flex-col gap-2">
          <a className="link link-hover">How it works</a>
          <a className="link link-hover">Find Tutions</a>
          <a className="link link-hover">Become a Student</a>
          <a className="link link-hover">Payment</a>
          <a className="link link-hover">Help Center</a>
        </div>
      </div>

      {/* Section 3 */}
      <div>
        <h3 className="font-bold mb-3">For Tutors</h3>
        <div className="flex flex-col gap-2">
          <a className="link link-hover">How it works</a>
          <a className="link link-hover">Find Jobs</a>
          <a className="link link-hover">Become a Tutor</a>
          <a className="link link-hover">Tutor Dashboard</a>
          <a className="link link-hover">Support</a>
        </div>
      </div>

    </div>

    {/* Right Section */}
    <div className="md:col-span-1">
      <h3 className="font-bold mb-3">CONTACT US</h3>
      <p className="text-sm mb-3">We are here for your help!</p>

      <div className="space-y-2 text-sm">
        <p>📧 info@eTuitionBd.com.bd</p>
        <p>📞 Call Hotline : 09678-651464</p>
        <p>📍 House-10/5, Section-1, Shyamoli, Dhaka.</p>
      </div>

      
    </div>

  </div>

  {/* Bottom */}
  <div className="border-t border-base-300 text-center py-4 text-sm">
    © {new Date().getFullYear()} eTutionBd. All rights reserved.
  </div>
</footer>
      
  );
};

export default Footer;
