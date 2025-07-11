import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-white hidden md:flex py-4 px-8">
        <div className="flex items-center justify-center max-w-7xl mx-auto w-full">
          <div className="flex gap-8">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Trending
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Most Popular
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              About
            </a>
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
