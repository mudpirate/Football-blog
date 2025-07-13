import React from "react";

import Image1 from "../components/Image.jsx";
import Categories from "./Categories.jsx";
import Featured from "./Featured.jsx";

const Hero = () => {
  return (
    <div className="flex mb-10 gap-3">
      <div className=" hidden md:flex mt-1 justify-start items-center flex-[1.5] h-[90vh] px-1">
        <Image1
          src="/tom.png"
          alt="Picture of the author"
          className="h-[90vh] w-full"
        />
      </div>
      <div className="flex-1">
        <Featured />
      </div>
    </div>
  );
};

export default Hero;
