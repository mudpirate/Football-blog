import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";

const Bookmarks = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const openBookmarks = () => {
    if (!user) {
      toast.success("Please login to view your bookmarks");
      return navigate("/login");
    } else {
      navigate("/bookmarks");
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="flex items-center hover:scale-[1.05] justify-center">
      <span className="inline dark:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 64 64"
        >
          <path
            className="fill-black dark:fill-white"
            d="M51,59l-17.137-9.019c-1.166-0.614-2.56-0.614-3.726,0L13,59V7h38V59z"
          ></path>
        </svg>
      </span>

      <button
        className="capitalize font-bold dark:text-white text-black hover:scale-[1.05] rounded-2xl"
        onClick={openBookmarks}
      >
        Your Bookmarks
      </button>
    </div>
  );
};

export default Bookmarks;
