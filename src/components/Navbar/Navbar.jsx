import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuraLogo from "../AuraLogo/AuraLogo";


const links = [
  { name: "Home", path: "/" },
  { name: "Biodatas", path: "/biodatas" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#d4e09b] text-[#222] shadow-md sticky top-0 z-50">
      <div className="mx-auto px-6 py-3 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="text-2xl z-20">
          <AuraLogo />
        </Link>

        {/* Centered Desktop NavLinks */}
        <nav className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2 items-center">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative group font-medium transition-all duration-300 ${
                  isActive ? "text-[#f19c79]" : "text-[#222]"
                }`
              }
            >
              <span className="group-hover:text-[#f19c79] transition duration-300">
                {link.name}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#f19c79] group-hover:w-full transition-all duration-300"></span>
            </NavLink>
          ))}
        </nav>

        {/* Login Button Desktop */}
        <div className="hidden md:block z-20">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="bg-[#f19c79] text-white  px-4 py-1.5 rounded-xl shadow hover:bg-[#e6855f] transition-all duration-300"
            >
              Login
            </Link>
          </motion.div>
        </div>

        {/* Hamburger Toggle */}
        <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#f19c79] focus:outline-none"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Login Button */}
        <div className="md:hidden absolute right-4 z-20">
          <Link
            to="/login"
            className="bg-[#f19c79] text-white px-3 py-1 rounded-xl shadow hover:bg-[#e6855f] transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mx-auto mt-2 bg-[#f6f4d2] rounded-lg p-4 space-y-2 shadow w-[30%] max-w-xs min-w-[240px] text-center overflow-hidden"
          >
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block font-medium text-[#222] hover:text-[#f19c79] transition"
              >
                {link.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
