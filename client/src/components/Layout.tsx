import { useEffect, useState, type ReactNode } from "react";
import { Palette } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Footer from "./Footer";
import NavBar from "./NavBar";
import GoTop from "./GoTop";
import Customize from "./Customize";

interface LayoutProps {
  children: ReactNode;
}


const Layout = ({ children }: LayoutProps) => {
  const [showCustomize, setShowCustomize] = useState(false);
  const { themeColor } = useTheme();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeColor }}>
      <NavBar />

      {children}

      <div className="absolute bottom-5 z-99999 right-14 ">
        <GoTop />
      </div>
      <div
        style={{ color: themeColor }}
        onClick={() => setShowCustomize(true)}
        className="flex   shadow-2xl cursor-pointer hover:text-white transition-all items-center justify-center gap-4 h-14 w-32 fixed top-[50%] right-0 bg-white"
      >
        <Palette />
        <h2 className="font-semibold">Customize</h2>
      </div>
      <Customize
        isOpen={showCustomize}
        onClose={() => setShowCustomize(false)}
      />

      <Footer />
    </div>
  );
};

export default Layout;
