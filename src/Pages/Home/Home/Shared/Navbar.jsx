import { useState } from "react";
import { Link, NavLink } from "react-router"; // fixed: should be react-router-dom
import { Menu, X } from "lucide-react";
import AuraLogo from "./AuraLogo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Biodatas", path: "/biodatas" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-[#d4e09b] text-[#222] shadow-md sticky top-0 z-50">
      <div className=" mx-auto px-4 py-3 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="text-2xl z-20">
          <AuraLogo/>
        </Link>

        {/* Desktop Centered Links */}
        <nav className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2 items-center">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-medium transition hover:text-[#f19c79] ${
                  isActive ? "text-[#f19c79]" : "text-[#222]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Login Button - Always visible */}
        <div className="hidden md:block z-20">
          <Link
            to="/login"
            className="bg-[#f19c79] text-white px-4 py-1.5 rounded hover:bg-[#e6855f] transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Hamburger Centered */}
        <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#f19c79] focus:outline-none"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Login Button Right */}
        <div className="md:hidden absolute right-4 z-20">
          <Link
            to="/login"
            className="bg-[#f19c79] text-white px-3 py-1 rounded hover:bg-[#e6855f] transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
       <div className="md:hidden mx-auto mt-2 bg-[#f6f4d2] rounded-lg p-4 space-y-2 shadow w-[80%] max-w-xs min-w-[240px] text-center">
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
</div>
      )}
    </header>
  );
};

export default Navbar;
