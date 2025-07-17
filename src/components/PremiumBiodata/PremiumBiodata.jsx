import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { LoadingProvider } from "../../context/LoadingContext";

const PremiumBiodata = () => {
  const axios = useAxios();
  const navigate = useNavigate();

  const { data: premiumBiodatas = [], isLoading } = useQuery({
    queryKey: ["premium-biodatas"],
    queryFn: async () => {
      const res = await axios.get("/biodatas-premium?premiumStatus=approved&limit=6");
      return res.data;
    },
  });

  return (
    <section className="pt-20 pb-12 px-6 bg-[#f6f4d2] min-h-[60vh]">
      <h2 className="text-3xl font-bold text-black text-center mb-8">
        Premium Biodata ✨
      </h2>

      {isLoading ? (
        <LoadingProvider />
      ) : premiumBiodatas.length === 0 ? (
        <p className="text-center text-gray-600">No premium biodatas found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {premiumBiodatas.slice(0, 6).map((biodata) => (
            <motion.div
              key={biodata._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#cbdfbd] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={biodata.profileImage}
                alt={biodata.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-[#444] mb-1">
                  {biodata.name} ({biodata.biodataType})
                </h3>
                <p className="text-sm text-gray-600">
                  Biodata ID: {biodata.biodataId}
                </p>
                <p className="text-sm text-gray-600">
                  Division: {biodata.permanentDivision}
                </p>
                <p className="text-sm text-gray-600">
                  Age: {biodata.age}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Occupation: {biodata.occupation}
                </p>
                <button
                  onClick={() => navigate(`/biodata/${biodata._id}`)}
                  className="bg-[#f19c79] text-white px-4 py-2 rounded hover:bg-[#e6855f] transition text-sm"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PremiumBiodata;
