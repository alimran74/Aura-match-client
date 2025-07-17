import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth";
import useUserProfile from "../hooks/useUserProfile";
import AuraLogo from "../components/AuraLogo/AuraLogo";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { profile, isLoading } = useUserProfile();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const hasBioData = user?.hasBioData;

  const menuItems = [
    { name: "Dashboard Home", path: "/dashboard" },
    !hasBioData && { name: "Create Biodata", path: "/dashboard/createbiodata" },
    { name: "My Biodata", path: "/dashboard/myBiodata" },
    { name: "Edit Biodata", path: "/dashboard/editBiodata" },
    { name: "Favorite Biodata", path: "/dashboard/favouriteBiodata" },
    { name: "My Contact request", path: "/dashboard/myContact-request" },
    { name: "My Success Story", path: "/dashboard/gotMarried" },

    { name: "Admin Dashboard", path: "/dashboard/adminDashboard" },
    { name: "Admin State", path: "/dashboard/Admin/state" },
    { name: "Approve Contact Request", path: "/dashboard/approvedContactRequest" },
    { name: "Manage Users", path: "/dashboard/manageUser" },
    { name: "Approve Premium", path: "/dashboard/ApprovePremium" },
  ].filter(Boolean);

  return (
    <div className="flex min-h-screen bg-[#f6f4d2] text-[#222]  overflow-hidden relative">
      {/* Sidebar */}
      <div
  className={`
    fixed top-0 left-0 z-40 h-full bg-[#d4e09b] p-4 shadow-lg
    overflow-y-auto
    transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full"}
    md:translate-x-0 md:relative md:w-64 md:mt-12 md:overflow-y-auto
  `}
>
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <AuraLogo />
          </Link>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {user && (
          <div className="flex flex-col items-center mb-6">
            <img
              src={user?.photoURL}
              alt="User"
              className="w-20 h-20 rounded-full border-4 border-[#f19c79] mb-2"
            />
            <h2 className="text-lg font-semibold">{user.displayName}</h2>
            <p className="text-sm text-gray-700 italic">{profile?.role || "User"}</p>
          </div>
        )}

        <nav className="space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
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

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        {/* Mobile Topbar */}
        <div className="md:hidden sticky top-0 z-20 flex items-center justify-between bg-[#d4e09b] p-4 shadow-md">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <img
            src={user?.photoURL}
            alt="User"
            className="w-8 h-8 rounded-full border-2 border-[#f19c79]"
            title={user?.displayName}
          />
        </div>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="p-4 sm:p-6 md:p-8"
          >
            {location.pathname === "/dashboard" ? (
              <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#cbdfbd] to-[#d4e09b] rounded-xl p-10 shadow-lg relative overflow-hidden">
                {/* Floating Emojis */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, -20, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-10 text-6xl flex justify-around items-center"
                >
                  <span>💖</span>
                  <span>💍</span>
                  <span>👑</span>
                  <span>🎊</span>
                  <span>🌹</span>
                  <span>✨</span>
                </motion.div>

                <div className="relative z-10 max-w-3xl">
                  <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-extrabold text-[#f19c79] mb-4"
                  >
                    Welcome, {user?.displayName?.split(" ")[0]}! 🎉
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-700 mb-6"
                  >
                    This is your personalized space where magic begins. Whether
                    you're just starting your journey or managing the platform –
                    we’ve got something special for you. 🌟
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="italic text-[#444] mb-6"
                  >
                    “Every heart has a match. Let’s help you find yours.”
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-3xl flex flex-wrap justify-center gap-4 mb-8"
                  >
                    <span>💑</span>
                    <span>🌟</span>
                    <span>💌</span>
                    <span>🎈</span>
                    <span>🕊️</span>
                    <span>💞</span>
                    <span>📸</span>
                  </motion.div>
                  <div className="mt-4 flex justify-center">
                    <h2 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
                      Find Your Perfect Match
                    </h2>
                  </div>
                </div>
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
