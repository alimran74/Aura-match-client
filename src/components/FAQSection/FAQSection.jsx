import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "How do premium features differ?",
    answer:
      "Premium features allow you to access advanced filters, view more profiles, send unlimited messages, and see who viewed your profile.",
  },
  {
    question: "What privacy measures are in place?",
    answer:
      "We use end-to-end encryption for messages, secure servers for data storage, and strict verification processes for members.",
  },
  {
    question: "Can I delete my account anytime?",
    answer:
      "Yes, you can delete your account from settings. All your data will be permanently removed from our platform.",
  },
  {
    question: "How are matches suggested?",
    answer:
      "Matches are suggested based on your profile preferences, interests, and activity, ensuring compatibility and relevance.",
  },
  {
    question: "Is messaging free for all users?",
    answer:
      "Basic messaging is free, but premium members enjoy unlimited messaging and advanced interaction options.",
  },
  {
    question: "Can I hide my profile from certain members?",
    answer:
      "Yes, our privacy settings let you control who can see your profile, including blocking specific members.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#f6f4d2] pt-6 pb-12 px-6">
      <div className="max-w-6xl mx-auto px-6 bg-[#f6f4d2] rounded-2xl pb-6 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-[#f19c79] rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-4 bg-[#d4e09b] hover:bg-[#cbdfbd] transition font-medium text-gray-800"
              >
                {item.question}
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-[#f09f7c] text-gray-700">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
