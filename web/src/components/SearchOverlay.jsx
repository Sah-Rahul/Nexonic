import React from "react";

const SearchOverlay = ({ onClose }) => {
  return (
    <div className="absolute top-28 right-16 h-[502px] w-72 bg-red-500 z-[999]">
      <button 
        onClick={onClose} 
        className="absolute top-2 right-2 text-white font-bold"
      >
        ✕
      </button>
      <div className="p-4 text-white">Search Results...</div>
    </div>
  );
};

export default SearchOverlay;
