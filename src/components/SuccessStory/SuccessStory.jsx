import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { FaStar } from "react-icons/fa";
import { format } from "date-fns";
import Spinner from "../Shared/Spinner";

const SuccessStory = () => {
  const axiosPublic = useAxios();
  const [selectedStory, setSelectedStory] = useState(null);
  const modalRef = useRef();

  const { data: successStories = [], isLoading } = useQuery({
    queryKey: ["success-stories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/success-stories");
      return res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  });

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedStory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) return <div className="text-center py-20"><Spinner/></div>;

  return (
    <div className="px-8 mx-auto bg-[#f6f4d2] pb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-black">
        Marriage Success Stories 💍
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {successStories.map((story) => {
          const isLong = story.review?.length > 200;
          return (
            <div
              key={story._id}
              className="bg-[#cbdfbd] shadow-md rounded-2xl overflow-hidden  hover:shadow-xl transition"
            >
              <img src={story.image} alt="Wedding" className="w-full h-56 object-cover" />
              <div className="p-5">
                <p className="text-gray-700 text-sm mb-3">
                  {isLong ? story.review.slice(0, 200) + "..." : story.review}
                </p>

                {isLong && (
                  <button
                    onClick={() => setSelectedStory(story)}
                    className="bg-[#f19c79] hover:bg-[#e88c68] transition-all text-white px-4 py-2 rounded-md mb-2"
                  >
                    Read Full Story
                  </button>
                )}

                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                  {Array.from({ length: story.rating || 5 }).map((_, index) => (
                    <FaStar key={index} />
                  ))}
                </div>

                <p className="text-sm text-gray-500">
                  Married on: {format(new Date(story.createdAt), "MMMM dd, yyyy")}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedStory && (
        <div className="fixed px-8 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-[#cbdfbd] max-w-lg w-full rounded-xl p-6 relative shadow-lg"
          >
            {/* Modern Close Button */}
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 hover:bg-red-500 transition"
              aria-label="Close modal"
            >
              <svg
                className="h-5 w-5 text-gray-600 hover:text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img
              src={selectedStory.image}
              alt="Wedding"
              className="w-full h-56 object-cover rounded-md mb-4"
            />
            <div className="text-gray-700 mb-4">{selectedStory.review}</div>
            <div className="flex items-center gap-1 text-yellow-400 mb-2">
              {Array.from({ length: selectedStory.rating || 5 }).map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Married on: {format(new Date(selectedStory.createdAt), "MMMM dd, yyyy")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStory;
