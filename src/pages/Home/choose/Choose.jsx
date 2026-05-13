import React from "react";
import { motion } from "framer-motion";
import { AiOutlineLike } from "react-icons/ai";
import { FaHeadset } from "react-icons/fa";
import { IoMdFastforward, IoMdLock } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineVerifiedUser } from "react-icons/md";

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const cardVariant = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const Choose = () => {
  return (
    <div className="my-20">
      <h2 className="text-left text-2xl font-semibold ml-2 mb-10">
        Why Choose <span className="text-primary font-bold">e</span>TuitionBd?
      </h2>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Card 1 */}
        <motion.div
          variants={cardVariant}
          whileHover={{
            y: -6,
            transition: { type: "spring", stiffness: 300 },
          }}
          className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform-gpu"
        >
          <div className="bg-green-100 p-4 rounded-xl text-green-600 text-2xl">
            <MdOutlineVerifiedUser />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              Verified Tutors
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              All tutors are verified and experienced in their fields.
            </p>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          variants={cardVariant}
          whileHover={{
            y: -6,
            transition: { type: "spring", stiffness: 300 },
          }}
          className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform-gpu"
        >
          <div className="bg-amber-100 p-4 rounded-xl text-amber-600 text-2xl">
            <IoMdLock />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              Secure Payments
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              100% safe payment via Stripe. Pay securely only after you have
              hired your preferred tutor.
            </p>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          variants={cardVariant}
          whileHover={{
            y: -6,
            transition: { type: "spring", stiffness: 300 },
          }}
          className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform-gpu"
        >
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600 text-2xl">
            <AiOutlineLike />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 text-lg">Easy to Use</h3>

            <p className="text-sm text-gray-600 mt-1">
              User-Friendly platform with smooth experience.
            </p>
          </div>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          variants={cardVariant}
          whileHover={{
            y: -6,
            transition: { type: "spring", stiffness: 300 },
          }}
          className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform-gpu"
        >
          <div className="bg-purple-100 p-4 rounded-xl text-purple-600 text-2xl">
            <FaHeadset />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              24/7 Support
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              We are here to help you anytime you need.
            </p>
          </div>
        </motion.div>

        {/* Card 5 */}
        <motion.div
          variants={cardVariant}
          whileHover={{
            y: -6,
            transition: { type: "spring", stiffness: 300 },
          }}
          className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform-gpu"
        >
          <div className="bg-orange-100 p-4 rounded-xl text-orange-600 text-2xl">
            <IoMdFastforward />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 text-lg">Fast Hiring</h3>

            <p className="text-sm text-gray-600 mt-1">
              Get tutor applications within hours of posting. Save time with our
              quick matching system.
            </p>
          </div>
        </motion.div>

        {/* Card 6 */}
        <motion.div
          variants={cardVariant}
          whileHover={{
            y: -6,
            transition: { type: "spring", stiffness: 300 },
          }}
          className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform-gpu"
        >
          {" "}
          <div className="bg-pink-100 p-4 rounded-xl text-pink-600 text-2xl">
            <FaPeopleGroup />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              Trusted by Thousands
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              Join 10,000+ students and parents who found their perfect tutor
              through eTuitionBD.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Choose;
