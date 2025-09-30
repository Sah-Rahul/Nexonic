import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { MdPlayArrow } from "react-icons/md";
import { Heart } from "lucide-react";
import todayData from "../AlllJsonData/Todaybest/Todaybest.json";
import AOS from "aos";
import "aos/dist/aos.css";
import { Badge } from "antd";

const BestDeal = () => {
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredItemId(id);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
    AOS.refresh();
  }, []);

  return (
    <div className="p-10 bg-[#e8eef3]   min-h-screen">
      <h1 className="text-2xl font-bold">Today’s best deal</h1>

      <div className="relative p-5 bg-[#fff] flex gap-[8px] flex-wrap justify-between mt-5">
        {todayData.map((item) => (
          <div
            key={item.id}
            data-aos="fade-up"
            className="relative md:w-[22vw] group mb-6"
          >
            {/* Ribbon */}
            <Badge.Ribbon
              text="Sale"
              color="#1677ff"
              style={{
                fontWeight: "bold",
                padding: "0 10px",
                boxShadow: "0 0 2px rgba(0,0,0,0.2)",
              }}
              className="absolute top-0  right-5"
            />

            <div className="flex flex-col items-center">
              <Link to={`/productsdetails/${item.id}`}>
                <img
                  src={item.img}
                  alt={item.name}
                  className="transition-all duration-300 ease-in-out"
                />
              </Link>

              <Link to={`/productsdetails/${item.id}`}>
                <div className="px-6 flex flex-col">
                  <span className="pt-2 text-xl text-yellow-400">
                    {item.rating}
                  </span>
                  <span className="pt-2 md:text-xl text-sm font-bold">
                    {item.name.slice(0, 70)}...
                  </span>
                  <div className="pt-5 flex gap-3">
                    <label className="font-semibold">
                      Rs
                      {(
                        item.price -
                        (item.price * item.discount) / 100
                      ).toFixed()}
                    </label>
                    <del className="text-gray-600">Rs{item.price}</del>
                    <label className="text-red-600">
                      ({item.discount}% OFF)
                    </label>
                  </div>
                </div>
              </Link>
            </div>

            {/* Cart Icon */}
            <div
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              className="h-8 w-8 mt-22  flex items-center justify-center font-bold rounded-full bg-blue-500 text-white text-xs absolute top-3 right-[-30px] opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300 ease-in-out"
            >
                <button onClick={() =>alert()}>

              <BsCart4 className="text-xl cursor-pointer" />
                </button>
            </div>

            {hoveredItemId === item.id && (
              <div className="flex items-center absolute top-26 right-[45px]">
                <span className="text-xs px-2 py-1 bg-blue-500 text-white shadow-md">
                  Add to Cart
                </span>
                <MdPlayArrow className="text-xl text-blue-500" />
              </div>
            )}

            {/* Wishlist Icon */}
            <div className="h-8 w-8 flex items-center justify-center font-bold rounded-full bg-blue-500 text-white text-xs absolute top-14 right-[-30px] opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300 ease-in-out">
              <Heart className="w-4 h-4 cursor-pointer" />
            </div>
          </div>
        ))}
        
      </div>

      {/* Bottom 3 Promo Cards */}
      <div
        data-aos="fade-up"
        className="hidden md:flex flex-wrap mt-10 gap-8 items-center justify-between"
      >
        {/* Card 1 */}
        <div className="w-full md:w-[400px] flex justify-between items-center bg-[#F1F3F7] p-6 rounded-lg shadow-lg">
          <div>
            <h1 className="text-3xl text-black font-bold">
              Wireless Headphones
            </h1>
            <p className="mt-2 text-gray-500 text-lg">Starting at $49</p>
            <button className="py-2 text-blue-500 font-semibold">
              Shop Now
            </button>
          </div>
          <img
            src="/BestDeal/banner1.png"
            alt="banner"
            className="mt-10 md:w-[100px] w-[25vw] h-auto object-cover rounded-lg"
          />
        </div>

        {/* Card 2 */}
        <div className="w-full md:w-[400px] flex justify-between items-center bg-[#E9EAED] p-6 rounded-lg shadow-lg">
          <div>
            <h1 className="text-3xl text-black font-bold">Grooming</h1>
            <p className="mt-2 text-gray-500 text-lg">Starting at $49</p>
            <button className="mt-4 text-blue-500 font-semibold">
              Shop Now
            </button>
          </div>
          <img
            src="/BestDeal/trimer.png"
            alt="banner"
            className="mt-10 hidden md:block w-[200px] h-auto object-cover rounded-lg"
          />
        </div>

        {/* Card 3 */}
        <div className="w-full md:w-[400px] flex justify-between items-center bg-[#F8EDD1] p-6 rounded-lg shadow-lg">
          <div>
            <h1 className="text-3xl text-black font-bold">Video Games</h1>
            <p className="mt-2 text-gray-500 text-lg">Starting at $49</p>
            <button className="mt-4 text-blue-500 font-semibold">
              Shop Now
            </button>
          </div>
          <img
            src="/BestDeal/game.png"
            alt="banner"
            className="mt-16 hidden md:block w-[100px] h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default BestDeal;
