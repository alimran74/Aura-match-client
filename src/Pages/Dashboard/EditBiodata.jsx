import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MySwal = withReactContent(Swal);

const divisions = ["Dhaka", "Chitagong", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"];
const heights = ["Below 5 feet", "5.0", "5.2", "5.4", "5.6", "5.8", "6.0", "6.2", "Above 6.2"];
const weights = ["Below 40kg", "40-50kg", "51-60kg", "61-70kg", "71-80kg", "81-90kg", "Above 90kg"];
const occupations = ["Student", "Service", "Engineer", "Teacher", "Doctor", "Business", "Other"];
const races = ["Fair", "Medium", "Dark", "Light Brown", "Tan"];

const EditBiodata = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: biodata = {}, isLoading } = useQuery({
    queryKey: ["biodata", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodatas/${user.email}`);
      return res.data;
    },
    onSuccess: (data) => {
      reset(data);
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(`/biodatas/${user.email}`, data);
      if (res.data.modifiedCount > 0) {
        await MySwal.fire({
          icon: "success",
          title: "Updated!",
          text: "Your biodata has been updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      MySwal.fire("Error", "Something went wrong while updating biodata.", "error");
    }
  };

  if (isLoading) {
    return <div className="text-center py-10 font-semibold text-[#f19c79]">Loading biodata...</div>;
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-[#cbdfbd] to-[#d4e09b] rounded-xl shadow-xl mt-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-[#f19c79] mb-6 text-center">Edit Your Biodata</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Biodata Type", type: "select", name: "biodataType", options: ["Male", "Female"] },
          { label: "Name", type: "text", name: "name", },
          { label: "Profile Image URL", type: "text", name: "profileImage" },
          { label: "Date of Birth", type: "date", name: "dob" },
          { label: "Height", type: "select", name: "height", options: heights },
          { label: "Weight", type: "select", name: "weight", options: weights },
          { label: "Age", type: "number", name: "age" },
          { label: "Occupation", type: "select", name: "occupation", options: occupations },
          { label: "Race", type: "select", name: "race", options: races },
          { label: "Father's Name", type: "text", name: "fatherName" },
          { label: "Mother's Name", type: "text", name: "motherName" },
          { label: "Permanent Division", type: "select", name: "permanentDivision", options: divisions },
          { label: "Present Division", type: "select", name: "presentDivision", options: divisions },
          { label: "Expected Partner Age", type: "number", name: "expectedPartnerAge" },
          { label: "Expected Partner Height", type: "select", name: "expectedPartnerHeight", options: heights },
          { label: "Expected Partner Weight", type: "select", name: "expectedPartnerWeight", options: weights },
          { label: "Mobile Number", type: "text", name: "mobile" },
        ].map(({ label, type, name, options }) => (
          <div key={name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
            {type === "select" ? (
              <select {...register(name, { required: true })} className="border border-gray-300 px-3 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f19c79]">
                <option value="">Select</option>
                {options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                {...register(name, { required: true })}
                className="border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f19c79]"
              />
            )}
            {errors[name] && <span className="text-sm text-red-500 mt-1">{label} is required</span>}
          </div>
        ))}

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Contact Email</label>
          <input value={user?.email} readOnly className="input bg-gray-100 cursor-not-allowed" />
        </div>

        <div className="md:col-span-2 text-center mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-[#f19c79] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e97b59] transition"
          >
            Save Changes
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditBiodata;
