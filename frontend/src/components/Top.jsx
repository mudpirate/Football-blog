import React from "react";
import { GoSearch } from "react-icons/go";
import { useState } from "react";

const Top = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border-b border-black py-2 px-4 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Search */}
        <div className="flex items-center gap-2">
          <button className="bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-200 transition-colors text-sm font-medium">
            <GoSearch className="w-7 h-7" />
          </button>
        </div>
        {/* Center: Title */}
        <div className="flex-1 flex justify-center items-center">
          <h1
            style={{ fontFamily: "Roboto Slab, serif" }}
            className="text-xl md:text-2xl font-bold text-gray-800 tracking-wide"
          >
            THE PITCH
          </h1>
        </div>
        {/* Right: Login/Menu */}
        <div className="flex items-center gap-2">
          <button className="bg-black hidden md:flex text-white px-5 py-2 rounded-md font-semibold hover:bg-gray-900 transition-colors shadow text-sm md:text-base">
            LOGIN
          </button>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="text-2xl md:hidden font-bold text-gray-700 focus:outline-none"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-y-0 left-0 w-[100vw] z-50 ">
          {/* Menu panel */}
          <div className="relative bg-white w-[100vw]  h-full shadow-lg p-8 flex flex-col gap-8 ">
            <button
              onClick={() => setOpen(false)}
              className="self-end text-2xl text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Close menu"
            >
              ✕
            </button>
            <nav className="flex flex-col gap-6 mt-4">
              <a
                href="#"
                className="text-gray-700 text-lg font-medium hover:text-blue-600 transition-colors"
                onClick={() => setOpen(false)}
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 text-lg font-medium hover:text-blue-600 transition-colors"
                onClick={() => setOpen(false)}
              >
                Trending
              </a>
              <a
                href="#"
                className="text-gray-700 text-lg font-medium hover:text-blue-600 transition-colors"
                onClick={() => setOpen(false)}
              >
                Most Popular
              </a>
              <a
                href="#"
                className="text-gray-700 text-lg font-medium hover:text-blue-600 transition-colors"
                onClick={() => setOpen(false)}
              >
                About
              </a>
              <button
                className="bg-black text-white px-5 py-2 rounded-md font-semibold hover:bg-gray-900 transition-colors shadow mt-4"
                onClick={() => setOpen(false)}
              >
                Login
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Top;
