import { Link } from "react-router";
import { motion } from "framer-motion";

const Forbidden = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-[#f6f4d2] text-[#222] overflow-hidden p-6">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#f19c79] opacity-20 rounded-full blur-[100px] z-0 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#d4e09b] opacity-20 rounded-full blur-[100px] z-0 animate-pulse" />

      {/* Main 403 Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl md:text-8xl font-extrabold text-[#f19c79] z-10 drop-shadow"
      >
        403 🚫
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg md:text-xl text-gray-700 z-10 mb-6 text-center"
      >
        You don’t have permission to access this page.
      </motion.p>

      {/* Working 403 GIF */}
      <motion.img
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        src="https://media.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif"
        alt="403 Forbidden"
        className="w-52 md:w-64 rounded-xl shadow-lg border-4 border-[#f19c79] z-10 mb-6"
      />

      {/* Back Home Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="z-10"
      >
        <Link
          to="/"
          className="bg-[#f19c79] text-white px-6 py-2 rounded-lg hover:bg-[#e6855f] transition-all duration-300 shadow"
        >
          🏡 Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Forbidden;
