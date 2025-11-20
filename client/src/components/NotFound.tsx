import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-600 via-purple-500 to-blue-600 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-white opacity-20 blur-3xl rounded-full animate-pulse"></div>

            <div className="relative">
              <h1 className="text-9xl md:text-[12rem] font-black text-white drop-shadow-2xl">
                <span className="inline-block hover:animate-bounce">4</span>
                <span className="inline-block animate-spin-slow text-yellow-300">
                  0
                </span>
                <span className="inline-block hover:animate-bounce">4</span>
              </h1>

              <div className="h-2 w-40 bg-linear-to-r from-pink-500 via-red-500 to-yellow-500 mx-auto rounded-full animate-pulse mt-4"></div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <h3 className="text-4xl font-bold text-white animate-fade-in">
            Oops! Page Not Found
          </h3>
          <p className="text-lg text-white text-opacity-95 max-w-md mx-auto">
            The page you're looking for seems to have wandered off into the
            digital void.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to={"/"}>
            <button className="flex cursor-pointer items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 hover:scale-105 transition-all duration-300 shadow-lg">
              <Home className="w-5 h-5 animate-bounce" />
              Home Page
            </button>
          </Link>
        </div>

        <div className="flex justify-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
