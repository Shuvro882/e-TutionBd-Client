import React from "react";

const Map = () => {
  return (
    <div className="rounded-xl overflow-hidden w-full">
      <iframe
        title="Google Map"
        src="https://maps.google.com/maps?q=Shyamoli%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="250"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Map;
