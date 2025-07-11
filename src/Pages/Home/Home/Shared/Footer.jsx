import { Link } from "react-router";
import AuraLogo from "./AuraLogo";

const Footer = () => {
  return (
    <footer className="bg-[#cbdfbd] text-[#222] ">
      <div className=" mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <AuraLogo/>
          <p className="text-sm">
            AuraMatch is a modern matrimony platform helping people find their perfect life partner. We value love, respect, and compatibility.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-[#f19c79] mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-[#f19c79] transition">Home</Link></li>
            <li><Link to="/biodatas" className="hover:text-[#f19c79] transition">Biodatas</Link></li>
            <li><Link to="/about" className="hover:text-[#f19c79] transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-[#f19c79] transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-[#f19c79] mb-2">Contact</h4>
          <p>Email: support@auramatch.com</p>
          <p>Phone: +880-1234-567890</p>
          <p>Meherpur, Bangladesh</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#d4e09b] text-center py-3 text-sm text-[#444]">
        &copy; {new Date().getFullYear()} AuraMatch. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
