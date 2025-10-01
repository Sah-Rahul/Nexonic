import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useTheme } from "../context/ThemeContext";

const Customize = ({ isOpen, onClose }) => {
     
  
  const { themeColor, changeThemeColor } = useTheme();

  const colors = [
    "#0472F0",
    "#212121",
    "#FE42B2",
    "#FF5100",
    "#EE4D49",
    "#000000",
    "#0ba0db",
    "#1B9D84",
    "#344F1F",
  ];

  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[999] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* sidebar */}
      <div
        className={`h-full w-[355px] fixed top-0 right-0 z-[1000] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div style={{ backgroundColor: themeColor }} className="h-14  text-white flex items-center justify-between px-5">
          <h2 className="text-2xl font-semibold">Customize</h2>
          <button
            onClick={onClose}
            className="text-3xl cursor-pointer hover:text-red-500 transition-all"
          >
            <RxCross2 />
          </button>
        </div>

        {/* Theme Colors */}
        <div className="p-5">
          <p className="font-bold mb-3">Select Theme Color</p>
          <div className="flex  flex-wrap items-center justify-center gap-5">
            {colors.map((color) => (
              <div
                key={color}
                onClick={() => changeThemeColor(color)}
                className="h-12 w-16 cursor-pointer rounded-md"
                style={{
                  backgroundColor: color,
                  border: color === themeColor ? "3px solid black" : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Customize;
