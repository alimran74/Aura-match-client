import { Link } from "react-router";
import AuraLogo from "../AuraLogo/AuraLogo";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#cbdfbd] text-[#222] pt-10">
      {/* Top Part */}
      <div className="px-6 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-10 pb-8 border-b border-[#b9cdb1]">
        {/* Logo & About */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="space-y-4 md:col-span-2"
        >
          <div className="flex items-center gap-3 text-3xl font-extrabold ">
            <div className="scale-125 px-4"><AuraLogo /></div>
           
          </div>
          <p className="text-sm text-[#333] leading-relaxed">
            Find your life partner with ease and trust. AuraMatch combines traditional values with a modern platform to help you connect meaningfully and safely with compatible matches. We're here to help you write your love story. 💞
          </p>
        </motion.div>

        {/* Explore Links */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <h4 className=" font-semibold text-2xl text-[#f19c79] mb-3">Explore</h4>
          <ul className="space-y-2 text-[17px]">
            <li><Link to="/" className="hover:text-[#f19c79] transition">Home</Link></li>
            <li><Link to="/biodatas" className="hover:text-[#f19c79] transition">Biodatas</Link></li>
            <li><Link to="/about" className="hover:text-[#f19c79] transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[#f19c79] transition">Contact</Link></li>
          </ul>
        </motion.div>

        {/* Company Info */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <h4 className="text-2xl font-semibold text-[#f19c79] mb-3">Company</h4>
          <ul className="space-y-2 text-[15px]">
            <li><Link to="/terms" className="hover:text-[#f19c79] transition">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-[#f19c79] transition">Privacy Policy</Link></li>
            <li><Link to="/support" className="hover:text-[#f19c79] transition">Support</Link></li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#d4e09b] text-center py-4 text-sm text-[#444] mt-2 px-6 md:px-0">
        <p>
          &copy; {new Date().getFullYear()} <span className="font-semibold text-[#f19c79]">AuraMatch</span>. All rights reserved. Made with 💖 by Imran.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
