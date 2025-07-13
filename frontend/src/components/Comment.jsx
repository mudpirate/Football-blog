import React from "react";

const comment = () => {
  return (
    <>
      <div className="p-4 rounded-xl shadow-md mb-8">
        <div className="flex items-center gap-4">
          <p className="rounded-full bg-gray-400 p-2 ">JD</p>
          <span className="font-medium">john doe</span>
          <span className="text-sm text-gray-500">2 days ago</span>
        </div>
        <div className="mt-3">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            reiciendis molestias laboriosam quam dolor quis illo iusto eligendi
            neque nam.
          </p>
        </div>
      </div>
    </>
  );
};

export default comment;
