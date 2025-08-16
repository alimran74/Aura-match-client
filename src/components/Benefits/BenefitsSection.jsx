import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaShieldAlt, FaUserFriends } from "react-icons/fa";

const benefits = [
  {
    icon: <FaUserFriends size={40} className="text-[#f19c79]" />,
    title: "Verified Members",
    description: "All profiles are verified to ensure real, genuine connections.",
  },
  {
    icon: <FaShieldAlt size={40} className="text-[#f19c79]" />,
    title: "Secure Messaging",
    description: "Chat safely with end-to-end encrypted messaging.",
  },
  {
    icon: <FaCheckCircle size={40} className="text-[#f19c79]" />,
    title: "Tailored Matches ",
    description: "Get matches curated specifically according to your preferences.",
  },
];

const BenefitsSection = () => {
  return (
    <div className="relative bg-[#f6f4d2] pb-16 pt-6 px-6  overflow-hidden ">
      
     

      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 z-10 relative">
        Why Choose AuraMatch?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 z-10 text-[#f19c79] relative">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-[#cbdfbd] rounded-3xl p-8 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="mb-4"
            >
              {benefit.icon}
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
            <p className="text-[#f19c79] text-sm">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
