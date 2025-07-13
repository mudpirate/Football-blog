import React from "react";
import Navbar from "../components/Navbar";
import Top from "../components/Top";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Top />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
