import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Trash2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../store/slices/cartSlice";
import EmptyCart from "./EmptyCart";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const CartModal = ({ isOpen, onClose, data }) => {
  const { themeColor } = useTheme();
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // console.log(data);

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      toast.error("minium one item is required ");
    } else {
      dispatch(updateCartQuantity({ id, quantity }));
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[998]  transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className={`h-screen w-[392px] fixed top-0 right-0 z-[999]  bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div
          style={{ color: themeColor }}
          className="h-16 border-b-1  flex items-center justify-between px-6"
        >
          <h2 className="font-semibold text-2xl">Cart</h2>
          <button
            onClick={onClose}
            className="font-semibold text-3xl cursor-pointer transition-transform duration-300 hover:rotate-180"
          >
            <RxCross2 />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="h-[calc(100%-8rem)]  overflow-y-auto   p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <EmptyCart />
            </div>
          ) : (
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
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="w-8 h-8 cursor-pointer bg-white rounded-full flex items-center justify-center font-bold text-pink-500 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="font-semibold text-lg">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer font-bold text-pink-500 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-semibold">
                    ${item.product.price * item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(removeFromCart({ id: item.product.id }))
                    }
                    className="text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div
            style={{ background: themeColor }}
            className="h-[62px]  space-y-2 w-full bg-white fixed bottom-0 p-2"
          >
            <Link to={"/cart"}>
              <button className="cursor-pointer h-[62px]   w-full font-semibold text-white rounded">
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
