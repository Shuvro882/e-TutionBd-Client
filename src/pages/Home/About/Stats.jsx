import React, { useEffect, useState } from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaBriefcase, FaMapMarkedAlt } from "react-icons/fa";

const stats = [
  {
    value: 12000,
    suffix: "+",
    label: "Total Students",
    icon: <FaUserGraduate />,
  },
  {
    value: 2500,
    suffix: "+",
    label: "Verified Tutors",
    icon: <FaChalkboardTeacher />,
  },
  {
    value: 7000,
    suffix: "+",
    label: "Successful Hires",
    icon: <FaBriefcase />,
  },
  {
    value: 64,
    suffix: "",
    label: "Districts Covered",
    icon: <FaMapMarkedAlt />,
  },
];

// counter hook
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 20);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
};

const StatCard = ({ value, suffix, label, icon }) => {
  const count = useCounter(value);

  return (
    <div className="bg-white/90 backdrop-blur-md  shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      
      {/* ICON */}
      <div className="flex justify-center mb-3">
        <div className="text-3xl text-primary bg-blue-100 p-3 rounded-full">
          {icon}
        </div>
      </div>

      {/* COUNT */}
      <h2 className="text-3xl font-bold text-primary">
        {count.toLocaleString()}
        {suffix}
      </h2>

      {/* LABEL */}
      <p className="mt-2 text-gray-600 font-medium">{label}</p>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="mt-12 py-16 px-6  bg-linear-to-r from-blue-50 via-white to-blue-50">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <StatCard
            key={index}
            value={item.value}
            suffix={item.suffix}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default Stats;