import { useState } from "react";
import Layout from "./Layout";
import { Link, useLocation } from "react-router-dom";
import { formatBreadcrumb } from "../lib/breadcrumb";
import kitchenData from "../AlllJsonData/kitchen/kitchen.json";
import { MdPlayArrow } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { Badge } from "antd";
import { useTheme } from "../context/ThemeContext";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  SlidersHorizontal,
} from "lucide-react";

interface KitchenItem {
  id: number | string;
  name: string;
  img: string;
  price: number;
  discount: number;
  rating: string;
}

interface SortOption {
  value: string;
  label: string;
}

const KitchenAppliances = () => {
  const location = useLocation();
  const { themeColor } = useTheme();
  const [hoveredItemId, setHoveredItemId] = useState<number | string | null>(
    null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<string>("Default sorting");

  const currentPage = 1;

  const sortOptions: SortOption[] = [
    { value: "", label: "Default sorting" },
    { value: "popularity", label: "Sort by popularity" },
    { value: "rating", label: "Sort by average rating" },
    { value: "latest", label: "Sort by latest" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "price-low", label: "Price: Low to High" },
  ];

  const handleSortSelect = (option: SortOption): void => {
    setSelectedSort(option.label);
    setIsDropdownOpen(false);
  };

  const handleMouseEnter = (id: number | string): void => {
    setHoveredItemId(id);
  };

  const handleMouseLeave = (): void => {
    setHoveredItemId(null);
  };

  return (
    <Layout>
      <div className="min-h-screen mt-5 w-[94%] p-4">
        <h1 className="text-2xl mb-5 font-bold text-black">
          {formatBreadcrumb(location.pathname)}
        </h1>

        <h1 className="mb-5 text-black">
          Transform your cooking experience with our range of modern kitchen
          appliances. From mixers and grinders to microwaves and air fryers, we
          offer durable and efficient tools that make cooking easier and faster.
        </h1>

        <div className="mb-4 h-14 px-4 w-full flex items-center justify-between text-black">
          <span className="text-sm md:text-base">Showing all 5 results</span>

          <div className="h-auto md:h-14 px-4 py-3 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative ">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 group min-w-[200px]"
              >
                <SlidersHorizontal className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                <span
                  style={{ color: themeColor }}
                  className="text-sm cursor-pointer font-semibold   flex-1 text-left"
                >
                  {selectedSort}
                </span>
                <ChevronDown
                  className={`w-4 h-4  text-gray-500 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-gray-100 overflow-hidden z-20 animate-dropdown">
                    <div className="py-2">
                      {sortOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleSortSelect(option)}
                          className={`w-full cursor-pointer px-4 py-3 text-left text-sm transition-all duration-200 flex items-center justify-between group ${
                            selectedSort === option.label
                              ? "font-semibold"
                              : "hover:bg-gray-50"
                          }`}
                          style={{
                            backgroundColor:
                              selectedSort === option.label
                                ? `${themeColor}15`
                                : undefined,
                          }}
                        >
                          <span
                            className={`${
                              selectedSort === option.label
                                ? "text-gray-900"
                                : "text-gray-600"
                            }`}
                          >
                            {option.label}
                          </span>
                          {selectedSort === option.label && (
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: themeColor }}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          {(kitchenData as KitchenItem[]).map((item, index) => (
            <div
              key={item.id}
              data-aos="fade-up"
              className="relative md:w-[22vw] group mb-6"
            >
              {index === 0 && (
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
                      className="pt-2 text-xl"
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

              <div
                style={{ backgroundColor: themeColor }}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                className="h-8 w-8 flex items-center justify-center font-bold rounded-full text-white text-xs absolute top-3 right-[-30px] opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300 ease-in-out"
              >
                <button>
                  <BsCart4 className="text-xl cursor-pointer" />
                </button>
              </div>

              {hoveredItemId === item.id && (
                <div className="flex items-center absolute top-10 right-[45px]">
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
                className="h-8 w-8 flex items-center justify-center font-bold rounded-full text-white text-xs absolute top-14 right-[-30px] opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300 ease-in-out"
              >
                <Heart className="w-4 h-4 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center flex-row-reverse gap-2 py-8 mt-8">
          <button
            className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background:
                currentPage === 1
                  ? "#e5e7eb"
                  : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
              border: "2px solid rgba(209, 213, 219, 0.5)",
            }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <button>
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes dropdown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-dropdown { animation: dropdown 0.2s ease-out; }
      `}</style>
    </Layout>
  );
};

export default KitchenAppliances;
