import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Trash2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const CartModal = ({ isOpen, onClose }) => {
  const { themeColor } = useTheme()
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[998] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className={`h-screen w-[392px] fixed top-0 right-0 z-[999] bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div   style={{ backgroundColor: themeColor }} className="h-16 flex items-center justify-between px-6   text-white">
          <h2 className="font-semibold text-2xl">Cart</h2>
          <button
            onClick={onClose}
            className="font-semibold text-3xl cursor-pointer transition-transform duration-300 hover:rotate-180"
          >
            <RxCross2 />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="h-[calc(100%-4rem)]  overflow-y-auto">
          {Array(50)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className={`flex items-center justify-between pt-2 pb-2 px-2 h-24 mt-5 ${
                  index % 2 === 0 ? "bg-blue-500/45" : "bg-gray-500/50"
                }`}
              >
                <div className="h-full w-28 flex items-center justify-center bg-orange-500">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1673439304183-8840bd0dc1bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emF8ZW58MHx8MHx8fDA%3D"
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button className="w-8 h-8 cursor-pointer bg-white rounded-full flex items-center justify-center font-bold text-pink-500 hover:bg-gray-100">
                    -
                  </button>
                  <span className="text-white font-semibold text-lg">1</span>
                  <button className="w-8 h-8 cursor-pointer bg-white rounded-full flex items-center justify-center font-bold text-pink-500 hover:bg-gray-100">
                    +
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => alert(index)}
                    className="cursor-pointer text-white hover:text-red-200 transition-colors"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="h-[80px] space-y-2  w-full bg-white   fixed bottom-0">
          <button className="cursor-pointer h-[40px] bg-pink-500 w-full">
            View in Cart
          </button>
          <button className="cursor-pointer h-[40px] bg-orange-500 w-full">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartModal;
