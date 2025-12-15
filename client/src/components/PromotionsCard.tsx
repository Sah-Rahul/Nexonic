import { useTheme } from "../context/ThemeContext";
import AOS from "aos";
import { useEffect } from "react";

const PromotionsCard = () => {
  const { themeColor } = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="bg-[#e8eef3] px-6 md:px-10 py-10">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div
          data-aos="fade-up"
          className="w-full md:w-[400px] h-80 md:h-[350px] relative flex justify-between items-center bg-[#F1F3F7] p-6 shadow-lg"
        >
          <div>
            <h1
              style={{ color: themeColor }}
              className="text-3xl md:text-4xl font-bold"
            >
              Wireless Headphones
            </h1>
            <p className="mt-3 text-gray-500 text-lg">Starting at $49</p>
            <button className="mt-3 text-blue-500 font-semibold">
              Shop Now
            </button>
          </div>

          <img
            src="/BestDeal/banner1.png"
            alt="banner"
            className="w-32 md:w-40 object-contain"
          />
        </div>

        <div
          data-aos="fade-up"
          className="w-full md:w-[400px] h-80 md:h-[350px] relative flex justify-between items-center bg-[#DDE3E4] p-6 shadow-lg"
        >
          <div>
            <h1 style={{ color: themeColor }} className="text-3xl font-bold">
              Grooming
            </h1>
            <p className="mt-3 text-gray-500 text-lg">Starting at $49</p>
            <button className="mt-3 text-blue-500 font-semibold">
              Shop Now
            </button>
          </div>

          <img
            src="/BestDeal/trimer.png"
            alt="banner"
            className="w-32 md:w-40 object-contain"
          />
        </div>

        <div
          data-aos="fade-up"
          className="w-full md:w-[400px] h-80 md:h-[350px] relative flex justify-between items-center bg-[#F9EDD0] p-6 shadow-lg"
        >
          <div>
            <h1 style={{ color: themeColor }} className="text-3xl font-bold">
              Video Games
            </h1>
            <p className="mt-3 text-gray-500 text-lg">Starting at $49</p>
            <button className="mt-3 text-blue-500 font-semibold">
              Shop Now
            </button>
          </div>

          <img
            src="/BestDeal/game.png"
            alt="banner"
            className="w-32 md:w-40 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PromotionsCard;
