import { ShoppingBasket, Search, ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CartModal from "./CartModal";
import SearchOverlay from "./SearchOverlay";
import { useTheme } from "../context/ThemeContext";

const NavBar = () => {
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { themeColor } = useTheme();

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

  //  Close overlays when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAllProducts(false);
      }

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //   Handle search submit on Enter
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("Searching for:", searchQuery);
      setShowSearch(false);
    }
  };

  return (
    <>
      <div className="w-full">
        {/* First navbar */}
        <div
          className="h-8 px-16 flex items-center justify-between text-white "
          style={{ backgroundColor: themeColor }}
        >
          <span>
            24/7 Customer service <b>1-800-234-5678</b>
          </span>
          <div className="flex items-center gap-10 font-medium text-[14px]">
            <p>Shipping & return</p>
            <p>Track order</p>
          </div>
        </div>

        {/* CART MODAL */}
        <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />

        {/* SEARCHOVERLAY MODAL */}
        {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}

        {/* Second navbar */}
        <div className="h-28 px-16 flex items-center justify-between  ">
          <Link to={"/"}>
            <span className="text-3xl font-bold text-white">Nexonic</span>
          </Link>
          <div
            ref={searchRef}
            className="relative flex items-center gap-4 font-semibold"
          >
            <input
              type="text"
              placeholder="Search product..."
              className="bg-white w-72 h-12 px-4 pr-10 text-black placeholder-gray-500 outline-none"
              onClick={() => setShowSearch(true)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <Search
              className="text-blue-600 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              size={24}
              onClick={() => console.log("Searching for:", searchQuery)}
            />
          </div>
        </div>

        {/* Third navbar */}
        <div className="h-14 border-t border-gray-500 px-16 flex items-center justify-between text-white   relative">
          {/* Allproducts dropdown */}
          <div className="relative" ref={dropdownRef}>
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
              <div className="absolute top-full left-0 w-56 bg-[#0472F0] shadow-lg   z-50 mt-2">
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

            {/* CART ICON */}
            <div className="border-r border-gray-400 pr-4 relative">
              <button
                className="cursor-pointer"
                onClick={() => setShowCart(true)}
              >
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
    </>
  );
};

export default NavBar;
