import { useEffect, useState, type ReactNode } from "react";
import { Palette } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import NavBar from "../components/NavBar";
import GoTop from "../components/GoTop";
import Customize from "../components/Customize";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [showCustomize, setShowCustomize] = useState<boolean>(false);
  const { themeColor } = useTheme();
  const [rating, setRating] = useState<number>(0);
  const [price, setPrice] = useState<number>(5000);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const categories = [
    { label: "Home Appliances", link: "/appliancess_home" },
    { label: "Audio & video", link: "/video_and_audio" },
    { label: "Refrigerator", link: "/refrigerator" },
    { label: "Smart Home", link: "/home-smart" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div style={{ background: themeColor }}>
        <NavBar />
      </div>

      <div className="flex flex-1 gap-5">
        <aside className="w-[250px] ml-16 border-r-2 border-gray-300 pt-5 min-h-screen sticky top-0 bg-white">
          <div>
            <h2 className="text-black text-xl font-bold mb-4">
              Filter your Choocie
            </h2>

            <ul className="space-y-2">
              {categories.map((item, index) => (
                <li
                  key={index}
                  onMouseEnter={() => setHoveredCategory(index)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  style={{
                    color: hoveredCategory === index ? themeColor : "#4B5563",
                    fontWeight: hoveredCategory === index ? 600 : 500,
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

            <div className="space-y-7 mt-5">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Price Range
                </h3>
                <input
                  type="range"
                  min={1000}
                  max={100000}
                  step={1000}
                  value={price}
                  onChange={(e) => setPrice(+e.target.value)}
                  className="w-36 cursor-pointer"
                  style={{ accentColor: themeColor }}
                />
                <div className="text-sm text-gray-600 mt-2">
                  Rs1,000 – Rs{price.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="font-semibold text-gray-800 mb-3">
                Customer Rating
              </h3>

              {[
                { stars: "★★★★★", value: 5 },
                { stars: "★★★★☆", value: 4 },
                { stars: "★★★☆☆", value: 3 },
                { stars: "★★☆☆☆", value: 2 },
              ].map((item) => (
                <div
                  key={item.value}
                  onClick={() => setRating(item.value)}
                  className="flex items-center cursor-pointer px-2 py-1 rounded transition"
                  style={{
                    background:
                      rating === item.value ? `${themeColor}20` : "transparent",
                  }}
                >
                  <span
                    className="text-lg tracking-wide"
                    style={{
                      color: rating === item.value ? themeColor : themeColor,
                    }}
                  >
                    {item.stars}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <button
                onClick={() => {
                  setPrice(50000);
                  setRating(0);
                }}
                className="w-46 cursor-pointer py-2 text-sm font-semibold rounded-md border hover:bg-gray-50 transition"
                style={{ color: themeColor, borderColor: themeColor }}
              >
                {" "}
                Clear All Filters{" "}
              </button>
            </div>
          </div>
        </aside>

        <div className="absolute bottom-5 right-14">
          <GoTop />
        </div>

        <div
          style={{ color: themeColor }}
          onClick={() => setShowCustomize(true)}
          className="flex z-999 shadow-2xl cursor-pointer hover:text-white transition-all items-center justify-center gap-4 h-14 w-32 fixed top-[50%] right-0 bg-white"
        >
          <Palette />
          <h2 className="font-semibold">Customize</h2>
        </div>

        <div className="z-99999">
          <Customize
            isOpen={showCustomize}
            onClose={() => setShowCustomize(false)}
          />
        </div>

        <main className="w-full">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
