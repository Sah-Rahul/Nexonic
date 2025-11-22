import { useState, useEffect } from "react";
import {
  X,
  RefreshCw,
  ArrowLeft,
  ShoppingCart,
  AlertTriangle,
  HelpCircle,
  CreditCard,
  Shield,
} from "lucide-react";

const PaymentCancel = () => {
  const [showX, setShowX] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowX(true), 300);
    setTimeout(() => setShake(true), 600);
    setTimeout(() => setShake(false), 1100);
    setTimeout(() => setShowContent(true), 800);
  }, []);

  const troubleshootTips = [
    { icon: CreditCard, text: "Check your card details are correct" },
    { icon: Shield, text: "Ensure sufficient balance in account" },
    { icon: RefreshCw, text: "Try a different payment method" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-rose-50 to-orange-50 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-red-200 opacity-20"
            style={{
              width: `${60 + i * 40}px`,
              height: `${60 + i * 40}px`,
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
              animation: `floatBubble ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <X
            key={i}
            className="absolute text-red-200 opacity-40"
            style={{
              left: `${5 + i * 22}%`,
              top: `${10 + (i % 2) * 70}%`,
              animation: `floatX ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
            size={20 + i * 8}
          />
        ))}
      </div>

      <div className="max-w-lg w-full relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
          <div
            className={`relative mx-auto w-32 h-32 sm:w-40 sm:h-40 mb-8 ${
              shake ? "animate-shake" : ""
            }`}
          >
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-red-400 to-rose-500 animate-ping opacity-20" />

            <div
              className="absolute inset-2 rounded-full bg-linear-to-r from-red-400 to-rose-500 opacity-30"
              style={{ animation: "pulse 2s ease-in-out infinite" }}
            />

            <div
              className={`absolute inset-4 rounded-full bg-linear-to-br from-red-500 via-rose-500 to-red-600 shadow-lg flex items-center justify-center transform transition-all duration-500 ${
                showX ? "scale-100 rotate-0" : "scale-0 rotate-180"
              }`}
            >
              <X
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
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-linear-to-r from-red-600 via-rose-600 to-red-700 bg-clip-text text-transparent mb-4">
              Payment Cancelled
            </h1>

            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-4">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">
                Transaction not completed
              </span>
            </div>

            <p className="text-gray-600 text-lg sm:text-xl mb-2">
              Oops! Something went wrong 😔
            </p>

            <p className="text-gray-500 text-sm sm:text-base mb-8">
              Your payment could not be processed. Don't worry, no amount has
              been deducted from your account.
            </p>

            <div className="bg-linear-to-br from-gray-50 to-red-50 rounded-2xl p-5 mb-8 text-left">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-gray-800">Quick Troubleshoot</h3>
              </div>
              <div className="space-y-3">
                {troubleshootTips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-gray-600 text-sm"
                    style={{
                      animation: showContent
                        ? `fadeSlide 0.5s ease-out ${
                            0.2 + index * 0.15
                          }s forwards`
                        : "none",
                      opacity: 0,
                    }}
                  >
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <tip.icon className="w-4 h-4 text-red-500" />
                    </div>
                    <span>{tip.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between bg-white border border-red-100 rounded-xl p-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Your cart is saved</p>
                  <p className="font-semibold text-gray-800">
                    5 items • Rs. 12,499
                  </p>
                </div>
              </div>
              <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
                Pending
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-linear-to-r from-red-600 to-rose-600 text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2 group">
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </button>

              <button className="flex-1 bg-white border-2 border-red-200 text-red-700 py-4 px-6 rounded-2xl font-semibold hover:bg-red-50 hover:border-red-300 transform hover:scale-105 transition-all flex items-center justify-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Back to Cart
              </button>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Need help?{" "}
              <a
                href="#"
                className="text-red-600 hover:text-red-700 font-medium underline underline-offset-2"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm bg-white/60 backdrop-blur px-4 py-2 rounded-full">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Your payment info is secure & encrypted</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatBubble {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }
        @keyframes floatX {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-10px); }
          80% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
};

export default PaymentCancel;
