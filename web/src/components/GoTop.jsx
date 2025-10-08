import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { useTheme } from "../context/ThemeContext";

const GoTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const { themeColor } = useTheme();

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (scrollTop / docHeight) * 100;

    setIsVisible(scrollTop > 100);
    setScrollPercent(percent);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="right-5 z-50 fixed bottom-10 h-14 w-14 flex items-center justify-center cursor-pointer"
          style={{
            borderRadius: "50%",
            background: `conic-gradient(${themeColor} ${scrollPercent}%, rgba(0,0,0,0.1) 0)`,
            transition: "background 0.2s linear",
          }}
        >
          <div
            className="h-11 w-11 flex items-center justify-center rounded-full shadow-lg"
            style={{ backgroundColor: "#fff" }}
          >
            <IoIosArrowUp
              className="text-2xl transition-transform duration-300 hover:scale-125"
              style={{ color: themeColor }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GoTop;
