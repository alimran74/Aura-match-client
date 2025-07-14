import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import registerAnimation from "../../assets/register.json";
import bgCorner from "../../assets/bg1.png";
import fullBg from "../../assets/full-bg.png";
import AuraLogo from "../../components/AuraLogo/AuraLogo";
import { useLoading } from "../../context/LoadingContext";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { showLoading, hideLoading } = useLoading();
  const axiosSecure = useAxios(); 
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useAuth();

  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;

    try {
      showLoading();

      // Step 1: Firebase Auth
      const result = await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL: photo });

      // Step 2: Save user info to backend
      const userInfo = {
        name,
        email,
        photo,
        role: "user",
        hasBioData: false,
      };

      const res = await axiosSecure.post("/users", userInfo);

      if (res.data.insertedId || res.data.message === "User already exists") {
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        throw new Error("Failed to save user data to backend");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed!");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f6f4d2] flex flex-col lg:flex-row items-center justify-center px-4 py-10 overflow-hidden">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${fullBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
        }}
      ></div>

      {/* Top Logo */}
      <div className="absolute top-4 left-4 z-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="scale-125 font-extrabold text-3xl px-4">
            <AuraLogo />
          </div>
        </Link>
      </div>

      {/* Corner Images */}
      <motion.img
        src={bgCorner}
        alt="top corner bg"
        className="absolute top-0 right-0 w-48 md:w-90 z-0 scale-x-[-1] scale-y-[-1]"
      />
      <motion.img
        src={bgCorner}
        alt="bottom corner bg"
        className="absolute bottom-0 left-0 w-48 md:w-[360px] z-0 origin-left"
      />

      {/* Lottie Animation */}
      <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0 z-10">
        <Lottie
          animationData={registerAnimation}
          loop
          className="w-64 sm:w-100 md:w-[300px] lg:w-[600px] h-auto"
        />
      </div>

      {/* Register Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white bg-opacity-90 p-8 rounded-3xl shadow-2xl z-10 backdrop-blur-sm"
      >
        <h1 className="text-3xl font-bold mb-4 text-center flex justify-center">
          <AuraLogo />
        </h1>
        <h2 className="text-3xl font-bold text-[#f19c79] mb-6 text-center">
          Create an Account 💖
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f19c79]"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f19c79]"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f19c79]"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-semibold mb-1">Photo URL</label>
            <input
              type="url"
              {...register("photo", { required: "Photo URL is required" })}
              className="w-full px-4 py-2 border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f19c79]"
              placeholder="https://example.com/photo.jpg"
            />
            {errors.photo && (
              <p className="text-sm text-red-500 mt-1">
                {errors.photo.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#f19c79] hover:bg-[#e6855f] text-white font-semibold py-2 rounded-md shadow transition cursor-pointer"
          >
            Register
          </motion.button>
        </form>

        <p className="text-sm mt-4 text-center text-[#444]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#f19c79] hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
