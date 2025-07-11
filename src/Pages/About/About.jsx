import { motion } from "framer-motion";
import { FaHeart, FaHandHoldingHeart, FaHandshake } from "react-icons/fa6";

const About = () => {
  return (
    <section className="bg-[#f6f4d2] text-[#222] py-16 px-6 md:px-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#f19c79] mb-4">
          About AuraMatch
        </h2>
        <p className="text-lg max-w-2xl mx-auto">
          AuraMatch is not just a matrimony platform — it's a journey toward meaningful companionship, built on compatibility, trust, and shared values.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-[#cbdfbd] p-6 rounded-xl shadow-md text-center"
        >
          <FaHeart className="text-4xl mx-auto text-[#f19c79] mb-4" />
          <h4 className="text-xl font-semibold mb-2">Personalized Matches</h4>
          <p className="text-sm">
            Advanced matching algorithms suggest profiles based on your values, interests, and preferences.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-[#cbdfbd] p-6 rounded-xl shadow-md text-center"
        >
          <FaHandHoldingHeart className="text-4xl mx-auto text-[#f19c79] mb-4" />
          <h4 className="text-xl font-semibold mb-2">Safe & Verified</h4>
          <p className="text-sm">
            We prioritize your security with verified biodatas and privacy-first features for safe interactions.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-[#cbdfbd] p-6 rounded-xl shadow-md text-center"
        >
          <FaHandshake className="text-4xl mx-auto text-[#f19c79] mb-4" />
          <h4 className="text-xl font-semibold mb-2">Trusted by Thousands</h4>
          <p className="text-sm">
            With real success stories and happy couples, AuraMatch continues to unite hearts across the nation.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
