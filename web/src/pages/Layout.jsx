// Layout.js
import React, { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useDispatch } from "react-redux";
import { getMe } from "../store/slices/authSlice";
import NavBar from "../components/NavBar";
import GoTop from "../components/GoTop";
import Customize from "../components/Customize";
import Footer from "../components/Footer";
import { fetchAllProducts } from "../store/slices/productSlice";
import { Link } from "react-router-dom";


const Layout = ({ children }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredAvailability, setHoveredAvailability] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [showCustomize, setShowCustomize] = useState(false);
  const { themeColor } = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    dispatch(getMe());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const categories = [
    { label: "Home Appliances", link: "/appliancess_home" },
    { label: "Audio & video", link: "/video_and_audio" },
    { label: "Refrigerator", link: "/refrigerator" },
    { label: "New arrivals", link: "/new-arrivals" },
    { label: "Todays deal", link: "/todays-deal" },
    { label: "Gift cards", link: "/gift-cards" },
  ];

  const availability = ["In Stock", "Out of Stock", "Limited Stock"];
  const Rating = [" ★ ★ ★ ★", "★ ★ ★ ", "★ ★ ", "★ "];

  return (
    <>
      <div className="min-h-screen  flex flex-col bg-white">
        {/* Navbar */}
        <div style={{ background: themeColor }}>
          <NavBar />
        </div>

        {/* Main Layout: Sidebar + Page Content */}
        <div className="flex flex-1 gap-5">
          {/* Sidebar */}
          <aside className="w-[250px] ml-16 border-r-2 border-gray-300 pt-5 min-h-screen sticky top-0 bg-white">
            {/* Categories */}
            <div>
              <h2 className="text-black font-semibold mb-4">Categories</h2>

              <ul className="space-y-2">
                {categories.map((item, index) => (
                  <li
                    key={index}
                    onMouseEnter={() => setHoveredCategory(index)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    style={{
                      color: hoveredCategory === index ? themeColor : "#4B5563",
                      fontWeight: hoveredCategory === index ? "600" : "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Link to={item.link} className="block w-full">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability */}
            <div className="mt-10">
              <h2 className="text-black font-semibold mb-4">Availability</h2>
              <ul className="space-y-2">
                {availability.map((status, index) => (
                  <li
                    key={index}
                    onMouseEnter={() => setHoveredAvailability(index)}
                    onMouseLeave={() => setHoveredAvailability(null)}
                    style={{
                      color:
                        hoveredAvailability === index ? themeColor : "#4B5563",
                      fontWeight: hoveredAvailability === index ? "600" : "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {status}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ratings */}
            <div className="mt-10">
              <h2 className="text-black font-semibold mb-4">Rating</h2>
              <ul className="space-y-2">
                {Rating.map((rating, index) => (
                  <li
                    key={index}
                    onMouseEnter={() => setHoveredRating(index)}
                    onMouseLeave={() => setHoveredRating(null)}
                    style={{
                      color: hoveredRating === index ? themeColor : "#4B5563",
                      fontWeight: hoveredRating === index ? "600" : "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {rating}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="mt-10">
              <h2 className="text-black font-semibold mb-4">Price Range</h2>
              <div className="flex flex-col space-y-2">
                <input
                  style={{
                    accentColor: themeColor,
                  }}
                  type="range"
                  min="1000"
                  max="50000"
                  className="cursor-pointer  w-42 "
                />
                <div className="h-12 w-42 flex items-center justify-between">
                  <p>$1,000</p>
                  <p>$50,000</p>
                </div>
              </div>
            </div>
          </aside>

          <div className="absolute bottom-5 right-14 ">
            <GoTop />
          </div>

          {/* CUSTOMIZE BUTTON */}
          <div
            style={{ color: themeColor }}
            onClick={() => setShowCustomize(true)}
            className="flex z-[999]  shadow-2xl cursor-pointer hover:text-white transition-all items-center justify-center gap-4 h-14 w-32 fixed top-[50%] right-0 bg-white"
          >
            <Palette />
            <h2 className="font-semibold">Customize</h2>
          </div>

          {/* CUSTOMIZE SIDEBAR */}
          <Customize
            isOpen={showCustomize}
            onClose={() => setShowCustomize(false)}
          />

          {/* Page Content */}
          <main className=" w-full">{children}</main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
