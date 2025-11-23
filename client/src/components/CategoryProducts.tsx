import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { MdPlayArrow } from "react-icons/md";
import { Heart } from "lucide-react";
import { Badge } from "antd";
import { useTheme } from "../context/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import { getProductsApi } from "@/api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import type { Product } from "@/redux/slices/productSlice";
import { addToWishlist } from "@/redux/slices/Wishlist";
import type { RootState } from "@/redux/store";

interface Props {
  category: string;
}

const CategoryProducts = ({ category }: Props) => {
  const { themeColor } = useTheme();
  const dispatch = useDispatch();
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  if (isLoading) {
    return <div className="p-10">Loading...</div>;
  }

  const filteredProducts = data.filter(
    (item: any) =>
      item.category?.trim().toLowerCase() === category.trim().toLowerCase()
  );

  const saleBadgeMap: Record<string, number[]> = {
    "AIR CONDITIONER": [1],
    "AUDIO & VIDEO": [1, 3],
    GADGETS: [3],
    "HOME APPLIANCES": [0, 1, 2],
    "KITCHEN APPLIANCES": [0, 1, 3],
    "PCS & LAPTOP": [2, 3],
    REFRIGERATOR: [1, 2, 3],
    "SMART HOME": [],
    "BEST DEALS": [0, 1, 2, 3, 4, 5, 6, 7, 8],
    "NEW ARRIVALS": [],
  };
  const saleIndexes = saleBadgeMap[category] || [];

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
    if (!user) {
      toast.error("Please login first");
      return;
    }
    dispatch(addToCart(product));
    toast.success("Product added to cart");
  };

  const handleAddToWishList = (product: Product) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }
    dispatch(addToWishlist(product));
    toast.success("Product added in wishlist");
  };

  return (
    <div className="p-10 bg-[#e8eef3] min-h-screen">
      <h1 style={{ color: themeColor }} className="text-2xl font-bold">
        {category}
      </h1>

      <div className="relative p-5 bg-white flex flex-wrap justify-between mt-5">
        {filteredProducts.map((item: any, index: number) => (
          <div
            key={item._id}
            data-aos="fade-up"
            className="relative md:w-[22vw] group mb-6"
          >
            {saleIndexes.includes(index) && (
              <Badge.Ribbon text="Sale" color={themeColor} />
            )}

            <div className="flex flex-col items-center">
              <Link to={`/products-details/${item._id}`}>
                <img
                  src={item.productImage}
                  alt={item.title}
                  className="transition-all duration-300 h-[250px] object-contain"
                />
              </Link>

              <Link to={`/products-details/${item._id}`}>
                <div className="px-6 flex flex-col">
                  <span className="pt-2 font-bold">
                    {item.title.slice(0, 70)}...
                  </span>
                  <div className="pt-2">{renderStars(item.Rating)}</div>

                  <div className="pt-5 flex gap-3">
                    <label className="font-semibold">
                      Rs {item.totalPrice}
                    </label>
                    <del className="text-gray-600">Rs {item.price}</del>
                    <label className="text-red-600">
                      ({item.discount}% OFF)
                    </label>
                  </div>
                </div>
              </Link>
            </div>

            <div
              style={{ backgroundColor: themeColor }}
              onMouseEnter={() => setHoveredItemId(item._id)}
              onMouseLeave={() => setHoveredItemId(null)}
              className="h-8 w-8 flex items-center justify-center mt-2 rounded-full text-white absolute top-6 right-[-30px]
              opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300"
            >
              <button onClick={() => handleAddToCart(item)}>
                <BsCart4 className="text-xl cursor-pointer" />
              </button>
            </div>

            {hoveredItemId === item._id && (
              <div className="flex items-center absolute top-9 right-[45px]">
                <span
                  style={{ backgroundColor: themeColor }}
                  className="text-xs px-2 py-1 text-white"
                >
                  Add to Cart
                </span>
                <MdPlayArrow
                  className="text-xl"
                  style={{ color: themeColor }}
                />
              </div>
            )}

            <div
              style={{ backgroundColor: themeColor }}
              className="h-8 w-8 flex items-center justify-center rounded-full text-white absolute top-18 right-[-30px]
              opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300"
            >
              <button onClick={() => handleAddToWishList(item)}>
                <Heart className="w-4 h-4 cursor-pointer" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
