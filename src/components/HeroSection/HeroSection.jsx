import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const HeroSection = () => {
  return (
    <div className="relative bg-[#f6f4d2] overflow-hidden">
   
     
      
    
        

      <div className="relative z-10  mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center pt-12 pb-12 gap-12">
        {/* Left Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-[#f19c79] leading-tight drop-shadow-lg"
          >
            Find Your Perfect <span className="text-gray-900"> Match</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-800 text-lg md:text-xl drop-shadow-sm"
          >
            Join thousands of verified members and discover love that lasts.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4"
          >
            <a
              href="/register"
              className="bg-gradient-to-r from-[#cbdfbd] to-[#cbdfbd] text-gray-900 py-3 px-8 rounded-xl text-lg font-semibold shadow-xl transition transform hover:scale-105 hover:shadow-2xl hover:from-[#e6855f] hover:to-[#f19c79]"
            >
              Create Your Profile
            </a>

          </motion.div>
        </div>

        {/* Right Hero Image with Tilt */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.3}
            scale={1.05}
            transitionSpeed={400}
            className="w-full max-w-md rounded-3xl shadow-2xl border-4 border-[#f19c79]"
          >
            <img
              src="https://i.ibb.co/LzS273K6/mariage-8.jpg"
              alt="Couple"
              className="w-full rounded-3xl object-cover"
            />
          </Tilt>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
