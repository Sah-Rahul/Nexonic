import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { MdPlayArrow } from "react-icons/md";
import { Heart } from "lucide-react";
import { Badge } from "antd";
import { useTheme } from "../context/ThemeContext";
import homedata from "../AlllJsonData/HomeAppliances/HomeAppliances.json";
import AOS from "aos";
import "aos/dist/aos.css";

const HomeAppliances = () => {
  const { themeColor } = useTheme();

  const [hoveredItemId, setHoveredItemId] = useState(null);

  const handleMouseEnter = (id: any) => setHoveredItemId(id);
  const handleMouseLeave = () => setHoveredItemId(null);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
    AOS.refresh();
  }, []);

  return (
    <div className="p-10 bg-[#e8eef3] min-h-screen">
      <h1 style={{ color: themeColor }} className="text-2xl font-bold">
       HomeAppliances
      </h1>

      <div className="relative p-5 bg-white flex flex-wrap justify-between mt-5">
        {homedata.map((item) => (
          <div
            key={item.id}
            data-aos="fade-up"
            className="relative md:w-[22vw] group mb-6"
          >
            <Badge.Ribbon
              text="Sale"
              color={themeColor}
              style={{
                fontWeight: "bold",
                padding: "0 10px",
                boxShadow: "0 0 2px rgba(0,0,0,0.2)",
              }}
              className="absolute top-0 right-5"
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
                  <span className="pt-2 text-x" style={{ color: themeColor }}>
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

            <div
              style={{ backgroundColor: themeColor }}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              className="h-8 w-8 mt-22 flex items-center justify-center font-bold rounded-full text-white text-xs absolute top-3 right-[-30px] opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300 ease-in-out"
            >
              <button>
                <BsCart4 className="text-xl cursor-pointer" />
              </button>
            </div>

            {hoveredItemId === item.id && (
              <div className="flex items-center absolute top-26 right-[45px]">
                <span
                  style={{ backgroundColor: themeColor }}
                  className="text-xs px-2 py-1 text-white shadow-md"
                >
                  Add to Cart
                </span>
                <MdPlayArrow
                  style={{ color: themeColor }}
                  className="text-xl"
                />
              </div>
            )}

            <div
              style={{ backgroundColor: themeColor }}
              className="h-8 w-8 flex items-center justify-center font-bold rounded-full text-white text-xs absolute top-14 right-[-30px] opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300 ease-in-out cursor-pointer"
            >
              <Heart className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeAppliances;
