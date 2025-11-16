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
