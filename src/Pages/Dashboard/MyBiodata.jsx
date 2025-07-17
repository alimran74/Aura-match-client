import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion } from "framer-motion";
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
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-12 p-6 bg-[#cbdfbd] rounded-3xl shadow-xl border border-gray-200">
      <h2 className="text-4xl font-extrabold text-center text-rose-600 mb-12">
        🌟 My Biodata 🌟
      </h2>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
        <div className="flex-shrink-0">
          <img
            src={biodata.profileImage}
            alt="Profile"
            className="w-full h-40 rounded-xl border-1 border-rose-300 object-cover shadow-lg"
          />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-bold text-gray-900">{biodata.name}</h3>
          <p className="text-md text-gray-500 mt-1 font-semibold">
            Biodata Type: <span className="text-rose-600">{biodata.biodataType}</span>
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-gray-700">
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
      </div>

      {/* Partner Expectations */}
      <div className="mt-14 p-6 bg-[#d4e09b] rounded-xl border border-rose-200 shadow-inner">
        <h4 className="text-2xl font-semibold text-rose-700 text-center mb-6 flex items-center gap-2">
          🧡 Partner Expectations
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-800">
          <Info label="Expected Age" value={biodata.expectedPartnerAge} />
          <Info label="Expected Height" value={biodata.expectedPartnerHeight} />
          <Info label="Expected Weight" value={biodata.expectedPartnerWeight} />
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-700">
        <Info label="Mobile Number" value={biodata.mobile} />
        <Info label="Email" value={biodata.contactEmail} />
      </div>

      {/* Premium Request */}
      <div className="mt-12  text-center">
        {biodata.premiumStatus === "none" && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePremiumRequest}
            className="inline-block bg-[#d4e09b] text-black px-8 py-3 rounded-full shadow-lg font-semibold tracking-wide hover:bg-[#a5b169] transition"
          >
            Make Biodata Premium
          </motion.button>
        )}
        {biodata.premiumStatus === "pending" && (
          <p className="text-rose-600 font-semibold text-lg">
            ⏳ Your request for premium is pending admin approval.
          </p>
        )}
        {biodata.premiumStatus === "approved" && (
          <p className="text-green-600 font-semibold text-lg">
            🎉 Your biodata is now premium!
          </p>
        )}
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="bg-[#f19c79]/80 p-4 rounded-xl shadow-sm border border-[#f19c79]">
    <p className="text-sm text-gray-700 text-center uppercase tracking-wide">{label}</p>
    <p className="mt-1 text-lg text-center font-medium text-gray-900">{value || "N/A"}</p>
  </div>
);

export default MyBiodata;
