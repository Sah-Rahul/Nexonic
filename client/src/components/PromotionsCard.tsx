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
    AOS.refresh();
  }, []);

  return (
    <>
      <div className=" bg-[#e8eef3] h-[400px] px-10 flex gap-5 items-center justify-between  ">
        <div
          data-aos="fade-up"
          className="w-full h-[350px] relative md:w-[400px] flex justify-between items-center bg-[#F1F3F7] p-6   shadow-lg"
        >
          <div>
            <h1
              style={{ color: themeColor }}
              className="absolute top-8 text-5xl font-bold"
            >
              Wireless Headphones
            </h1>
            <p className="mt-10 text-gray-500 text-lg">Starting at $49</p>
            <button className="py-2 text-blue-500 font-semibold">
              Shop Now
            </button>
          </div>
          <img
            src="/BestDeal/banner1.png"
            alt="banner"
            className="object-cover rounded-lg"
          />
        </div>

        <div
          data-aos="fade-up"
          className="w-full h-[350px]   relative md:w-[400px] flex justify-between items-center bg-[#DDE3E4] p-6   shadow-lg"
        >
          <div>
            <h1 style={{ color: themeColor }} className="text-[30px] font-bold">
              Grooming
            </h1>
            <p className="mt-2 text-gray-500 text-lg">Starting at $49</p>
            <button className="py-2 text-blue-500 font-semibold">
              Shop Now
            </button>
          </div>
          <img
            src="/BestDeal/trimer.png"
            alt="banner"
            className=" object-cover rounded-lg"
          />
        </div>

        <div
          data-aos="fade-up"
          className="w-full h-[350px] relative md:w-[400px] flex justify-between items-center bg-[#F9EDD0] p-6   shadow-lg"
        >
          <div>
            <h1 style={{ color: themeColor }} className="text-3xl  font-bold">
              Video Games
            </h1>
            <p className="mt-2 text-gray-500 text-lg">Starting at $49</p>
            <button className="mt-4 text-blue-500 font-semibold">
              Shop Now
            </button>
          </div>
          <img
            src="/BestDeal/game.png"
            alt="banner"
            className="  object-cover rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default PromotionsCard;
