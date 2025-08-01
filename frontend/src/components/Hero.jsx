import React from "react";
import { motion } from "framer-motion";

import Image1 from "../components/Image.jsx";
import Categories from "./Categories.jsx";
import Featured from "./Featured.jsx";

const Hero = () => {
  return (
    <div className="flex md:mx-auto md:max-w-[98vw] md:flex-col lg:flex-row justify-center items-center   mb-10 gap-1">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className=" hidden md:flex sm:hidden w-screen justify-center items-center lg:flex-1 h-[92vh] "
      >
        <Image1
          src="https://ik.imagekit.io/vwnheev2v/photo_6066636435563333177_w.jpg?updatedAt=1753631252982"
          alt="Picture of the author"
          className="h-[92vh] object-cover hover:scale-[1.01] "
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className=" flex-1  dark:bg-black"
      >
        <Featured />
      </motion.div>
    </div>
  );
};

export default Hero;
