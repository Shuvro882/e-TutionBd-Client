import React from "react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../../../Components/logo/Logo";

const Footer = () => {
  return (
  <footer className="bg-base-200 text-base-content ">
  <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

    {/* Left Section */}
    <div>
      <div className="mb-2">
        <Logo></Logo>
      </div>
      <p className="text-sm leading-relaxed">
        eTuitionBd is a platform that connects students with qualified tutors, ensuring reliable and transparent tuition services.
      </p>

    </div>

    {/* Middle Section */}
    <div>
      <h3 className="font-bold mb-3">USEFUL LINKS</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <a className="link link-hover">Affiliate Program</a>
        <a className="link link-hover">Our Team</a>
        <a className="link link-hover">Become A Tutor</a>
        <a className="link link-hover">Careers</a>
        <a className="link link-hover">Appoint A Tutor</a>
        <a className="link link-hover">About</a>
        <a className="link link-hover">Our Blog</a>
        <a className="link link-hover">FAQ</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Terms of Use</a>
      </div>
    </div>

    {/* Right Section */}
    <div>
      <h3 className="font-bold mb-3">CONTACT US</h3>
      <p className="text-sm mb-3">We are here for your help!</p>

      <div className="space-y-2 text-sm">
        <p>📧 info@eTuitionBd.com.bd</p>
        <p>📞 Call Hotline : 09678-651464</p>
        <p>
          📍 House-10/5,Section-#1, Mirpur-12, Dhaka.
        </p>
      </div>

  
{/* Social Icons */}
<div className="flex gap-3 mt-4">

  <a
    href="#"
    className="p-2 rounded-full border hover:bg-blue-600 hover:text-white transition"
  >
    <FaFacebookF />
  </a>

  <a
    href="#"
    className="p-2 rounded-full border hover:bg-black hover:text-white transition"
  >
    <FaXTwitter />
  </a>

  <a
    href="#"
    className="p-2 rounded-full border hover:bg-blue-700 hover:text-white transition"
  >
    <FaLinkedinIn />
  </a>

  <a
    href="#"
    className="p-2 rounded-full border hover:bg-red-600 hover:text-white transition"
  >
    <FaYoutube />
  </a>

  <a
    href="#"
    className="p-2 rounded-full border hover:bg-green-500 hover:text-white transition"
  >
    <FaWhatsapp />
  </a>

</div>
</div>
</div>

  {/* Bottom Copyright */}
  <div className="border-t border-base-300 text-center py-4 text-sm">
    © {new Date().getFullYear()} eTutionBd. All rights reserved.
  </div>
</footer>
      
  );
};

export default Footer;
