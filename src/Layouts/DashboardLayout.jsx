// src/layouts/DashboardLayout.jsx

import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { Menu, X } from "lucide-react";
import useAuth from "../hooks/useAuth";
import AuraLogo from "../components/AuraLogo/AuraLogo";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard Home", path: "/dashboard" },
    { name: "My Biodata", path: "/dashboard/biodata" },
    { name: "Edit Profile", path: "/dashboard/profile" },
    // Add more links depending on role (admin/user/premium)
  ];

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
          <h1 className="text-xl font-semibold">
            Dashboard
          </h1>
          <img
            src={user?.photoURL}
            alt="User"
            className="w-8 h-8 rounded-full border-2 border-[#f19c79]"
            title={user?.displayName}
          />
        </div>

        {/* Page content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
