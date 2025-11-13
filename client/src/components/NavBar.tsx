import { ShoppingBasket, Search, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import CartModal from "./CartModal";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

interface MenuItem {
  label: string;
  link: string;
}

const NavBar: React.FC = () => {
  const [showCart, setShowCart] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { themeColor } = useTheme();

  const { user } = useSelector((state: RootState) => state.auth);

  console.log(user);

  const menu: MenuItem[] = [
    { label: "Home Appliances", link: "/appliancess_home" },
    { label: "Audio & video", link: "/video_and_audio" },
    { label: "Refrigerator", link: "/refrigerator" },
    { label: "New arrivals", link: "/new-arrivals" },
    { label: "Todays deal", link: "/todays-deal" },
    { label: "Gift cards", link: "/gift-cards" },
  ];

  const hoverlink: MenuItem[] = [
    { label: "Air conditioner", link: "/conditioner_air" },
    { label: "Kitchen appliances", link: "/appliances_kitchen" },
    { label: "PC & laptop", link: "/laptop_and_pc" },
    { label: "Gadgets", link: "/gadgets" },
    { label: "Smart home", link: "/home-smart" },
  ];
  const dummyCart = [
    {
      product: {
        id: 1,
        name: "Smartphone",
        img: "https://via.placeholder.com/100",
        price: 599,
      },
      quantity: 2,
    },
    {
      product: {
        id: 2,
        name: "Headphones",
        img: "https://via.placeholder.com/100",
        price: 199,
      },
      quantity: 1,
    },
  ];

  return (
    <>
      <div className="w-full">
        <div
          className="h-8 border-b border-gray-600 px-16 flex items-center justify-between text-white"
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

        <div className="h-28 px-16 flex items-center justify-between">
          <Link to="/">
            <img
              className="  h-24 bg-transparent"
              src="/images/logo6.png"
              alt="Logo"
            />
          </Link>

          <div className="relative flex items-center gap-4 font-semibold">
            <input
              type="text"
              placeholder="Search product..."
              className="bg-white w-72 h-12 px-4 pr-10 text-black placeholder-gray-500 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              style={{ color: themeColor }}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              size={24}
            />
          </div>
        </div>

        <div className="h-14 border-t border-gray-500 px-16 flex items-center justify-between text-white relative">
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
                className="absolute top-full left-0 w-56 bg-[#0472F0] shadow-lg z-50 mt-2"
              >
                {hoverlink.map((item: MenuItem, index: number) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="block px-4 py-3 hover:text-gray-200 text-white font-medium rounded-md"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-12">
            {menu.map((item: MenuItem, index: number) => (
              <Link
                key={index}
                to={item.link}
                className="font-bold hover:underline"
              >
                {item.label}
              </Link>
            ))}
            <CartModal
              data={dummyCart}
              isOpen={showCart}
              onClose={() => setShowCart(false)}
            />
            <div className="border-r border-gray-400 pr-4 relative">
              <button
                onClick={() => setShowCart(true)}
                className="cursor-pointer"
              >
                <ShoppingBasket className="text-white" size={30} />
              </button>
              <div className="h-6 w-6 rounded-full flex items-center justify-center bg-white absolute -top-4 right-0">
                <span style={{ color: themeColor }} className="font-semibold">
                  4
                </span>
              </div>
            </div>

            <div>
              {user ? (
                <div className="h-12 w-12 overflow-hidden cursor-pointer   rounded-full">
                  {user?.profile && user.profile.trim() !== "" ? (
                    <img
                      className="h-full w-full"
                      src={user.profile}
                      alt="user"
                    />
                  ) : (
                    <img
                      className="h-full w-full"
                      src="https://avatar.iran.liara.run/public"
                      alt="default avatar"
                    />
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-white font-medium text-[18px]"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
