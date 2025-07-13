

import { Link } from "react-router";
import { motion } from "framer-motion";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f6f4d2] text-center p-6">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold text-red-500 mb-4"
      >
        403 🚫
      </motion.h1>
      <p className="text-xl text-gray-700 mb-6">
        You don’t have permission to access this page.
      </p>
      <Link
        to="/"
        className="bg-[#f19c79] text-white px-6 py-2 rounded-lg hover:bg-[#e6855f] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
