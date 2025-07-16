import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Shared/Spinner";

const MySwal = withReactContent(Swal);

const MyBiodata = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: biodata = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["biodata", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodatas/${user.email}`);
      return res.data;
    },
  });

  const handlePremiumRequest = async () => {
    const confirmed = await MySwal.fire({
      title: "Make Premium?",
      text: "Are you sure you want to request premium status for your biodata?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, request",
      cancelButtonText: "Cancel",
    });

    if (confirmed.isConfirmed) {
      try {
        const res = await axiosSecure.patch(
          `/biodatas/request-premium/${biodata._id}`,
          {
            premiumStatus: "pending",
          }
        );

        if (res.data.success) {
          await MySwal.fire(
            "Requested!",
            "Your biodata has been sent for premium approval.",
            "success"
          );
          refetch();
        }
      } catch (err) {
        console.error(err);
        MySwal.fire("Error", "Failed to request premium.", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10 font-semibold text-[#f19c79]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-[#cbdfbd] to-[#d4e09b] rounded-3xl shadow-2xl mt-12">
      <h2 className="text-4xl font-extrabold text-center text-[#f19c79] mb-10">
        🌟 My Biodata 🌟
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        <div className="md:col-span-2 text-center">
          <img
            src={biodata.profileImage}
            alt="Profile"
            className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-[#f19c79]"
          />
          <h3 className="text-2xl mt-4 font-bold text-[#222]">
            {biodata.name}
          </h3>
          <p className="text-sm text-gray-600">
            Biodata Type: {biodata.biodataType}
          </p>
        </div>

        <Info label="Date of Birth" value={biodata.dob} />
        <Info label="Age" value={biodata.age} />
        <Info label="Height" value={biodata.height} />
        <Info label="Weight" value={biodata.weight} />
        <Info label="Occupation" value={biodata.occupation} />
        <Info label="Race" value={biodata.race} />
        <Info label="Father's Name" value={biodata.fatherName} />
        <Info label="Mother's Name" value={biodata.motherName} />
        <Info label="Permanent Division" value={biodata.permanentDivision} />
        <Info label="Present Division" value={biodata.presentDivision} />

        <div className="md:col-span-2">
          <h4 className="text-xl font-bold text-[#f19c79] mb-2">
            🧡 Partner Expectations
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Info label="Expected Age" value={biodata.expectedPartnerAge} />
            <Info
              label="Expected Height"
              value={biodata.expectedPartnerHeight}
            />
            <Info
              label="Expected Weight"
              value={biodata.expectedPartnerWeight}
            />
          </div>
        </div>

        <Info label="Mobile Number" value={biodata.mobile} />
        <Info label="Email" value={biodata.contactEmail} />
      </div>

      {/* Premium Section */}
      <div className="mt-10 text-center">
        {biodata.premiumStatus === "none" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePremiumRequest}
            className="bg-[#f19c79] text-white px-6 py-2 rounded-lg shadow hover:bg-[#e6855f] font-semibold"
          >
            Make Biodata Premium
          </motion.button>
        )}
        {biodata.premiumStatus === "pending" && (
          <p className="text-[#f19c79] font-medium">
            ⏳ Your request for premium is pending admin approval.
          </p>
        )}
        {biodata.premiumStatus === "approved" && (
          <p className="text-green-600 font-medium">
            🎉 Your biodata is now premium!
          </p>
        )}
      </div>
    </div>
  );
};

// Small reusable component
const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-semibold">{value || "N/A"}</p>
  </div>
);

export default MyBiodata;
