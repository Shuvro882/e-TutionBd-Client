import React from "react";
import Tutoring from "../../../assets/images/tutors.svg";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="hero bg-base-200 min-h-screen flex items-center">
      <div className="hero-content flex-col lg:flex-row-reverse items-center gap-16 py-6">
        <div className="flex-1">
          <motion.img
            src={Tutoring}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-lg h-125 object-cover mx-auto"
          />
        </div>

        <div className="flex-1">
          <motion.h2
            initial={{ x: -150, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-blue-50 text-primary rounded-3xl px-4 py-4 mb-8"
          >
            #1 Tution Management Platform
          </motion.h2>

          <motion.h1
            initial={{ x: -150, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold leading-tight mb-4"
          >
            Find the Perfect Tutor for{" "}
            <span className="text-primary">Your Success</span>
          </motion.h1>

          <motion.p
            initial={{ x: -150, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="text-base mb-12"
          >
            eTuitionBd connects students with qualified tutors for better
            learning and brighter future.
          </motion.p>

          <motion.div
            initial={{ x: -150, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2 }}
            className="mt-6"
          >
            <button className="btn bg-primary text-white mr-2">
              Find Tution <FaArrowRightLong />
            </button>
            <button className="btn text-primary border-2 border-blue-500">
              <MdOutlinePeopleAlt /> Become a Tutor
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
