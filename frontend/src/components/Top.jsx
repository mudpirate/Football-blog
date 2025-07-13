import React from "react";
import { GoSearch } from "react-icons/go";
import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Top = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border-b border-black py-2 px-4 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Search */}
        <div className="flex gap-2 items-center">
          <button className="bg-white text-black px-3 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium flex items-center">
            <GoSearch className="w-5 h-5" />
          </button>
          <button>
            <Link to="/write">
              {" "}
              <img
                width="40"
                height="4"
                className="bg-white text-black"
                src="https://img.icons8.com/ios-filled/50/add--v1.png"
                alt="add--v1"
              />
            </Link>
          </button>
          <Link to="/write">
            {" "}
            <span className="font-bold">Add Blog</span>
          </Link>
        </div>
        {/* Center: Title */}
        <div className="flex-1 flex justify-center items-center">
          <img src={logo} className="h-10 mr-30 w-50" alt="" />
        </div>
        {/* Right: Login/Menu */}
        <div className="flex items-center gap-2">
          <SignedOut>
            <Link to="/login">
              <button className="bg-black hidden md:flex text-white px-5 py-2 rounded-md font-semibold hover:bg-gray-900 transition-colors shadow text-sm md:text-base">
                LOGIN
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
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
