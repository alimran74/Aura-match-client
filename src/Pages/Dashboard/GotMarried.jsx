import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { getAuth } from "firebase/auth";

const GotMarried = () => {
  const axiosSecure = useAxiosSecure();
  const [submitted, setSubmitted] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 🔍 Check if the user already submitted a story
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axiosSecure.get(`/success-story/check?email=${user?.email}`);
        if (res.data?.alreadySubmitted) {
          setSubmitted(true);
        }
      } catch (err) {
        console.error("Error checking story status", err);
      }
    };

    if (user?.email) fetchStory();
  }, [axiosSecure, user?.email]);

  const onSubmit = async (data) => {
    const storyData = {
      ...data,
      email: user?.email,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/success-story", storyData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Story Submitted!",
          text: "Thank you for sharing your story 💖",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Failed to submit story", err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to submit story. Please try again.",
      });
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto mt-10 bg-white shadow p-6 rounded-md text-center">
        <h2 className="text-2xl font-semibold text-green-600">
          Thank you! Your success story has been submitted. 🎉
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#cbdfbd] shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
        Share Your Success Story 💕
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Self Biodata ID */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Your Biodata ID
          </label>
          <input
            type="text"
            {...register("selfBiodataId", { required: true })}
            className="w-full border rounded-md p-2"
            placeholder="Enter your biodata ID"
          />
          {errors.selfBiodataId && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Partner Biodata ID */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Partner Biodata ID
          </label>
          <input
            type="text"
            {...register("partnerBiodataId", { required: true })}
            className="w-full border rounded-md p-2"
            placeholder="Enter partner's biodata ID"
          />
          {errors.partnerBiodataId && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Couple Image */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Couple Image URL
          </label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="w-full border rounded-md p-2"
            placeholder="Image link of couple"
          />
          {errors.image && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Review */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Your Review
          </label>
          <textarea
            {...register("review", { required: true })}
            rows={5}
            className="w-full border rounded-md p-2"
            placeholder="Share your experience using this platform..."
          ></textarea>
          {errors.review && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#f19c79] hover:bg-[#e6855f] text-white  py-2 px-6 rounded-md transition"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default GotMarried;
