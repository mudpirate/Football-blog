import React from "react";
import { Image } from "@imagekit/react";

const Image1 = ({ src, className, w, h }) => {
  return (
    <div>
      <Image
        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
        src={src}
        className={`object-top ${className || ""}`}
        transformation={[
          {
            width: w,
            height: h,
          },
        ]}
      />
    </div>
  );
};

export default Image1;
