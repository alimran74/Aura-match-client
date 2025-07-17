import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <div>
      <Navbar />

      <div className="min-h-[calc(100vh-116px)]">
        <Outlet />
        <ToastContainer position="top-center" />
      </div>

      <Footer />
    </div>
  );
};

export default RootLayout;
