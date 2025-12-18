import {
  ShoppingBasket,
  Search,
  ChevronUp,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import CartModal from "./CartModal";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import UserModal from "./UserModal";

interface MenuItem {
  label: string;
  link: string;
}

const NavBar: React.FC = () => {
  const [showCart, setShowCart] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { themeColor } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const { products } = useSelector((state: RootState) => state.cart);

  const menu: MenuItem[] = [
    { label: "Home Appliances", link: "/appliancess_home" },
    { label: "Audio & video", link: "/video_and_audio" },
    { label: "Refrigerator", link: "/refrigerator" },
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

  return (
    <div className="w-full">
      <div
        className="h-8 border-b border-gray-600 px-6 md:px-16 flex items-center justify-between text-white"
        style={{ backgroundColor: themeColor }}
      >
        <span className="text-xs md:text-base">
          24/7 Customer service <b>1-800-234-5678</b>
        </span>
        <div className="flex items-center gap-4 md:gap-10 font-medium text-[12px] md:text-[14px]">
          <b>Shipping & return</b>
          <span className="font-bold">Track order</span>
        </div>
      </div>

      <div className="h-28 px-6 md:px-16 flex items-center justify-between">
        <Link to="/">
          <img
            className="h-24 bg-transparent"
            src="/images/logo6.png"
            alt="Logo"
          />
        </Link>

        <div className="relative items-center gap-4 font-semibold hidden md:flex w-[275px]">
          <input
            type="text"
            placeholder="Search product..."
            className="bg-white w-full h-12 px-4 pr-10 text-black placeholder-gray-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search
            style={{ color: themeColor }}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            size={22}
          />
        </div>

        <div className="md:hidden cursor-pointer flex items-center">
          <button
            className="cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div className="hidden md:flex h-14 border-t border-gray-500 px-16 items-center justify-between text-white relative">
        <div className="relative">
          <button
            onClick={() => setShowAllProducts(!showAllProducts)}
            className="cursor-pointer flex items-center gap-1 font-semibold transition-colors duration-200 hover:text-gray-200"
          >
            Allproducts
            {showAllProducts ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>

          <div
            className={`absolute top-full left-0 w-56 z-50 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
              showAllProducts ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{ background: themeColor }}
          >
            {hoverlink.map((item: MenuItem, index: number) => (
              <Link
                key={index}
                to={item.link}
                className="block px-4 py-3 hover:text-gray-200 text-white font-medium rounded-md transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-12">
          {menu.map((item: MenuItem, index: number) => (
            <Link
              key={index}
              to={item.link}
              className="font-bold hover:underline transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}

          <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />
          <div className="border-r border-gray-400 pr-4 relative">
            <button
              onClick={() => setShowCart(true)}
              className="transition-transform duration-200 hover:scale-110"
            >
              <ShoppingBasket className="text-white" size={30} />
            </button>
            <div className="h-6 w-6 rounded-full flex items-center justify-center bg-white absolute -top-4 right-0 transition-transform duration-200 hover:scale-110">
              <span style={{ color: themeColor }} className="font-semibold">
                {products.length || 0}
              </span>
            </div>
          </div>

          <div>
            {user ? (
              <div
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="h-12 w-12 overflow-hidden cursor-pointer rounded-full transition-transform duration-200 hover:scale-110"
              >
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
                className="text-white font-medium text-[18px] transition-colors duration-200 hover:text-gray-200"
              >
                Log In
              </Link>
            )}
          </div>

          {isModalOpen && (
            <UserModal closeModal={() => setIsModalOpen(false)} />
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden w-full text-white px-6 py-4 flex flex-col gap-3 animate-slideDown">
          <button
            onClick={() => setShowAllProducts(!showAllProducts)}
            className="flex cursor-pointer items-center justify-between font-semibold transition-colors duration-200 hover:text-gray-200"
          >
            Allproducts {showAllProducts ? <ChevronUp /> : <ChevronDown />}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showAllProducts ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {hoverlink.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="pl-4 py-2 hover:text-gray-200 block transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {menu.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="py-2 hover:text-gray-200 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}

          <div className="relative flex items-center gap-4 mt-2">
            <button
              onClick={() => setShowCart(true)}
              className="transition-transform duration-200 hover:scale-110"
            >
              <ShoppingBasket size={28} />
              <span className="ml-1 absolute -top-5">
                {products.length || 0}
              </span>
            </button>

            {user ? (
              <div
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="h-10 w-10 overflow-hidden cursor-pointer rounded-full transition-transform duration-200 hover:scale-110"
              >
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
                className="font-medium transition-colors duration-200 hover:text-gray-200"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
