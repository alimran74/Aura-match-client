import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
  FaPaperPlane,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.", {
      position: "top-center",
      autoClose: 3000,
    });
    e.target.reset();
  };

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
          Contact AuraMatch
        </h2>
        <p className="text-lg max-w-xl mx-auto">
          We're happy to help! Send us your thoughts, questions, or feedback.
        </p>
      </motion.div>

      {/* Content */}
      <div className="grid gap-10 md:grid-cols-2">
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-[#cbdfbd]/60 backdrop-blur-md p-8 rounded-xl shadow-lg space-y-5"
        >
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute top-3.5 left-3 text-[#f19c79]" />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="pl-10 py-2 w-full border border-[#d4e09b] rounded focus:outline-none focus:ring-2 focus:ring-[#f19c79] bg-white"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-3.5 left-3 text-[#f19c79]" />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="pl-10 py-2 w-full border border-[#d4e09b] rounded focus:outline-none focus:ring-2 focus:ring-[#f19c79] bg-white"
            />
          </div>

          {/* Message */}
          <div className="relative">
            <FaPaperPlane className="absolute top-3.5 left-3 text-[#f19c79]" />
            <textarea
              placeholder="Your Message"
              rows="5"
              required
              className="pl-10 pt-3 w-full border border-[#d4e09b] rounded focus:outline-none focus:ring-2 focus:ring-[#f19c79] bg-white"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#f19c79] text-white px-6 py-2 rounded hover:bg-[#e6835f] transition w-full"
          >
            Send Message
          </button>
        </motion.form>

        {/* Contact Info + Map */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="bg-[#cbdfbd]/60 p-6 rounded-xl shadow-md">
            <h4 className="text-lg font-semibold text-[#f19c79] mb-4">
              Contact Info
            </h4>
            <p className="flex items-center gap-2 mb-2">
              <FaPhoneAlt className="text-[#f19c79]" /> +880-1234-567890
            </p>
            <p className="flex items-center gap-2 mb-2">
              <FaEnvelope className="text-[#f19c79]" /> support@auramatch.com
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#f19c79]" /> Mirpur, Dhaka
            </p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-md">
            <iframe
              title="Mirpur, Dhaka Map"
              className="w-full h-48 rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5971313383873!2d90.35365341536347!3d23.80101839220938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c116f681231f%3A0x96b0b1b2148b63f5!2sMirpur%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1701000000000"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
