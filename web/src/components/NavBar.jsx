import { ShoppingBasket, Search, ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartModal from "./CartModal";
import { useTheme } from "../context/ThemeContext";
import { useSelector } from "react-redux";

const NavBar = () => {
  // const { authUser } = useSelector((state) => state.auth);
  const authUser = useSelector((state) => state.auth.authUser);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { themeColor } = useTheme();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cart);

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <div className="w-full">
        {/* First navbar */}

        <div
          className="h-8 border-b-[1px] border-gray-600 px-16 flex items-center justify-between text-white "
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
        <CartModal
          data={cartItems}
          isOpen={showCart}
          onClose={() => setShowCart(false)}
        />

        {/* SEARCHOVERLAY MODAL */}
        {/* {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />} */}

        {/* Second navbar */}
        <div className="h-28 px-16 flex items-center justify-between  ">
          <Link to={"/"}>
            <span className="text-3xl font-bold text-white">Nexonic</span>
          </Link>

          <div className="relative flex items-center gap-4 font-semibold">
            <input
              type="text"
              placeholder="Search product..."
              className="bg-white w-72 h-12 px-4 pr-10 text-black placeholder-gray-500 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <Search
              style={{ color: themeColor }}
              className="  absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              size={24}
              onClick={handleSearchClick}
            />
          </div>
        </div>

        {/* Third navbar */}
        <div className="h-14 border-t border-gray-500 px-16 flex items-center justify-between text-white   relative">
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
                style={{ background: themeColor }}
                className="absolute top-full left-0 w-56 bg-[#0472F0] shadow-lg   z-50 mt-2"
              >
                {hoverlink.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="block px-4 py-3 hover:text-gray-400  text-white font-medium rounded-md"
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
                <span style={{ color: themeColor }} className="  font-semibold">
                  {cartItems.length}
                </span>
              </div>
            </div>

            {authUser ? (
              <div className="flex items-center gap-2 cursor-pointer">
                {authUser.avatar ? (
                  <img
                    src={authUser.avatar}
                    alt={authUser.name}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <Link to={"/profile"}>
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://avatar.iran.liara.run/public/boy"
                      alt="authUser.name"
                    />
                  </Link>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-white font-medium text-[18px]">
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
