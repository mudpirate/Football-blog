import React from "react";

import Image1 from "../components/Image.jsx";
import Categories from "./Categories.jsx";
import Featured from "./Featured.jsx";

const Hero = () => {
  return (
    <div className="flex md:flex-col lg:flex-row justify-center items-center border w-screen mb-10 gap-1">
      <div className=" hidden md:flex sm:hidden w-screen justify-center items-center lg:flex-1 h-[92vh] ">
        <Image1
          src="https://ik.imagekit.io/vwnheev2v/photo_6066636435563333177_w.jpg?updatedAt=1753631252982"
          alt="Picture of the author"
          className="h-[92vh] object-cover hover:scale-[1.01] "
        />
      </div>
      <div className=" flex-1  dark:bg-black">
        <Featured />
      </div>
    </div>
  );
};

export default Hero;
