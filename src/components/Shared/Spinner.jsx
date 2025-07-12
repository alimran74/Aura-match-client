import React from "react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 bg-[#f6f4d2] bg-opacity-80 z-50 flex items-center justify-center">
      <div className="w-16 h-16 border-[6px] border-[#cbdfbd] border-t-[#f19c79] border-b-[#d4e09b] rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
