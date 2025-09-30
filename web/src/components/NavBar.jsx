import { ShoppingBasket, Search, ChevronUp, ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const dropdownRef = useRef(null);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const menu = [
    { label: "Home Appliances", link: "/appliancess_home" },
    { label: "Audio & video", link: "/video_and_audio" },
    { label: "Refrigerator", link: "/refrigerator" },
    { label: "New arrivals", link: "/new-arrivals" },
    { label: "Todays deal", link: "/todays-deal" },
    { label: "Gift cards", link: "/gift-cards" },
  ];

  const hoverlink = [
    { label: "Air conditioner", link: "/conditioner_air" },
    { label: "Kitchen appliances", link: "/appliances_kitchen" },
    { label: "PC & laptop ", link: "/laptop_and_pc" },
    { label: "Gadgets", link: "/gadgets" },
    { label: "Smart home", link: "/home_smart" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAllProducts(false);
      }
    }

    if (showAllProducts) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAllProducts]);

  return (
    <div className="w-full">
      {/* First navbar */}
      <div className="h-8 px-16 flex items-center justify-between text-white bg-[#0769DA]">
        <span>
          24/7 Customer service <b>1-800-234-5678</b>
        </span>
        <div className="flex items-center gap-10 font-medium text-[14px]">
          <p>Shipping & return</p>
          <p>Track order</p>
        </div>
      </div>

      {/* Second navbar */}
      <div className="h-28 px-16 flex items-center justify-between bg-[#0472F0]">
        <Link to={"/"}>
          <span className="text-3xl font-bold text-white">Nexonic</span>
        </Link>
        <div className="relative flex items-center gap-4 font-semibold">
          <input
            type="text"
            placeholder="Search product..."
            className="bg-white w-72 h-12 px-4 pr-10 text-black placeholder-gray-500 outline-none"
          />
          <Search
            className="text-blue-600 absolute right-3 top-1/2 -translate-y-1/2"
            size={24}
          />
        </div>
      </div>

      {/* Third navbar */}
      <div className="h-14 border-t border-gray-500 px-16 flex items-center justify-between text-white bg-[#0769DA] relative">
        {/* Allproducts dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowAllProducts(!showAllProducts)}
            className="cursor-pointer flex items-center gap-1 font-semibold"
          >
            Allproducts
            {showAllProducts ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>

          {showAllProducts && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 w-56 bg-[#0472F0] shadow-lg rounded-md z-50 mt-2"
            >
              {hoverlink.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="block px-4 py-3 hover:bg-blue-600 text-white font-medium rounded-md"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Menu items + cart + login */}
        <div className="flex items-center gap-12">
          {menu.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="font-bold hover:underline"
            >
              {item.label}
            </Link>
          ))}

          <div className="border-r border-gray-400 pr-4 relative">
            <button className="cursor-pointer">
              <ShoppingBasket className="text-white" size={30} />
            </button>
            <div className="h-6 w-6 rounded-full flex items-center justify-center bg-white absolute -top-4 right-0">
              <span className="text-blue-500 font-semibold">0</span>
            </div>
          </div>

          <Link to={"/login"} className="text-white font-medium text-[18px]">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;