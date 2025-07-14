// src/layouts/DashboardLayout.jsx

import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth";
import AuraLogo from "../components/AuraLogo/AuraLogo";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const hasBioData = user?.hasBioData;

  const menuItems = [
    { name: "Dashboard Home", path: "/dashboard" },
    !hasBioData && { name: "Create Biodata", path: "/dashboard/createbiodata" },
    { name: "My Biodata", path: "/dashboard/biodata" },
    { name: "Edit Biodata", path: "/dashboard/editBiodata" },
  ].filter(Boolean);

  return (
    <div className="flex min-h-screen bg-[#f6f4d2] text-[#222]">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block md:w-64 bg-[#d4e09b] p-6 shadow-lg z-40`}
      >
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <AuraLogo />
          </Link>
        </div>

        {user && (
          <div className="flex flex-col items-center mb-6">
            <img
              src={user?.photoURL}
              alt="User"
              className="w-20 h-20 rounded-full border-4 border-[#f19c79] mb-2"
            />
            <h2 className="text-lg font-semibold">{user.displayName}</h2>
            <p className="text-sm text-gray-700 italic">
              {user?.role || "User"}
            </p>
          </div>
        )}

        <nav className="space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition ${
                  isActive
                  ? "bg-[#f19c79] text-white"
                  : "hover:bg-[#f19c79]/80 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <button
            onClick={logOut}
            className="w-full mt-6 px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg transition"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar for mobile */}
        <div className="flex items-center justify-between bg-[#d4e09b] p-4 md:hidden shadow-md">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <img
            src={user?.photoURL}
            alt="User"
            className="w-8 h-8 rounded-full border-2 border-[#f19c79]"
            title={user?.displayName}
          />
        </div>

        {/* Page content with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="p-6"
          >
            {/* Welcome screen if on dashboard home */}
            {location.pathname === "/dashboard" ? (
              <div className="text-center py-12">
                <motion.h2
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl font-bold text-[#f19c79] mb-4"
                >
                  Welcome to your Dashboard, {user?.displayName?.split(" ")[0]}!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-gray-600"
                >
                  Here you can manage your biodata, profile, and more.
                </motion.p>
              </div>
            ) : (
              <Outlet />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardLayout;
