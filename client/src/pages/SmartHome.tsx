import { useTheme } from "../context/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from "@/api/productApi";
import Layout from "./Layout";
import { Link, useLocation } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { Badge } from "antd";
import { Heart, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";
import { formatBreadcrumb } from "../lib/breadcrumb";
import { addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import { addToWishlist } from "@/redux/slices/Wishlist";
import { useDispatch } from "react-redux";
import type { Product } from "@/redux/slices/productSlice";

const SmartHome = () => {
  const { themeColor } = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Default sorting");

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  const filteredProducts = products.filter(
    (p) => p.category?.toUpperCase() === "SMART HOME"
  );

  const sortOptions = [
    { value: "", label: "Default sorting" },
    { value: "popularity", label: "Sort by popularity" },
    { value: "rating", label: "Sort by average rating" },
    { value: "latest", label: "Sort by latest" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "price-low", label: "Price: Low to High" },
  ];

  const handleSortSelect = (option: { value: string; label: string }) => {
    setSelectedSort(option.label);
    setIsDropdownOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  const renderStars = (rating: number) => {
    return (
      <div className="flex ">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            style={{ color: i < Math.round(rating) ? themeColor : "#ccc" }}
            className="text-lg"
          >
            {i < Math.round(rating) ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success("Product added to cart");
  };

  const handleAddToWishList = (product: Product) => {
    dispatch(addToWishlist(product));
    toast.success("Product added in wishlist");
  };

  return (
    <Layout>
      <div className="min-h-screen mt-5 w-[94%] p-4">
        <h1 className="text-2xl mb-5 font-bold text-black">
          {formatBreadcrumb(location.pathname)}
        </h1>

        <p className="mb-5 text-black">
          Beat the heat with our high-performance air conditioners. Whether it's
          split ACs, window units, or energy-saving inverters, stay cool and
          comfortable all year round with our trusted cooling solutions.
        </p>

        <div className="mb-4 h-14 px-4 w-full flex items-center justify-between text-black">
          <span className="text-sm md:text-base">
            Showing all {filteredProducts.length} results
          </span>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 group min-w-[200px]"
            >
              <SlidersHorizontal className="w-4 h-4 text-gray-500" />
              <span
                style={{ color: themeColor }}
                className="text-sm flex-1 text-left"
              >
                {selectedSort}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
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
                    {sortOptions.map((option, idx) => (
                      <button
                        key={idx}
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
                          className={
                            selectedSort === option.label
                              ? "text-gray-900"
                              : "text-gray-600"
                          }
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

        <div className="flex items-center gap-5 flex-wrap">
          {filteredProducts.map((item, idx) => (
            <div key={item._id} className="relative md:w-[22vw] group mb-6">
              {idx === 0 && (
                <Badge.Ribbon
                  text="Sale"
                  color={themeColor}
                  className="absolute top-0 right-5"
                />
              )}

              <div className="flex flex-col items-center">
                <Link to={`/products-details/${item._id}`}>
                  <img
                    src={item.productImage}
                    alt={item.title}
                    className="transition-all duration-300 ease-in-out"
                  />
                </Link>

                <Link to={`/products-details/${item._id}`}>
                  <div className="px-6 flex flex-col">
                    <span className="pt-2 md:text-xl text-xl  ">
                      {item.title.slice(0, 60)}
                    </span>

                    <span
                      style={{ color: themeColor }}
                      className="pt-2 text-xl"
                    >
                      {renderStars(item.Rating)}
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
                onClick={() => handleAddToCart(item)}
                style={{ backgroundColor: themeColor }}
                className="h-8 w-8 flex items-center justify-center font-bold rounded-full text-white text-xs absolute top-3 right-[-30px] opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300 ease-in-out"
              >
                <BsCart4 className="text-xl cursor-pointer" />
              </div>

              <div
                onClick={() => handleAddToWishList(item)}
                style={{ backgroundColor: themeColor }}
                className="h-8 w-8 flex items-center justify-center font-bold rounded-full text-white text-xs absolute top-14 right-[-30px] opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300 ease-in-out"
              >
                <Heart className="w-4 h-4 cursor-pointer" />
              </div>
            </div>
          ))}
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

export default SmartHome;
