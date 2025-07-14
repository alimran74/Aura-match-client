import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { motion } from "framer-motion";
import { LoadingProvider } from "../../context/LoadingContext";
import { useNavigate } from "react-router";


const divisions = [
  "Dhaka",
  "Chattagra",
  "Rangpur",
  "Barisal",
  "Khulna",
  "Mymensingh",
  "Sylhet",
];

const Biodatas = () => {
  const axios = useAxios();
  const navigate = useNavigate();

  // Filters
  const [ageRange, setAgeRange] = useState([10, 100]);
  const [biodataType, setBiodataType] = useState("");
  const [division, setDivision] = useState("");

  // Query using TanStack Query
  const { data: biodatas = [], isLoading } = useQuery({
    queryKey: ["biodatas", ageRange, biodataType, division],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("age_gte", ageRange[0]);
      params.append("age_lte", ageRange[1]);
      if (biodataType) params.append("type", biodataType);
      if (division) params.append("division", division);

      const res = await axios.get(`/biodatas?${params.toString()}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-[#f6f4d2] text-[#333] p-6 md:p-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Filter Section */}
      <div className="bg-[#d4e09b] rounded-xl p-6 shadow-md lg:col-span-1">
        <h2 className="text-2xl font-bold text-[#f19c79] mb-4">Filters</h2>

        {/* Age Range */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Age Range</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={10}
              max={100}
              value={ageRange[0]}
              onChange={(e) => setAgeRange([+e.target.value, ageRange[1]])}
              className="w-full border px-2 py-1 rounded"
            />
            <span>-</span>
            <input
              type="number"
              min={10}
              max={100}
              value={ageRange[1]}
              onChange={(e) => setAgeRange([ageRange[0], +e.target.value])}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        </div>

        {/* Biodata Type */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Biodata Type</label>
          <select
            value={biodataType}
            onChange={(e) => setBiodataType(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Division */}
        <div>
          <label className="block mb-1 font-medium">Division</label>
          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="">All</option>
            {divisions.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Biodata List Section */}
      <div className="lg:col-span-3">
        <h2 className="text-2xl font-bold text-[#f19c79] mb-6 text-center">
          All Biodatas
        </h2>

        {isLoading ? (
          <LoadingProvider />
        ) : biodatas.length === 0 ? (
          <p className="text-center text-gray-500">No biodatas found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {biodatas.map((biodata) => (
              <motion.div
                key={biodata._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#cbdfbd] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={biodata.profileImage}
                  alt={biodata.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1 text-[#444]">
                    {biodata.name} ({biodata.biodataType})
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Biodata ID: {biodata.biodataId}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Division: {biodata.permanentDivision}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
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
      </div>
    </div>
  );
};

export default Biodatas;
