import React from "react";
import { Trash2 } from "lucide-react";
import { RxCross2 } from "react-icons/rx";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import EmptyCart from "./EmptyCart";

interface Product {
  id: string | number;
  name: string;
  img: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CartItem[];
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, data }) => {
  const { themeColor } = useTheme();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-998 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <div
        className={`h-screen w-[392px] fixed top-0 right-0 z-999 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          style={{ color: themeColor }}
          className="h-16 border-b flex items-center justify-between px-6"
        >
          <h2 className="font-semibold text-2xl">Cart</h2>
          <button
            onClick={onClose}
            className="font-semibold text-3xl cursor-pointer transition-transform duration-300 hover:rotate-180"
          >
            <RxCross2 />
          </button>
        </div>

        <div className="h-[calc(100%-8rem)] overflow-y-auto p-4">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 h-24 mb-3 border rounded-lg"
              >
                <div className="h-full w-20 flex items-center justify-center bg-gray-200">
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button className="w-8 h-8 cursor-pointer bg-white rounded-full flex items-center justify-center font-bold text-pink-500 hover:bg-gray-100">
                    -
                  </button>
                  <span className="font-semibold text-lg">{item.quantity}</span>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer font-bold text-pink-500 hover:bg-gray-100">
                    +
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-semibold">
                    ${item.product.price * item.quantity}
                  </span>
                  <button className="text-red-500 cursor-pointer hover:text-red-700 transition-colors">
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center mt-20">
              <EmptyCart />
            </div>
          )}
        </div>

        {data && data.length > 0 && (
          <div
            style={{ background: themeColor }}
            className="h-[62px] w-full fixed bottom-0 p-2"
          >
            <Link to="/cart">
              <button className="cursor-pointer h-[62px] w-full font-semibold text-white rounded">
                View in Cart
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;
