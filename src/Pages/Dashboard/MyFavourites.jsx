import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyFavourites = () => {
  const axios = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: favourites = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["favourites", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/favourites/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="text-center py-10 text-lg text-gray-500">
        Loading your favourites...
      </div>
    );
  }

  if (isError || !favourites) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load favourite biodatas.
      </div>
    );
  }

  if (favourites.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        You have no favourite biodatas yet.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-[#f19c79] text-center">
        My Favourite Biodatas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favourites.map((fav) => (
          <div
            key={fav.biodataId}
            className="bg-[#cbdfbd] p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={fav.profileImage}
              alt={fav.name}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-semibold">{fav.name}</h3>
            <p className="text-sm text-gray-600 mb-1">
              Biodata ID: {fav.biodataId}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Division: {fav.permanentDivision}
            </p>
            <p className="text-sm text-gray-600 mb-1">Age: {fav.age}</p>
            <p className="text-sm text-gray-600 mb-3">
              Occupation: {fav.occupation}
            </p>
            <button
              onClick={() => navigate(`/biodata/${fav.biodataId}`)}
              className="w-full bg-[#f19c79] hover:bg-[#e6855f] text-white py-2 rounded"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavourites;
