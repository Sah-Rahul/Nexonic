import { ShoppingCart, Package, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const EmptyCart = () => {
  const { themeColor } = useTheme();
  return (
    <div className="text-center py-12">
      <div className="relative inline-block mb-8">
        <div className="relative">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 animate-ping opacity-50"></div>
            <div className="absolute inset-2 rounded-full border-4 border-gray-300 animate-pulse"></div>

            <ShoppingCart className="w-16 h-16 text-gray-400 animate-bounce relative z-10" />
          </div>
        </div>

        <div
          className="absolute -top-2 -right-2 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
        </div>

        <div
          className="absolute -bottom-2 -left-2 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <Package className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3
          style={{ color: themeColor }}
          className="text-2xl font-bold  animate-fade-in"
        >
          Your Cart is Empty
        </h3>
        <p
          className="text-gray-500 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          No items in your cart
        </p>
        <p
          className="text-sm text-gray-400 max-w-md mx-auto animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Looks like you haven't added anything to your cart yet. Start shopping
          now!
        </p>
      </div>

      <Link to={"/"}>
        <button
          className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-black rounded-full cursor-pointer font-semibold hover:from-blue-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          Start Shopping
        </button>
      </Link>

      <div className="flex justify-center gap-2 mt-8">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default EmptyCart;
