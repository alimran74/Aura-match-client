import React from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  HeartHandshake,
  MessageCircleHeart,
  BadgeCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    icon: <UserPlus size={36} className="text-[#f19c79]" />,
    title: "1. Create Account",
    desc: "Register and build your biodata with personal and family information.",
  },
  {
    icon: <ShieldCheck size={36} className="text-[#f19c79]" />,
    title: "2. Verify Details",
    desc: "We ensure all data is reviewed to maintain privacy and authenticity.",
  },
  {
    icon: <HeartHandshake size={36} className="text-[#f19c79]" />,
    title: "3. Find Matches",
    desc: "Explore suitable biodatas using filters based on your preferences.",
  },
  {
    icon: <MessageCircleHeart size={36} className="text-[#f19c79]" />,
    title: "4. Connect Privately",
    desc: "Send contact requests and chat securely with potential partners.",
  },
  {
    icon: <BadgeCheck size={36} className="text-[#f19c79]" />,
    title: "5. Fix the Wedding",
    desc: "Finalize biodatas with family involvement and agreement.",
  },
  {
    icon: <Sparkles size={36} className="text-[#f19c79]" />,
    title: "6. Begin New Journey",
    desc: "Start your new life chapter with love, respect, and blessings.",
  },
];

const HowItsWorks = () => {
  return (
    <section className="bg-[#f6f4d2] pb-14 pt-12 px-4">
      <div className=" px-4 mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#222] mb-4">
            How AuraMatch Works
          </h2>
          <p className="text-[#555] mb-10 max-w-2xl mx-auto">
            From creating your profile to finding your soulmate — it's simple, secure, and beautiful.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-[#cbdfbd] p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-[#222]">{step.title}</h3>
              <p className="text-sm text-[#444]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItsWorks;
