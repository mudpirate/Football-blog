import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image1 from "./Image";
import { useScrollStore } from "./zustandStore";
import Search from "./Search";

const categories = [
  { label: "All Blogs", path: "/posts" },
  { label: "Players", path: "/posts?cat=Players" },
  { label: "Matches", path: "/posts?cat=Matches" },
  { label: "Leagues", path: "/posts?cat=Leagues" },
  { label: "Transfers", path: "/posts?cat=Transfers" },
  { label: "Young Stars", path: "/posts?cat=Youngstars" },
];

const Categories = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const setTargetRef = useScrollStore((state) => state.setTargetRef);

  useEffect(() => {
    setTargetRef(scrollRef); // Store the ref globally on mount
  }, [setTargetRef]);

  const handleClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* --- Header Image Section --- */}
      <div className="relative">
        <Image1
          src="/category.jpg"
          className="h-[30vh] object-cover object-bottom w-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-md px-2">
            Discover the latest in football news and analysis
          </h1>
        </div>
      </div>

      {/* --- Category + Search Section --- */}
      <div className="sm:mx-4 md:mx-10 -mt-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:justify-around gap-4 bg-white dark:bg-black shadow-lg border border-gray-200 dark:border-gray-700 sm:rounded-xl px-4 py-6">
          {/* Left: Categories Title + Buttons */}
          <div className="flex flex-col w-full md:w-auto">
            <div
              onClick={() => setOpen((prev) => !prev)}
              className=" md:hidden w-full flex justify-center justify-items-center-safe"
            >
              <p className="text-lg bg-black w-50 md:w-60 rounded-xl cursor-pointer flex justify-center  items-center p-2 text-white  sm:text-xl font-bold mb-3 dark:text-white">
                Categories
              </p>
            </div>

            <nav
              className={`flex flex-col gap-1 ${
                open ? "block" : "hidden"
              } md:flex md:flex-row md:gap-2`}
            >
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => handleClick(cat.path)}
                  className="bg-white border dark:bg-black dark:text-white px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-black sm:px-4 sm:py-2 rounded-lg transition-all duration-200 font-medium shadow-sm"
                >
                  {cat.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right: Search */}
          <div className="flex border rounded items-center md:w-32 lg:w-auto">
            <Search />
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
