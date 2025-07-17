import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const SuccessStory = () => {
  const axiosSecure = useAxiosSecure();
  const [stories, setStories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    axiosSecure.get("/success-story").then((res) => {
      setStories(res.data);
    });
  }, [axiosSecure]);

  const openModal = (story) => {
    setSelectedStory(story);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedStory(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Success Stories</h2>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {stories.map((story) => (
    <div
      key={story._id}
      className="bg-[#cbdfbd] shadow-lg rounded-xl border border-[#d4e09b] p-6"
    >
      <div className="mb-2">
        <p className="text-sm font-semibold text-[#f19c79]">Male Biodata ID:</p>
        <p className="text-[#000]">{story.selfBiodataId}</p>
      </div>
      <div className="mb-2">
        <p className="text-sm font-semibold text-[#f19c79]">Female Biodata ID:</p>
        <p className="text-[#000]">{story.partnerBiodataId}</p>
      </div>
      <div className="mb-2">
        <p className="text-sm font-semibold text-[#f19c79]">Email:</p>
        <p className="text-[#000]">{story.email}</p>
      </div>
      <div className="mt-4">
        <button
          onClick={() => openModal(story)}
          className="bg-[#f19c79] hover:bg-[#e88c68] transition-all text-white px-4 py-2 rounded-md w-full"
        >
          View Story
        </button>
      </div>
    </div>
  ))}
</div>

      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black " />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-6">
              <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-[#f6f4d2] p-6 shadow-2xl border border-[#cbdfbd]">
  <Dialog.Title className="text-2xl font-bold text-center text-[#f19c79] mb-4">
    💖 Love Story Highlights
  </Dialog.Title>

  {selectedStory && (
    <div className="grid md:grid-cols-2 gap-6 items-center">
      {/* Couple Image */}
      <div className="text-center">
        <img
          src={selectedStory.image}
          alt="Wedding"
          className="mx-auto rounded-xl shadow-lg h-64 w-full object-cover border-4 border-[#cbdfbd]"
        />
      </div>

      {/* Story Details */}
      <div className="text-sm text-gray-700 space-y-3">
        <div>
          <span className="font-semibold text-[#f19c79]">Your Biodata ID:</span>{" "}
          {selectedStory.selfBiodataId}
        </div>
        <div>
          <span className="font-semibold text-[#f19c79]">Partner Biodata ID:</span>{" "}
          {selectedStory.partnerBiodataId}
        </div>
        <div>
          <span className="font-semibold text-[#f19c79]">Email:</span>{" "}
          {selectedStory.email}
        </div>
        <div>
          <span className="font-semibold text-[#f19c79]">Marriage Date:</span>{" "}
          {new Date(selectedStory.createdAt).toLocaleDateString()}
        </div>
        <div className="pt-2">
          <p className="italic text-gray-600 border-l-4 border-[#f19c79] pl-3">
            “{selectedStory.review}”
          </p>
        </div>
      </div>
    </div>
  )}

  <div className="mt-6 text-center">
    <button
      onClick={closeModal}
      className="px-5 py-2 bg-[#f19c79] text-white font-medium rounded-md hover:bg-[#e6855f] transition"
    >
      Close
    </button>
  </div>
</Dialog.Panel>

            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SuccessStory;
