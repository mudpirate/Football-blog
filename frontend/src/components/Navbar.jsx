import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Desktop Navbar */}
      <nav className=" hidden dark:bg-black max-w-screen  md:flex py-4 ">
        <div className="flex items-center justify-center  w-full">
          <div className="flex gap-8">
            <NavLink
              to="/"
              className="text-black focus:outline-none focus-visible:outline-none outline-none  dark:text-white hover:text-gray-600 transition-colors font-medium "
            >
              Home
            </NavLink>
            <NavLink
              to="/posts/?sort=trending"
              className="text-black dark:text-white hover:text-gray-600 transition-colors font-medium"
            >
              Trending
            </NavLink>

            <Link
              to="/about"
              className="text-black hover:text-gray-600 dark:text-white text-md font-medium  transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="hidden items-center justify-between bg-white shadow-md py-4 px-6">
        <h1
          style={{ fontFamily: "Roboto Slab, serif" }}
          className="text-xl md:text-2xl font-bold text-gray-800 tracking-wide"
        >
          THE PITCH
        </h1>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="text-2xl font-bold text-gray-700 focus:outline-none"
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Overlay */}
    </>
  );
};

export default Navbar;
