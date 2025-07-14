import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const BiodataDetails = () => {
    const axios = useAxios();

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch single biodata
  const { data: biodata, isLoading } = useQuery({
    queryKey: ["biodata", id],
    queryFn: async () => {
      const res = await axios.get(`/biodatas/id/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Fetch similar biodatas
  const { data: similar = [] } = useQuery({
    queryKey: ["similar", biodata?.biodataType],
    queryFn: async () => {
      const res = await axios.get(`/biodatas`);
      return res.data.filter(
        (item) =>
          item.biodataType === biodata?.biodataType &&
          item._id !== biodata._id
      );
    },
    enabled: !!biodata?.biodataType,
  });

  const handleAddToFavourites = async () => {
    try {
      const favourite = {
        userEmail: user.email,
        biodataId: biodata._id,
        biodataType: biodata.biodataType,
        name: biodata.name,
        profileImage: biodata.profileImage,
        permanentDivision: biodata.permanentDivision,
        age: biodata.age,
        occupation: biodata.occupation,
      };

      const res = await axios.post("/favourites", favourite);
      if (res.data.insertedId) {
        toast.success("Added to favourites!");
      } else {
        toast.error("Already in favourites.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to favourites.");
    }
  };

  const isPremium = user?.role === "premium";

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (!biodata) return <div className="text-center py-10">Biodata not found.</div>;

  const {
    biodataId,
    biodataType,
    profileImage,
    name,
    dob,
    age,
    occupation,
    race,
    height,
    weight,
    fatherName,
    motherName,
    permanentDivision,
    presentDivision,
    expectedPartnerAge,
    expectedPartnerHeight,
    expectedPartnerWeight,
    mobile,
    contactEmail,
  } = biodata;
 console.log("BiodataDetails - ID from URL:", id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Main Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col items-center">
          <img
            src={profileImage}
            alt={name}
            className="w-60 h-60 object-cover rounded-xl shadow"
          />
          <p className="mt-4 text-sm text-gray-600">Biodata ID: #{biodataId}</p>
          <button
            onClick={handleAddToFavourites}
            className="bg-[#f19c79] hover:bg-[#e6855f] text-white px-4 py-2 mt-4 rounded-md"
          >
            ❤️ Add to Favourites
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-[#f19c79]">{name}</h2>
          <p><strong>Biodata Type:</strong> {biodataType}</p>
          <p><strong>Date of Birth:</strong> {dob}</p>
          <p><strong>Age:</strong> {age} years</p>
          <p><strong>Occupation:</strong> {occupation}</p>
          <p><strong>Race:</strong> {race}</p>
          <p><strong>Height:</strong> {height}</p>
          <p><strong>Weight:</strong> {weight}</p>
          <p><strong>Father's Name:</strong> {fatherName}</p>
          <p><strong>Mother's Name:</strong> {motherName}</p>
          <p><strong>Permanent Division:</strong> {permanentDivision}</p>
          <p><strong>Present Division:</strong> {presentDivision}</p>
        </div>
      </div>

      {/* Partner Expectations */}
      <div className="mt-10 bg-[#fef6f0] p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-2 text-[#f19c79]">Partner Expectations</h3>
        <p><strong>Expected Age:</strong> {expectedPartnerAge}</p>
        <p><strong>Expected Height:</strong> {expectedPartnerHeight}</p>
        <p><strong>Expected Weight:</strong> {expectedPartnerWeight}</p>
      </div>

      {/* Contact Info */}
      <div className="mt-10 bg-[#edf2d7] p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-2 text-[#6c9a8b]">Contact Information</h3>
        {isPremium ? (
          <>
            <p><strong>Email:</strong> {contactEmail}</p>
            <p><strong>Phone:</strong> {mobile}</p>
          </>
        ) : (
          <>
            <p className="text-gray-700 mb-2">
              This information is only available for Premium Members.
            </p>
            <button
              onClick={() => navigate(`/checkout/contact/${biodata._id}`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Request Contact Info
            </button>
          </>
        )}
      </div>

      {/* Similar Biodatas */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4 text-[#f19c79]">Similar Biodatas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similar.slice(0, 3).map((sim) => (
            <div
              key={sim._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <img
                src={sim.profileImage}
                alt={sim.name}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h4 className="text-lg font-semibold">{sim.name}</h4>
              <p className="text-sm text-gray-600">{sim.permanentDivision}</p>
              <p className="text-sm">Age: {sim.age}</p>
              <p className="text-sm">Occupation: {sim.occupation}</p>
              <button
                onClick={() => navigate(`/biodata/${sim._id}`)}
                className="mt-3 w-full bg-[#f19c79] hover:bg-[#e6855f] text-white py-1 rounded"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiodataDetails;
