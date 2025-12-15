import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from "@/api/productApi";

interface Product {
  id: string;
  name: string;
  category: string;
}

const Category = () => {
  const { themeColor } = useTheme();

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  const categoryData = [
    {
      id: 1,
      img: "/images/Air.jpg",
      title: "AIR CONDITIONER",
      link: "/conditioner_air",
    },
    {
      id: 2,
      img: "/images/TV.jpg",
      title: "AUDIO & VIDEO",
      link: "/video_and_audio",
    },
    { id: 3, img: "/images/Mobile.jpg", title: "GADGETS", link: "/gadgets" },
    {
      id: 4,
      img: "/images/Home.jpg",
      title: "HOME APPLIANCES",
      link: "/appliancess_home",
    },
    {
      id: 5,
      img: "/images/Kitchen.jpg",
      title: "KITCHEN APPLIANCES",
      link: "/appliances_kitchen",
    },
    {
      id: 6,
      img: "/images/Laptop.jpg",
      title: "PCS & LAPTOP",
      link: "/laptop_and_pc",
    },
    {
      id: 7,
      img: "/images/Fridge.jpg",
      title: "REFRIGERATOR",
      link: "/refrigerator",
    },
    {
      id: 8,
      img: "/images/Speaker.jpg",
      title: "SMART HOME",
      link: "/home-smart",
    },
  ];

  const categories = categoryData.map((cat) => ({
    ...cat,
    dataLength: products.filter((p) => p.category?.toUpperCase() === cat.title)
      .length,
  }));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div className="md:p-10 relative p-5 bg-[#e8eef3] min-h-screen">
      <h2 style={{ color: themeColor }} className="font-bold text-2xl mb-5">
        Shop by Category
      </h2>
      <div className="h-full border-gray-200 border flex items-center flex-wrap justify-center gap-6 bg-white p-5">
        {categories.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="flex flex-col items-center text-center w-64 mb-6 transition-transform duration-300 hover:scale-105"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-56 h-56 object-cover rounded-lg mb-3"
            />
            <span className="text-sm font-bold">{item.title}</span>
            <span className="text-gray-400 font-semibold">
              {item.dataLength} products
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
