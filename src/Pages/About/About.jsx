import { motion } from "framer-motion";
import {
  FaHeart,
  FaHandHoldingHeart,
  FaHandshake,
  FaUserShield,
  FaSearch,
  FaRegSmile,
  FaCommentDots,
  FaRocket,
} from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaHeart />,
      title: "Personalized Matches",
      desc: "Smart AI pairs you with matches who truly resonate with your heart.",
    },
    {
      icon: <FaHandHoldingHeart />,
      title: "Safe & Verified",
      desc: "Every biodata is reviewed and verified by our moderation team.",
    },
    {
      icon: <FaHandshake />,
      title: "Real Success Stories",
      desc: "We’ve helped thousands start beautiful love stories across Bangladesh.",
    },
    {
      icon: <FaUserShield />,
      title: "Privacy First",
      desc: "End-to-end privacy settings. Only you decide what’s visible.",
    },
    {
      icon: <FaSearch />,
      title: "Advanced Filtering",
      desc: "Filter biodatas by age, location, religion, profession, and more.",
    },
    {
      icon: <FaRegSmile />,
      title: "User Friendly UI",
      desc: "Modern and accessible design for all users, even non-tech people.",
    },
    {
      icon: <FaCommentDots />,
      title: "Secure Chat",
      desc: "Start conversations only when both parties approve contact requests.",
    },
    {
      icon: <FaRocket />,
      title: "Future-Ready Platform",
      desc: "We’re building with the future in mind: speed, security & smart features.",
    },
  ];

  return (
    <section className="bg-[#f6f4d2] text-[#222] py-20 px-6 md:px-20 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#f19c79] mb-4">
          Why Choose AuraMatch?
        </h2>
        <p className="text-lg max-w-2xl mx-auto text-[#333]">
          We bring innovation, safety, and elegance into the world of matrimony — because your search for love deserves nothing less.
        </p>
      </motion.div>

      {/* Feature Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="backdrop-blur-lg bg-[#cbdfbd]/60 border border-[#d4e09b]/40 p-6 rounded-2xl shadow-md text-center transition-all duration-300 flex flex-col items-center justify-center h-full"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#f19c79]/20 text-[#f19c79] text-3xl mb-4">
              {feature.icon}
            </div>
            <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
            <p className="text-sm text-[#333] leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
