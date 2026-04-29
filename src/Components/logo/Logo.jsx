import React from "react";
import LogoImg from "../../assets/images/logoT.png";

const Logo = () => {
  return (
    <div className="flex items-center">
      <img src={LogoImg} alt="" className="w-16 h-14 block rounded-full" />
      <h3 className="text-2xl font-semibold text-primary leading-none">
        <span className="text-purple-700">e</span>TutionBd
      </h3>
    </div>
  );
};

export default Logo;
