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
import { useDispatch } from "react-redux";
import { addToWishlist } from "@/redux/slices/Wishlist";
import type { Product } from "@/redux/slices/productSlice";
import Loading from "@/components/Loading";

const Refrigerator = () => {
  const { themeColor } = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Default sorting");
  const [priceRange, setPriceRange] = useState(100000);
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  const sortOptions = [
    { value: "default", label: "Default sorting" },
    { value: "popularity", label: "Sort by popularity" },
    { value: "latest", label: "Sort by latest" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "price-low", label: "Price: Low to High" },
  ];

  const handleSortSelect = (option: { value: string; label: string }) => {
    setSelectedSort(option.label);
    setIsDropdownOpen(false);
  };

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error loading products: {error.message}
      </div>
    );

  // Filter by category
  let filteredProducts = products.filter(
    (p) => p.category?.toUpperCase() === "REFRIGERATOR"
  );

  // Filter by price
  filteredProducts = filteredProducts.filter((p) => p.price <= priceRange);

  // Filter by rating
  if (selectedRating > 0) {
    filteredProducts = filteredProducts.filter(
      (p) => Math.round(p.Rating) >= selectedRating
    );
  }

  // Sort products
  let sortedProducts = [...filteredProducts];

  if (selectedSort === "Sort by latest") {
    sortedProducts.sort((a, b) => b._id.localeCompare(a._id));
  } else if (selectedSort === "Sort by popularity") {
    sortedProducts.sort((a, b) => b.Rating - a.Rating);
  } else if (selectedSort === "Price: High to Low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (selectedSort === "Price: Low to High") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            style={{ color: i < Math.round(rating) ? themeColor : "#ccc" }}
            className="text-base sm:text-lg"
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
    <Layout
      onPriceChange={setPriceRange}
      onRatingChange={setSelectedRating}
      currentPrice={priceRange}
      currentRating={selectedRating}
    >
      <div className="min-h-screen mt-3 sm:mt-5 w-full px-3 sm:px-4 lg:px-6 xl:px-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-5 font-bold text-black">
          {formatBreadcrumb(location.pathname)}
        </h1>

        <p className="mb-4 sm:mb-5 text-sm sm:text-base text-black leading-relaxed">
          Keep your food fresh and organized with our premium refrigerators. From energy-efficient models to spacious double-door designs, find the perfect cooling solution for your home.
        </p>

        <div className="mb-4 sm:mb-6 px-2 sm:px-4 flex items-center justify-between">
          <span className="text-xs sm:text-sm md:text-base text-gray-600 font-semibold">
            Showing {sortedProducts.length} results
          </span>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
              Sort By
            </h3>
            <div className="relative w-full">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 group w-full"
              >
                <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                <span
                  style={{ color: themeColor }}
                  className="text-xs sm:text-sm flex-1 text-left"
                >
                  {selectedSort}
                </span>
                <ChevronDown
                  className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transition-transform duration-300 ${
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
                  <div className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-2xl border-2 border-gray-100 overflow-hidden z-20 animate-dropdown">
                    <div className="py-2">
                      {sortOptions.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSortSelect(option)}
                          className={`w-full cursor-pointer px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between group ${
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {sortedProducts.map((item, idx) => (
            <div key={item._id} className="relative group mb-4 sm:mb-6">
              {idx === 0 && (
                <Badge.Ribbon
                  text="Sale"
                  color={themeColor}
                  className="absolute top-0 right-2 sm:right-5 z-10"
                />
              )}

              <div className="flex flex-col items-center bg-white rounded-lg hover:shadow-xl transition-shadow duration-300 p-3 sm:p-4">
                <Link to={`/products-details/${item._id}`} className="w-full">
                  <img
                    src={item.productImage}
                    alt={item.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                <Link to={`/products-details/${item._id}`} className="w-full">
                  <div className="px-2 sm:px-4 flex flex-col w-full">
                    <span className="pt-2 text-sm sm:text-base md:text-lg line-clamp-2">
                      {item.title}
                    </span>

                    <div className="pt-2">{renderStars(item.Rating)}</div>

                    <div className="pt-3 sm:pt-5 flex flex-wrap gap-2 items-center">
                      <label className="font-semibold text-base sm:text-lg">
                        Rs
                        {(
                          item.price -
                          (item.price * item.discount) / 100
                        ).toFixed()}
                      </label>
                      <del className="text-gray-600 text-xs sm:text-sm">
                        Rs{item.price}
                      </del>
                      <label className="text-red-600 text-xs sm:text-sm">
                        ({item.discount}% OFF)
                      </label>
                    </div>
                  </div>
                </Link>
              </div>

              <div
                onClick={() => handleAddToCart(item)}
                style={{ backgroundColor: themeColor }}
                className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center font-bold rounded-full text-white text-xs absolute top-3 right-[-30px] opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300 ease-in-out cursor-pointer z-20"
              >
                <BsCart4 className="text-base sm:text-xl" />
              </div>

              <div
                onClick={() => handleAddToWishList(item)}
                style={{ backgroundColor: themeColor }}
                className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center font-bold rounded-full text-white text-xs absolute top-14 sm:top-16 right-[-30px] opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300 ease-in-out cursor-pointer z-20"
              >
                <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No products found matching your filters.</p>
            <button
              onClick={() => {
                setPriceRange(100000);
                setSelectedRating(0);
                setSelectedSort("Default sorting");
              }}
              className="mt-4 px-6 py-2 rounded-lg border-2"
              style={{ color: themeColor, borderColor: themeColor }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes dropdown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-dropdown { animation: dropdown 0.2s ease-out; }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </Layout>
  );
};

export default Refrigerator;