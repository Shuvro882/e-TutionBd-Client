import React from "react";
import LogoImg from "../../assets/images/logoT.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <img src={LogoImg} alt="" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
      <h3 className="text-lg md:text-xl font-semibold text-primary leading-none whitespace-nowrap">
        <span className="text-orange-600">e</span>TuitionBd
      </h3>
    </div>
  );
};

export default Logo;
