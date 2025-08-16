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
      const res = await axios.get(
        "/biodatas-premium?premiumStatus=approved&limit=8"
      );
      return res.data;
    },
  });

  return (
    <section className="pt-20 pb-12 px-6 bg-[#f6f4d2]  min-h-[60vh]">
      <h2 className="text-3xl font-bold text-[#222] text-center mb-12">
        Premium Biodata ✨
      </h2>

      {isLoading ? (
        <LoadingProvider />
      ) : premiumBiodatas.length === 0 ? (
        <p className="text-center text-gray-600">No premium biodatas found.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {premiumBiodatas.slice(0, 8).map((biodata) => (
            <motion.div
              key={biodata._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05, rotateX: 2, rotateY: 2 }}
              className="relative group bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(241,156,121,0.6)]"
            >
              {/* Gradient border glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d4e09b] via-[#d4e09b] to-[#cbdfbd] opacity- group-hover:opacity-50 transition duration-500 blur-xl"></div>

              {/* Content */}
              <div className="relative z-10">
                <img
                  src={biodata.profileImage}
                  alt={biodata.name}
                  className="w-full h-52 object-cover rounded-t-2xl"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {biodata.name}{" "}
                    <span className="text-sm text-[#f19c79] font-medium">
                      ({biodata.biodataType})
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">ID:</span>{" "}
                    {biodata.biodataId}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Division:</span>{" "}
                    {biodata.permanentDivision}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Age:</span> {biodata.age}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">Occupation:</span>{" "}
                    {biodata.occupation}
                  </p>

                  <button
                    onClick={() => navigate(`/biodata/${biodata._id}`)}
                    className="w-full bg-gradient-to-r from-[#f19c79] to-[#f6bd60] text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PremiumBiodata;
