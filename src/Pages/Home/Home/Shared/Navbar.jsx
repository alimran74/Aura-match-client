import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Biodatas", path: "/biodatas" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-vanilla text-[#222] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-tangerine">
          💞 AuraMatch
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-medium hover:text-tangerine ${
                  isActive ? "text-tangerine" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/login"
            className="ml-4 bg-tangerine text-white px-4 py-1.5 rounded hover:bg-[#e6855f] transition"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-tangerine focus:outline-none"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-lightyellow px-4 pb-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block font-medium text-[#222] hover:text-tangerine"
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="inline-block mt-2 bg-tangerine text-white px-4 py-1.5 rounded hover:bg-[#e6855f] transition"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
