import { useEffect, useState, type ReactNode } from "react";
import { Palette, X, Menu } from "lucide-react";
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
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
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

  const FilterSidebar = () => (
    <div className="space-y-6">
      <h2 className="text-black text-lg sm:text-xl font-bold mb-4">
        Filter your Choice
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
            onClick={() => setShowMobileFilters(false)}
          >
            <Link to={item.link} className="block w-full text-sm sm:text-base">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="space-y-5">
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
            Price Range
          </h3>
          <input
            type="range"
            min={1000}
            max={100000}
            step={1000}
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            className="w-full cursor-pointer"
            style={{ accentColor: themeColor }}
          />
          <div className="text-xs sm:text-sm text-gray-600 mt-2">
            Rs1,000 – Rs{price.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
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
              className="text-base sm:text-lg tracking-wide"
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
            setShowMobileFilters(false);
          }}
          className="w-full py-2 text-xs sm:text-sm font-semibold rounded-md border hover:bg-gray-50 transition"
          style={{ color: themeColor, borderColor: themeColor }}
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div style={{ background: themeColor }}>
        <NavBar />
      </div>

      <div className="flex flex-1 relative">
        <aside className="hidden ml-10 lg:block w-[220px] xl:w-[250px] 2xl:w-[280px] border-r-2 border-gray-300 pt-5 min-h-screen sticky top-0 bg-white px-4 xl:px-6 mt-5">
          <FilterSidebar />
        </aside>

        <div
          style={{ color: themeColor }}
          onClick={() => setShowMobileFilters(true)}
          className="flex lg:hidden z-50 shadow-2xl cursor-pointer hover:text-white hover:bg-gray-50 transition-all items-center justify-center gap-2 sm:gap-3 h-10 w-24 sm:h-12 sm:w-28 fixed bottom-5 left-4 sm:bottom-8 sm:left-6 bg-white rounded-full"
        >
          <Menu size={18} className="sm:w-5 sm:h-5" />
          <h2 className="font-semibold text-xs sm:text-sm">Filters</h2>
        </div>

        {showMobileFilters && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeIn"
              onClick={() => setShowMobileFilters(false)}
            />
            <div className="fixed inset-y-0 left-0 w-72 sm:w-80 bg-white z-50 overflow-y-auto p-5 lg:hidden shadow-2xl animate-slideInLeft">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>
              <FilterSidebar />
            </div>
          </>
        )}

        <div className="fixed bottom-5 right-4 sm:right-8 lg:right-14 z-30">
          <GoTop />
        </div>

        <div
          style={{ color: themeColor }}
          onClick={() => setShowCustomize(true)}
          className="flex z-50 shadow-2xl cursor-pointer hover:text-white hover:bg-gray-50 transition-all items-center justify-center gap-2 sm:gap-3 lg:gap-4 h-10 w-24 sm:h-12 sm:w-28 xl:h-14 xl:w-32 fixed top-[50%] right-0 bg-white lg:rounded-l-lg  lg:rounded-r-none"
        >
          <Palette size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          <h2 className="font-semibold text-xs sm:text-sm xl:text-base">
            Customize
          </h2>
        </div>

        <div className="z-50">
          <Customize
            isOpen={showCustomize}
            onClose={() => setShowCustomize(false)}
          />
        </div>

        <main className="flex-1 w-full overflow-x-hidden">{children}</main>
      </div>

      <Footer />

      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Layout;
