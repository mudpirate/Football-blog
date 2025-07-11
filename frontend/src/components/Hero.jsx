import React from "react";
import hero from "../assets/new.jpg";

const Hero = () => {
  return (
    <div>
      <div className=" hidden md:flex mt-1 justify-center items-center w-full h-[100vh] px-10">
        <img
          className="object-fill w-full h-full "
          src={hero}
          alt="Football Hero"
        />
      </div>
    </div>
  );
};

export default Hero;
