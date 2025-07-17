import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const divisions = ["Dhaka", "Chitagong", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"];
const heights = ["Below 5 feet", "5.0", "5.2", "5.4", "5.6", "5.8", "6.0", "6.2", "Above 6.2"];
const weights = ["Below 40kg", "40-50kg", "51-60kg", "61-70kg", "71-80kg", "81-90kg", "Above 90kg"];
const occupations = ["Student", "Service", "Engineer", "Teacher", "Doctor", "Business", "Other"];
const races = ["Fair", "Medium", "Dark", "Light Brown", "Tan"];
const MySwal = withReactContent(Swal);

const imgbbAPIKey = import.meta.env.VITE_IMAGE_API_KEY;

const CreateBiodata = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const dob = watch("dob");

  useEffect(() => {
    if (dob) {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      setValue("age", age);
    }
  }, [dob, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const imageFile = data.profileImage[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
        method: "POST",
        body: formData,
      });

      const imgbbData = await imgbbRes.json();

      if (!imgbbData.success) throw new Error("Image upload failed");

      const biodata = {
        ...data,
        age: Number(data.age),
        expectedPartnerAge: Number(data.expectedPartnerAge),
        profileImage: imgbbData.data.display_url,
        contactEmail: user?.email,
        createdAt: new Date(),
        premiumStatus: "none",
      };

      const res = await axiosSecure.post("/biodatas", biodata);

      if (res.data.insertedId) {
        await axiosSecure.patch(`/users/biodata-status/${user.email}`, { hasBioData: true });

        await MySwal.fire({
          icon: "success",
          title: "Biodata Created!",
          text: "Redirecting to dashboard...",
          timer: 2000,
          showConfirmButton: false,
        });

        reset();
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create biodata.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-br from-[#cbdfbd] to-[#d4e09b] rounded-3xl shadow-2xl mt-12">
      <h2 className="text-4xl font-extrabold text-center text-[#f19c79] mb-10 animate-pulse">
        ✨ Create Your Beautiful Biodata
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          ["Biodata Type", "biodataType", "select", ["Male", "Female"]],
          ["Name", "name"],
          ["Profile Image", "profileImage", "file"],
          ["Date of Birth", "dob", "date"],
          ["Height", "height", "select", heights],
          ["Weight", "weight", "select", weights],
          ["Age", "age", "number"],
          ["Occupation", "occupation", "select", occupations],
          ["Race (Skin color)", "race", "select", races],
          ["Father's Name", "fatherName"],
          ["Mother's Name", "motherName"],
          ["Permanent Division", "permanentDivision", "select", divisions],
          ["Present Division", "presentDivision", "select", divisions],
          ["Expected Partner Age", "expectedPartnerAge", "number"],
          ["Expected Partner Height", "expectedPartnerHeight", "select", heights],
          ["Expected Partner Weight", "expectedPartnerWeight", "select", weights],
          ["Mobile Number", "mobile"],
        ].map(([label, name, type = "text", options]) => (
          <div key={name} className="flex flex-col">
            <label className="font-semibold mb-1">{label}</label>
            {type === "select" ? (
              <select
                {...register(name, { required: true })}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f19c79]"
              >
                <option value="">Select</option>
                {options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : type === "file" ? (
              <input
                type="file"
                accept="image/*"
                {...register(name, { required: true })}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f19c79]"
              />
            ) : (
              <input
                type={type}
                {...register(name, { required: true })}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f19c79]"
              />
            )}
            {errors[name] && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>
        ))}

        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold mb-1">Contact Email</label>
          <input
            value={user?.email}
            readOnly
            className="px-4 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
          />
        </div>

        <div className="text-center md:col-span-2 mt-4">
          <motion.button
            type="submit"
            whileHover={{ scale: !loading ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#f19c79] hover:bg-[#e6855f]"
            } text-white px-8 py-3 rounded-xl shadow-lg transition font-bold text-lg`}
          >
            {loading ? "Saving..." : "Save & Publish Now"}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default CreateBiodata;
