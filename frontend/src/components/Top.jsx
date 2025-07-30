import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import DarkModeSwitc from "./themeToggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useScrollStore } from "./zustandStore";

const Top = () => {
  const [open, setOpen] = useState(false);
  const targetRef = useScrollStore((state) => state.targetRef);

  const handleScroll = () => {
    targetRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white border-b dark:border-b dark:border-white border-black dark:bg-black py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Search & Add */}
        <div className="flex items-center  sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          <button
            onClick={handleScroll}
            className="bg-white text-black hidden sm:flex px-2 sm:px-3 py-1.5 sm:py-2 rounded-full hover:bg-gray-200 transition text-sm font-medium items-center"
          >
            <GoSearch className="w-5 h-5  dark:text-black" />
          </button>

          <Link to="/post-blog" className="flex items-center sm:gap-2">
            <img
              width="32"
              height="32"
              className="rounded-full w-20 sm:w-10  dark:bg-white"
              src="https://img.icons8.com/ios-filled/50/add--v1.png"
              alt="Add"
            />
            <span className="font-semibold text-sm sm:text-base dark:text-white hidden sm:inline">
              Add Blog
            </span>
          </Link>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center w-100 h-10">
          <Link to="/">
            <img src={logo} className="h-9 w-33 sm:w-50 sm:mr-20" alt="Logo" />
          </Link>
        </div>

        {/* Right: Theme + Auth + Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          <DarkModeSwitc />

          <SignedOut>
            <Link to="/login">
              <button className="bg-black text-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-md font-medium hover:bg-gray-900 transition hidden md:flex text-sm md:text-base">
                LOGIN
              </button>
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="text-2xl md:hidden text-gray-700 dark:text-white"
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-black">
          <div className="p-8 flex flex-col h-full">
            <button
              onClick={() => setOpen(false)}
              className="self-end text-2xl text-gray-700 hover:text-blue-600 dark:text-white"
            >
              ✕
            </button>
            <nav className="flex flex-col gap-6 mt-10 text-lg font-medium text-gray-700 dark:text-white">
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link to="/?sort=trending" onClick={() => setOpen(false)}>
                Trending
              </Link>
              <Link to="/?sort=popular" onClick={() => setOpen(false)}>
                Most Popular
              </Link>
              <Link to="/about" onClick={() => setOpen(false)}>
                About
              </Link>

              <SignedOut>
                <Link to="/login" onClick={() => setOpen(false)}>
                  <button className="bg-black text-white px-5 py-2 rounded-md font-semibold hover:bg-gray-900 transition mt-6">
                    Login
                  </button>
                </Link>
              </SignedOut>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Top;
