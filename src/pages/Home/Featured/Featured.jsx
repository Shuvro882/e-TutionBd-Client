import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import prothomalo from "../../../assets/Newspapers/prothomalo.png";
import jugantor from "../../../assets/Newspapers/jugantor.png";
import ittefaq from "../../../assets/Newspapers/d-ittefaq.png";
import daily from "../../../assets/Newspapers/The_Daily_Star.png";
import kalerkontho from "../../../assets/Newspapers/kaler kontho.png";
import digonto from "../../../assets/Newspapers/noya_diganto.png";
import { Autoplay } from "swiper/modules";

const newspapersLogos = [
  prothomalo,
  jugantor,
  ittefaq,
  daily,
  kalerkontho,
  digonto
  
];

const Featured = () => {
  return (
    <div className="my-10 bg-base-200">
      <h2 className="text-4xl font-bold text-left mb-6">
        We were <span className="text-primary">featured</span> on
      </h2>

      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {newspapersLogos.map((logo, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center h-14"
          >
            <img src={logo} alt="" className="h-12 w-auto object-contain pb-3" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Featured;
