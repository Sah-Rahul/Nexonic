import { useState, useEffect } from "react";
import {
  Check,
  Package,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Truck,
} from "lucide-react";

const PaymentSuccess = () => {
  const [showCheck, setShowCheck] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    setTimeout(() => setShowCheck(true), 300);
    setTimeout(() => setShowConfetti(true), 600);
    setTimeout(() => setShowContent(true), 900);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    color: ["#6366f1", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b", "#3b82f6"][
      Math.floor(Math.random() * 6)
    ],
  }));

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4 overflow-hidden relative">
      {showConfetti &&
        confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className="absolute w-3 h-3 rounded-full opacity-80"
            style={{
              left: `${piece.left}%`,
              top: "-20px",
              backgroundColor: piece.color,
              animation: `fall ${piece.duration}s ease-in-out ${piece.delay}s forwards`,
            }}
          />
        ))}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-yellow-400 opacity-60"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
            size={16 + i * 2}
          />
        ))}
      </div>

      <div className="max-w-lg w-full relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 text-center transform transition-all duration-700">
          <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 mb-8">
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-emerald-400 to-green-500 animate-ping opacity-20" />

            <div
              className="absolute inset-2 rounded-full bg-linear-to-r from-emerald-400 to-green-500 opacity-30"
              style={{ animation: "pulse 2s ease-in-out infinite" }}
            />

            <div
              className={`absolute inset-4 rounded-full bg-linear-to-br from-emerald-500 via-green-500 to-teal-500 shadow-lg flex items-center justify-center transform transition-all duration-500 ${
                showCheck ? "scale-100 rotate-0" : "scale-0 rotate-180"
              }`}
            >
              <Check
                className="w-16 h-16 sm:w-20 sm:h-20 text-white"
                strokeWidth={3}
              />
            </div>
          </div>

          <div
            className={`transition-all duration-700 ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-linear-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Payment Successful!
            </h1>

            <p className="text-gray-600 text-lg sm:text-xl mb-2">
              🎉 Your order has been placed successfully!
            </p>

            <p className="text-gray-500 text-sm sm:text-base mb-8">
              Thank you for shopping with us. You'll receive a confirmation
              email shortly.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-linear-to-br from-emerald-50 to-green-100 rounded-2xl p-4 transform hover:scale-105 transition-transform">
                <Package className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-bold text-gray-800 text-sm">
                  #ORD-2024-7842
                </p>
              </div>

              <div className="bg-linear-to-br from-teal-50 to-cyan-100 rounded-2xl p-4 transform hover:scale-105 transition-transform">
                <Truck className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <p className="text-xs text-gray-500">Estimated Delivery</p>
                <p className="font-bold text-gray-800 text-sm">3-5 Days</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Order Placed</span>
                <span>Processing</span>
                <span>Shipped</span>
                <span>Delivered</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-1000"
                  style={{ width: showContent ? "25%" : "0%" }}
                />
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Redirecting to My Orders in{" "}
                <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-700 font-bold rounded-full">
                  {countdown}
                </span>{" "}
                seconds
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-linear-to-r from-emerald-600 to-green-600 text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2 group">
                <Package className="w-5 h-5" />
                View My Orders
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="flex-1 bg-white border-2 border-emerald-200 text-emerald-700 py-4 px-6 rounded-2xl font-semibold hover:bg-emerald-50 hover:border-emerald-300 transform hover:scale-105 transition-all flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Continue Shopping
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-emerald-400"
              style={{
                animation: "bounce 1s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
