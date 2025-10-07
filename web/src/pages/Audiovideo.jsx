import React from "react";
import Layout from "./Layout";
import { Link, useLocation } from "react-router-dom";
import { formatBreadcrumb } from "../lib/breadcrumb";
import airconditioner from "../AlllJsonData/AirConditioner/AirConditioner.json";
import { MdPlayArrow } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { Badge } from "antd";
import { useTheme } from "../context/ThemeContext";
import { Heart } from "lucide-react";

const Audiovideo = () => {
  const location = useLocation();
  const { themeColor } = useTheme();
  return (
    <Layout>
      <div className="min-h-screen bg-orange-500 mt-5 w-[94%] p-4">
        <h1 className="text-2xl font-bold text-white">
          {formatBreadcrumb(location.pathname)}
        </h1>
        <div className="flex items-center flex-wrap  ">
          {airconditioner.map((item, index) => (
            <div
              key={item.id}
              data-aos="fade-up"
              className="relative md:w-[22vw] group mb-6"
            >
              {/* Ribbon */}
              {index === 0 ? (
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
              ) : (
                ""
              )}

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
                    <span
                      style={{ color: themeColor }}
                      className="pt-2 text-xl  "
                    >
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
                style={{ backgroundColor: themeColor }}
                // onMouseEnter={() => handleMouseEnter(item.id)}
                // onMouseLeave={handleMouseLeave}
                className="h-8 w-8 mt-22  flex items-center justify-center font-bold rounded-full   text-white text-xs absolute top-3 right-[-30px] opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300 ease-in-out"
              >
                {/* onClick={() => handleAddToCart(item)} */}
                <button>
                  <BsCart4 className="text-xl cursor-pointer" />
                </button>
              </div>

              {/* {hoveredItemId === item.id && ( */}
              <div className="flex items-center absolute top-26 right-[45px]">
                <span
                  style={{ backgroundColor: themeColor }}
                  className="text-xs px-2 py-1   text-white shadow-md"
                >
                  Add to Cart
                </span>
                <MdPlayArrow
                  style={{ color: themeColor }}
                  className="text-xl  "
                />
              </div>
              {/* )} */}

              {/* Wishlist Icon */}
              <div
                // onClick={() => handleAddToWishlist(item)}
                style={{ backgroundColor: themeColor }}
                className="h-8 w-8 flex items-center justify-center font-bold rounded-full   text-white text-xs absolute top-14 right-[-30px] opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300 ease-in-out"
              >
                <Heart className="w-4 h-4 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Audiovideo;
