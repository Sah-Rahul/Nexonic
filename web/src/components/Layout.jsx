import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import GoTop from "./GoTop";
import NavBar from "./NavBar";
import { Palette } from "lucide-react";
import Customize from "./Customize";
import { useTheme } from "../context/ThemeContext";
import { useDispatch } from "react-redux";
import { getMe } from "../store/slices/authSlice";
import { fetchAllProducts } from "../store/slices/productSlice";

const Layout = ({ children }) => {
  const [showCustomize, setShowCustomize] = useState(false);
  const { themeColor } = useTheme();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  useEffect(() => {
    dispatch(fetchAllProducts);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeColor }}>
      <NavBar />

      {children}


      <div className="absolute bottom-5 z-[99999] right-14 ">
        <GoTop />
      </div>

      {/* CUSTOMIZE BUTTON */}
      <div
        style={{ color: themeColor }}
        onClick={() => setShowCustomize(true)}
        className="flex   shadow-2xl cursor-pointer hover:text-white transition-all items-center justify-center gap-4 h-14 w-32 fixed top-[50%] right-0 bg-white"
      >
        <Palette />
        <h2 className="font-semibold">Customize</h2>
      </div>

      {/* CUSTOMIZE SIDEBAR */}
      <Customize
        isOpen={showCustomize}
        onClose={() => setShowCustomize(false)}
      />

      <Footer />
    </div>
  );
};

export default Layout;
