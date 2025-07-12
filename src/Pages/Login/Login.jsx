import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Link } from "react-router";

import loginAnimation from "../../assets/login.json";
import bgCorner from "../../assets/bg1.png";
import fullBg from "../../assets/full-bg.png";
import AuraLogo from "../../components/AuraLogo/AuraLogo";
import { useLoading } from "../../context/LoadingContext"; 

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { showLoading, hideLoading } = useLoading();

  const onSubmit = (data) => {
    showLoading();
    console.log("Login Data:", data);

    // Simulate login process
    setTimeout(() => {
      hideLoading();
      // redirect or show toast here
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#f6f4d2] flex flex-col lg:flex-row items-center justify-center px-4 py-10 overflow-hidden">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${fullBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
        }}
      ></div>

      {/* Top Aura Logo */}
      <div className="absolute top-4 left-4 z-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="scale-125 font-extrabold text-3xl px-4">
            <AuraLogo />
          </div>
        </Link>
      </div>

      {/* Top-Right Corner Image */}
      <motion.img
        src={bgCorner}
        alt="top corner bg"
        className="absolute top-0 right-0 w-48 md:w-90 z-0 scale-x-[-1] scale-y-[-1]"
      />

      {/* Bottom-Left Corner Image */}
      <motion.img
        src={bgCorner}
        alt="bottom corner bg"
        className="absolute bottom-0 left-0 w-48 md:w-[360px] z-0 origin-left"
      />

      {/* Lottie Animation */}
      <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0 z-10">
        <Lottie
          animationData={loginAnimation}
          loop
          className="w-64 sm:w-80 md:w-[300px] lg:w-[400px] h-auto"
        />
      </div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white bg-opacity-90 p-8 rounded-3xl shadow-2xl z-10 backdrop-blur-sm"
      >
        <h2 className="text-3xl font-bold text-[#f19c79] mb-6 text-center">
          Welcome Back 💫
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f19c79]"
              placeholder="example@mail.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f19c79]"
              placeholder="*******"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#f19c79] hover:bg-[#e6855f] text-white font-semibold py-2 rounded-md shadow transition cursor-pointer"
          >
            Login
          </motion.button>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={() => console.log("Handle Google Sign In")}
            className="w-full flex items-center justify-center gap-3 border border-[#ccc] hover:border-[#f19c79] text-[#444] font-medium cursor-pointer py-2 rounded-md shadow-sm transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </form>

        {/* Register Redirect */}
        <p className="text-sm mt-4 text-center text-[#444]">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#f19c79] hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
