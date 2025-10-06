import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { useTheme } from "../context/ThemeContext";

const Customize = ({ isOpen, onClose }) => {
  const { themeColor, changeThemeColor } = useTheme();
  const [selectedColor, setSelectedColor] = useState(themeColor);

  const colors = [
    "#0472F0",
    "#DD193A",
    "#FE42B2",
    "#FF5100",
    "#EE4D49",
    "#000000",
    "#0ba0db",
    "#3B0270",
    "#1B9D84",
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
        <div
          style={{ backgroundColor: themeColor }}
          className="h-14 text-white flex items-center justify-between px-5"
        >
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
          <div className="flex flex-wrap items-center justify-center gap-5">
            {colors.map((color) => (
              <div
                key={color}
                onClick={() => {
                  changeThemeColor(color);
                  setSelectedColor(color);
                }}
                className="h-12 w-16 cursor-pointer rounded-md relative"
                style={{
                  backgroundColor: color,
                }}
              >
                {selectedColor === color && (
                  <div className="absolute top-5 right-1 bg-white rounded-full p-[2px] shadow">
                    <TiTick className="text-black text-xl" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Customize;
