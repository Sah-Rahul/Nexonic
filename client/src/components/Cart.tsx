import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Layout from "./Layout";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { RootState } from "@/redux/store";
import { useTheme } from "@/context/ThemeContext";
import EmptyCart from "./EmptyCart";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const [showCouponInput, setShowCouponInput] = useState(false);
  const dispatch = useDispatch();
  const { themeColor } = useTheme();

  const { products } = useSelector((state: RootState) => state.cart);

  console.log(products);

  const handleCouponClick = () => {
    setShowCouponInput(!showCouponInput);
  };

  const handleIncrease = (product: string) => {
    dispatch(increaseQuantity(product));
  };
  const handleDecrease = (product: string) => {
    dispatch(decreaseQuantity(product));
  };

  const handleRemoveCart = (product: string) => {
    dispatch(removeFromCart(product));
    toast.success("Product Remove from cart");
  };

  const subtotal = products.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0
  );

  const total = subtotal;

  if (products.length === 0) {
    return <EmptyCart />;
  }
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const handleCheckout = async () => {
    try {
      await stripePromise;

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/payment/create-checkout-session`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartItems: products }),
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error("Stripe checkout failed");
    }
  };

  return (
    <Layout>
      <div className="px-5 py-8 min-h-screen bg-white">
        <h1 className="text-3xl  mb-6">{`${products.length} Item in your cart`}</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4 overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Subtotal</th>
                  <th className="p-4">Remove</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                      <img
                        src={item.productImage}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <Link to={`/products-details/${item._id}`}>
                          <span className="text-sm hover:text-blue-600 ">
                            {item.title}
                          </span>
                        </Link>
                      </div>
                    </td>
                    <td className="p-4">Rs{item.price.toFixed(2)}</td>
                    <td className="p-4">
                      <div className="flex items-center border border-gray-300 rounded-md w-fit">
                        <button
                          onClick={() => handleDecrease(item._id)}
                          className="px-3 py-1 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item._id)}
                          className="px-3 py-1 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      Rs{(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <button
                        style={{ color: themeColor }}
                        onClick={() => handleRemoveCart(item._id)}
                        className=" cursor-pointer"
                      >
                        <FaRegTrashCan />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 w-full lg:w-80 bg-white border border-gray-200 mt-8 lg:mt-0">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
              Cart Totals
            </h2>
            <div className="flex justify-between mb-4 border-b-2">
              <span className="font-semibold text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-800">
                Rs{subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-6 border-b-2">
              <span className="font-semibold text-gray-600">Total</span>
              <span className="font-bold text-lg text-gray-900">
                Rs{total.toFixed(2)}
              </span>
            </div>
            <div className="mb-4">
              <h3
                onClick={handleCouponClick}
                className="cursor-pointer hover:text-blue-500 text-gray-700 text-sm font-medium"
              >
                Have a Coupon?
              </h3>
            </div>
            {showCouponInput && (
              <div className="flex gap-2 items-center transition-all duration-500 ease-in-out opacity-100 translate-y-0">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="py-2 px-3 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  style={{ background: themeColor }}
                  className=" cursor-pointer  text-white font-semibold py-2 px-4 hover:bg-blue-600"
                >
                  Apply
                </button>
              </div>
            )}
            <div className="mt-6">
              <button
                onClick={handleCheckout}
                style={{ background: themeColor }}
                className="w-full cursor-pointer font-semibold text-white   py-3 hover:bg-blue-600"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
