import React from "react";
import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const SuccessCounter = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["success-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/success-stats");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center p-10">Loading...</div>;

  const { totalBiodata, maleBiodata, femaleBiodata, marriageCount } = stats;

  const counters = [
    { title: "Total Biodata", count: totalBiodata, color: "text-[#f19c79]" },
    { title: "Boys Biodata", count: maleBiodata, color: "text-[#f19c79]" },
    { title: "Girls Biodata", count: femaleBiodata, color: "text-[#f19c79]" },
    { title: "Marriages Completed", count: marriageCount, color: "text-[#f19c79]" },
  ];

  return (
    <section className="pb-20 pt-8 bg-[#f6f4d2]">
      <div className="px-8 mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">AuraMatch At A Glance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {counters.map(({ title, count, color }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
              className="bg-[#cbdfbd] shadow-md rounded-2xl p-6 flex flex-col items-center justify-center"
            >
              <h3 className={`text-4xl font-extrabold ${color}`}>
                <CountUp end={count} duration={2} />
              </h3>
              <p className="mt-2 text-lg font-medium text-gray-700">{title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessCounter;
