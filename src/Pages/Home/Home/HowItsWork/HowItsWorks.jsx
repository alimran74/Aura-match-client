import React from "react";
import { HeartHandshake, UserPlus, BadgeCheck, MessageCircleHeart } from "lucide-react";

const steps = [
  {
    icon: <UserPlus size={36} className="text-[#f19c79]" />,
    title: "Create Account",
    desc: "Sign up and fill in your personal and family details to build your biodata.",
  },
  {
    icon: <HeartHandshake size={36} className="text-[#f19c79]" />,
    title: "Find Matches",
    desc: "Browse through biodatas and use filters to find your perfect match.",
  },
  {
    icon: <MessageCircleHeart size={36} className="text-[#f19c79]" />,
    title: "Connect & Communicate",
    desc: "Send contact requests and chat securely with potential matches.",
  },
  {
    icon: <BadgeCheck size={36} className="text-[#f19c79]" />,
    title: "Fix the Wedding",
    desc: "Finalize biodatas with family approval and start your happy journey.",
  },
];

const HowItsWorks = () => {
  return (
    <section className="bg-[#f6f4d2] py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#222] mb-4">How It Works</h2>
        <p className="text-[#555] mb-10 max-w-2xl mx-auto">
          AuraMatch is built to make your matrimony journey simple, private, and meaningful.
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#cbdfbd] p-6 rounded-xl shadow hover:shadow-md transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#222]">{step.title}</h3>
              <p className="text-sm text-[#444]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItsWorks;
